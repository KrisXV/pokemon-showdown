export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	checkMoveBreaksProtect(move: ActiveMove, attacker: Pokemon, defender: Pokemon, blockStatus = true) {
		if (move.flags['protect'] && (move.category !== 'Status' || blockStatus)) {
			return false;
		}
		if ((move.isZ || move.isMax || attacker.hasAbility(['piercingdrill', 'unseenfist'])) &&
			!['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) {
			defender.getMoveHitData(move).brokeProtect = true;
		}
		return true;
	},
};
