export const Scripts: ModdedBattleScriptsData = {
	gen: 9,
	calculatePP(move, ppUps) {
		return move.noPPBoosts ? move.pp : (move.pp / 5 + 1) * 4;
	},
};
