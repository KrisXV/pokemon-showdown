interface TagData {
	name: string;
	desc?: string;
	pokemonFilter?: (species: Species) => boolean;
	moveFilter?: (move: Move) => boolean;
}

export const Tags: {[id: string]: TagData} = {
	// Categories
	// ----------
	physical: {
		name: "Physical",
		desc: "Move deals damage with the Attack and Defense stats.",
		moveFilter: move => move.category === 'Physical',
	},
	special: {
		name: "Special",
		desc: "Move deals damage with the Special Attack and Special Defense stats.",
		moveFilter: move => move.category === 'Special',
	},
	status: {
		name: "Status",
		desc: "Move does not deal damage.",
		moveFilter: move => move.category === 'Status',
	},

	// Pokemon tags
	// ------------
	mega: {
		name: "Mega",
		pokemonFilter: species => !!species.isMega,
	},

	// Move tags
	// ---------
	zmove: {
		name: "Z-Move",
		moveFilter: move => !!move.isZ,
	},
	maxmove: {
		name: "Max Move",
		moveFilter: move => !!move.isMax,
	},
	contact: {
		name: "Contact",
		desc: "Affected by a variety of moves, abilities, and items. Moves affected by contact moves include: Spiky Shield, King's Shield. Abilities affected by contact moves include: Iron Barbs, Rough Skin, Gooey, Flame Body, Static, Tough Claws. Items affected by contact moves include: Rocky Helmet, Sticky Barb.",
		moveFilter: move => 'contact' in move.flags,
	},
	sound: {
		name: "Sound",
		desc: "Doesn't affect Soundproof Pokémon. (All sound moves also bypass Substitute.)",
		moveFilter: move => 'sound' in move.flags,
	},
	powder: {
		name: "Powder",
		desc: "Doesn't affect Grass-type Pokémon, Overcoat Pokémon, or Safety Goggles holders.",
		moveFilter: move => 'powder' in move.flags,
	},
	fist: {
		name: "Fist",
		desc: "Boosted 1.2x by Iron Fist.",
		moveFilter: move => 'punch' in move.flags,
	},
	pulse: {
		name: "Pulse",
		desc: "Boosted 1.5x by Mega Launcher.",
		moveFilter: move => 'pulse' in move.flags,
	},
	bite: {
		name: "Bite",
		desc: "Boosted 1.5x by Strong Jaw.",
		moveFilter: move => 'bite' in move.flags,
	},
	ballistic: {
		name: "Ballistic",
		desc: "Doesn't affect Bulletproof Pokémon.",
		moveFilter: move => 'bullet' in move.flags,
	},
	bypassprotect: {
		name: "Bypass Protect",
		desc: "Bypasses Protect, Detect, King's Shield, and Spiky Shield.",
		moveFilter: move => move.target !== 'self' && !('protect' in move.flags),
	},
	nonreflectable: {
		name: "Nonreflectable",
		desc: "Can't be bounced by Magic Coat or Magic Bounce.",
		moveFilter: move => move.target !== 'self' && move.category === 'Status' && !('reflectable' in move.flags),
	},
	nonmirror: {
		name: "Nonmirror",
		desc: "Can't be copied by Mirror Move.",
		moveFilter: move => move.target !== 'self' && !('mirror' in move.flags),
	},
	nonsnatchable: {
		name: "Nonsnatchable",
		desc: "Can't be copied by Snatch.",
		moveFilter: move => ['allyTeam', 'self', 'adjacentAllyOrSelf'].includes(move.target) && !('snatch' in move.flags),
	},
	bypasssubstitute: {
		name: "Bypass Substitute",
		desc: "Bypasses but does not break a Substitute.",
		moveFilter: move => 'authentic' in move.flags,
	},
	gmaxmove: {
		name: "G-Max Move",
		moveFilter: move => typeof move.isMax === 'string',
	},

	// Tiers
	// -----
	uber: {
		name: "Uber",
		pokemonFilter: species => species.tiers.singles === 'Uber',
	},
	ou: {
		name: "OU",
		pokemonFilter: species => species.tiers.singles === 'OU',
	},
	uubl: {
		name: "UUBL",
		pokemonFilter: species => species.tiers.singles === 'UUBL',
	},
	uu: {
		name: "UU",
		pokemonFilter: species => species.tiers.singles === 'UU',
	},
	rubl: {
		name: "RUBL",
		pokemonFilter: species => species.tiers.singles === 'RUBL',
	},
	ru: {
		name: "RU",
		pokemonFilter: species => species.tiers.singles === 'RU',
	},
	nubl: {
		name: "NUBL",
		pokemonFilter: species => species.tiers.singles === 'NUBL',
	},
	nu: {
		name: "NU",
		pokemonFilter: species => species.tiers.singles === 'NU',
	},
	publ: {
		name: "PUBL",
		pokemonFilter: species => species.tiers.singles === 'PUBL',
	},
	pu: {
		name: "PU",
		pokemonFilter: species => species.tiers.singles === 'PU',
	},
	zu: {
		name: "ZU",
		pokemonFilter: species => species.tiers.singles === '(PU)',
	},
	nfe: {
		name: "NFE",
		pokemonFilter: species => species.tiers.singles === 'NFE',
	},
	lc: {
		name: "LC",
		pokemonFilter: species => species.tiers.doubles === 'LC',
	},
	cap: {
		name: "CAP",
		pokemonFilter: species => species.tiers.singles === 'CAP',
	},
	caplc: {
		name: "CAP LC",
		pokemonFilter: species => species.tiers.singles === 'CAP LC',
	},
	capnfe: {
		name: "CAP NFE",
		pokemonFilter: species => species.tiers.singles === 'CAP NFE',
	},
	ag: {
		name: "AG",
		pokemonFilter: species => species.tiers.singles === 'AG',
	},

	// Doubles tiers
	// -------------
	duber: {
		name: "DUber",
		pokemonFilter: species => species.tiers.doubles === 'DUber',
	},
	dou: {
		name: "DOU",
		pokemonFilter: species => species.tiers.doubles === 'DOU',
	},
	dbl: {
		name: "DBL",
		pokemonFilter: species => species.tiers.doubles === 'DBL',
	},
	duu: {
		name: "DUU",
		pokemonFilter: species => species.tiers.doubles === 'DUU',
	},
	dnu: {
		name: "DNU",
		pokemonFilter: species => species.tiers.doubles === '(DUU)',
	},

	// Legality tags
	past: {
		name: "Past",
		pokemonFilter: species => species.isNonstandard === 'Past',
		moveFilter: move => move.isNonstandard === 'Past',
	},
	future: {
		name: "Future",
		pokemonFilter: species => species.isNonstandard === 'Future',
		moveFilter: move => move.isNonstandard === 'Future',
	},
	unobtainable: {
		name: "Unobtainable",
		pokemonFilter: species => species.isNonstandard === 'Unobtainable',
		moveFilter: move => move.isNonstandard === 'Unobtainable',
	},
	lgpe: {
		name: "LGPE",
		pokemonFilter: species => species.isNonstandard === 'LGPE',
		moveFilter: move => move.isNonstandard === 'LGPE',
	},
	custom: {
		name: "Custom",
		pokemonFilter: species => species.isNonstandard === 'Custom',
		moveFilter: move => move.isNonstandard === 'Custom',
	},
};
