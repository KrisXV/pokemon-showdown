export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	appleacid: {
		inherit: true,
		basePower: 90,
	},
	beakblast: {
		inherit: true,
		basePower: 120,
		pp: 5,
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
				const result = this.random(3);
				if (result === 0) {
					target.trySetStatus('psn', source);
				} else if (result === 1) {
					target.trySetStatus('par', source);
				} else {
					target.trySetStatus('slp', source);
				}
			},
		},
	},
	dragonclaw: {
		inherit: true,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1 },
	},
	firelash: {
		inherit: true,
		basePower: 90,
	},
	firstimpression: {
		inherit: true,
		basePower: 100,
	},
	gravapple: {
		inherit: true,
		basePower: 90,
	},
	growth: {
		inherit: true,
		type: "Grass",
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
	tropkick: {
		inherit: true,
		basePower: 85,
	},
};
