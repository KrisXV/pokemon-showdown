import * as request from 'request';
import type {Response} from 'request';
import {FS} from '../../lib/fs';
import {Utils} from '../../lib/utils';

const DB_FILE = `config/chat-plugins/github.json`;

const githubhook = require('githubhook');

interface GithubDatabase {
	usernames: {[ghName: string]: string};
	repoNames: {[k: string]: string};
	gitbans: {[ghName: string]: string};
	reportToStaff: string[];
}

const DB: GithubDatabase = JSON.parse(
	FS(DB_FILE).readIfExistsSync() || `{\"usernames\": {}, \"repoNames\": {}, \"gitbans\": [], \"reportToStaff\": []}`
);

function saveDB() {
	FS(DB_FILE).writeUpdate(() => JSON.stringify(DB));
}

let github = githubhook({...Config.github});

class Github {
	addCustomDisplayName(githubID: ID, displayName: string) {
		displayName = displayName.trim();
		if (DB.usernames[githubID] === displayName) {
			throw new Chat.ErrorMessage(`The display name for '${githubID}' is already set to '${displayName}'.`);
		}
		let changed = DB.usernames[githubID];
		DB.usernames[githubID] = displayName;
		saveDB();
		return `${changed ? 'Changed' : 'Set'} the display name for the github ID '${githubID}'${changed ? ` from '${changed}'` : ''} to '${displayName}'.`;
	}
	getDisplayName(name: string) {
		if (toID(name) in DB.usernames) return DB.usernames[toID(name)];
		return name.split(' ')[0];
	}
	validateRepositoryName(name: string) {
		let sanitizedName = name.replace(/^[-_A-Za-z0-9]+/g, ' ');
		if (sanitizedName.startsWith(' ')) sanitizedName = '-' + sanitizedName.slice(1);
		if (sanitizedName.endsWith(' ')) sanitizedName = sanitizedName.slice(-1) + '-';
		sanitizedName = sanitizedName.split(' ').map(x => x.trim()).join('-');
		if (name.trim() !== sanitizedName || name.trim().length > 100) {
			throw new Chat.ErrorMessage(`Invalid Repository name. Repository names can only include letters, numbers, hyphens, and underscores, and can only be up to 100 characters long.`);
		}
	}
	addCustomRepositoryName(repository: string, displayName: string) {
		repository = repository.trim();
		this.validateRepositoryName(repository);
		displayName = displayName.trim();
		if (DB.repoNames[repository] === displayName) {
			throw new Chat.ErrorMessage(`The display name for '${repository}' is already set to '${displayName}'.`);
		}
		let changed = DB.repoNames[repository];
		DB.repoNames[repository] = displayName;
		saveDB();
		return `${changed ? 'Changed' : 'Set'} the display name for the repository '${repository}'${changed ? ` from '${changed}'` : ''} to '${displayName}'.`;
	}
	getRepositoryName(name: string) {
		if (DB.repoNames[name.trim()]) return DB.repoNames[name.trim()];
		return name.trim().toLowerCase();
	}
	gitban(name: string, reason?: string) {
		name = name.trim().toLowerCase();
		if (DB.gitbans[name]) {
			throw new Chat.ErrorMessage(`The Github username '${name}' is already banned from reporting.`);
		}
		DB.gitbans[name] = reason || '';
		saveDB();
	}
	gitunban(name: string) {
		name = name.trim().toLowerCase();
		if (!DB.gitbans[name]) {
			throw new Chat.ErrorMessage(`The Github username '${name}' is not banned from reporting.`);
		}
		delete DB.gitbans[name];
		saveDB();
	}
	isGitbanned(name: string) {
		return !!DB.gitbans[name.trim().toLowerCase()];
	}
	shorten(url: string, callback: (shortened: string) => void) {
		const shortenCallback = (error: unknown, response: Response) => {
			let shortenedUrl = url;
			if (!error && response.headers.location) {
				shortenedUrl = response.headers.location;
			}
			callback(shortenedUrl);
		};

		request.post('https://git.io', {form: {url}}, shortenCallback);
	}
}

const GH = new Github();

github.on('push', (repo: string, ref: string, result: AnyObject) => {
	const url = result.compare;
	const branch = /[^/]+$/.exec(ref)![0];
	GH.shorten(url, (url) => {
		if (branch !== 'master') return;
		const messages: string[] = [];

		for (const commit of result.commits) {
			const commitMessage = commit.message;
			let shortCommit = /.+/.exec(commitMessage)![0];
			if (commitMessage !== shortCommit) shortCommit += `&hellip;`;
			const username = GH.getDisplayName(commit.author.name);
			const repoName = GH.getRepositoryName(repo);
			const {url} = commit;
			const id = commit.id.substring(0, 6);
			const formattedRepo = `[<span style="color:#ff00ff;">${Utils.escapeHTML(repoName)}</span>]`;
			const formattedUsername = `<span style="color:#909090;">${Utils.escapeHTML(username)}</span>`;
			messages.push(`${formattedRepo} <a href="${url}"><span style="color:#606060;">${Utils.escapeHTML(id)}</span></a> ${Utils.escapeHTML(shortCommit)} ${formattedUsername}`);
		}
		const rooms: RoomID[] = ['development'];
		if (DB.reportToStaff.includes(repo)) rooms.push('staff');
		Rooms.global.notifyRooms(rooms, '|html|' + messages.join('<br />'));
	});
});

const renamedActions: {[k: string]: string} = {
	synchronize: 'updated', review_requested: 'requested a review for', 
};

const skippedActions = ['ready_for_review', 'labeled', 'unlabeled', 'converted_to_draft'];

const updates: {[k: string]: number} = {};

github.on('pull_request', (repo: string, ref: string, result: AnyObject) => {
	if (GH.isGitbanned(result.sender.login) || GH.isGitbanned(result.pull_request.user.login)) return;
	const COOLDOWN = 10 * 60 * 1000;
	const prNumber = result.pull_request.number;
	const url = result.pull_request.html_url;
	let action = result.action;
	if (skippedActions.includes(action)) return;
	if (renamedActions[action]) action = renamedActions[action];
	const now = +new Date();
	if (updates[prNumber] && updates[prNumber] * COOLDOWN > now) return;
	updates[prNumber] = now;
	GH.shorten(url, (url) => {
		const repoName = GH.getRepositoryName(repo);
		const username = GH.getDisplayName(result.sender.login);
		const title = result.pull_request.title;
		Rooms.global.notifyRooms(['development'], Utils.html`[<span style="color:#ff00ff;">${repoName}</span>] <span style="color:#909090;">${username}</span> ${action} <a href="${url}">PR#${prNumber}</a>: ${title}`);
	});
});

github.listen();

export const commands: ChatCommands = {
	gitban(target, room, user) {
		room = this.requireRoom('development');
		this.checkCan('mute', null, room);
		const [name, reason] = Utils.splitFirst(target, ',');
		if (!name) return this.parse('/help gitban');

		GH.gitban(name, reason);
		this.privateModAction(`${user.name} gitbanned ${name.toLowerCase()}.${reason ? ` (${reason})` : ''}`);
		this.modlog('GITBAN', null, `${name.toLowerCase()}${reason ? `: ${reason}` : ''}`);
	},
	gitbanhelp: [
		`/gitban [github username], [reason (optional)] - Prevents issues and pull requests made by [github username] on Github from being reported. Requires: % @ # &`,
	],

	gitunban(target, room, user) {
		room = this.requireRoom('development');
		this.checkCan('mute', null, room);
		if (!target) return this.parse('/help gitunban');

		GH.gitunban(target);
		this.privateModAction(`${user.name} gitunbanned ${target.trim().toLowerCase()}.`);
		this.modlog('GITUNBAN', null, target.trim().toLowerCase());
	},
	gitunbanhelp: [
		`/gitunban [github username] - Removes a username from the gitbanlist. Requires: % @ # &`,
	],
	addrepositoryname(target, room, user) {
		room = this.requireRoom('development');
		this.checkCan('ban', null, room);
		
		const [repository, displayName] = Utils.splitFirst(target, ',');
		if (!(repository && displayName)) return this.parse(`/help addrepositoryname`);

		this.sendReply(GH.addCustomRepositoryName(repository, displayName));
		this.privateModAction(`${user.name} added a custom repository name for '${repository}': "${displayName}".`);
		this.modlog('ADDREPOSITORY', null, `${repository}: ${displayName}`);
	},
};
