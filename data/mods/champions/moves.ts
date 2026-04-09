export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	anchorshot: {
		inherit: true,
		basePower: 90,
	},
	appleacid: {
		inherit: true,
		basePower: 90,
	},
	astralbarrage: {
		inherit: true,
		basePower: 110,
	},
	beakblast: {
		inherit: true,
		basePower: 120,
		pp: 5,
	},
	bloodmoon: {
		inherit: true,
		basePower: 130,
	},
	boltbeak: {
		inherit: true,
		basePower: 80,
	},
	bonerush: {
		inherit: true,
		basePower: 30,
	},
	crabhammer: {
		inherit: true,
		accuracy: 95,
	},
	direclaw: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
		secondary: {
			chance: 30,
			onHit(target, source) {
				const status = this.sample(['psn', 'par', 'slp']);
				target.trySetStatus(status, source);
			},
		},
	},
	dragonclaw: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
	},
	dragonhammer: {
		inherit: true,
		basePower: 100,
	},
	firelash: {
		inherit: true,
		basePower: 90,
	},
	firstimpression: {
		inherit: true,
		basePower: 100,
	},
	fishiousrend: {
		inherit: true,
		basePower: 80,
	},
	geargrind: {
		inherit: true,
		accuracy: 90,
		basePower: 60,
	},
	gravapple: {
		inherit: true,
		basePower: 90,
	},
	growth: {
		inherit: true,
		type: "Grass",
	},
	hyperdrill: {
		inherit: true,
		basePower: 120,
	},
	infernalparade: {
		inherit: true,
		basePower: 65,
	},
	ironhead: {
		inherit: true,
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
	},
	moonblast: {
		inherit: true,
		secondary: {
			chance: 10,
			boosts: {
				spa: -1,
			},
		},
	},
	mountaingale: {
		inherit: true,
		basePower: 120,
	},
	nightdaze: {
		inherit: true,
		basePower: 90,
	},
	protect: {
		inherit: true,
		pp: 5,
	},
	psyshieldbash: {
		inherit: true,
		basePower: 90,
	},
	revelationdance: {
		inherit: true,
		basePower: 100,
	},
	saltcure: {
		inherit: true,
		condition: {
			inherit: true,
			onResidual(pokemon) {
				this.damage(pokemon.baseMaxhp / (pokemon.hasType(['Water', 'Steel']) ? 8 : 16));
			},
		},
	},
	shadowclaw: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
	},
	snaptrap: {
		inherit: true,
		type: "Steel",
	},
	snipeshot: {
		inherit: true,
		basePower: 85,
	},
	spiritshackle: {
		inherit: true,
		basePower: 90,
	},
	syrupbomb: {
		inherit: true,
		accuracy: 90,
	},
	toxicthread: {
		inherit: true,
		boosts: {
			spe: -2,
		},
	},
	tripledive: {
		inherit: true,
		basePower: 35,
	},
	tropkick: {
		inherit: true,
		basePower: 85,
	},
};
