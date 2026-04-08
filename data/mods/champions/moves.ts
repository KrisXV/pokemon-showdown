export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
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
	firstimpression: {
		inherit: true,
		basePower: 100,
	},
	gravapple: {
		inherit: true,
		basePower: 90,
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
	protect: {
		inherit: true,
		pp: 5,
	},
	snaptrap: {
		inherit: true,
		type: "Steel",
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
