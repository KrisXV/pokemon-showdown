export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	encore: {
		inherit: true,
		condition: {
			inherit: true,
			onStart(target) {
				let move: Move | ActiveMove | null = target.lastMove;
				if (!move || target.volatiles['dynamax']) return false;

				// Encore only works on Max Moves if the base move is not itself a Max Move
				if (move.isMax && move.baseMove) move = this.dex.moves.get(move.baseMove);
				const moveSlot = target.getMoveData(move.id);
				if (move.isZ || move.isMax || move.flags['failencore'] || !moveSlot || moveSlot.pp <= 0) {
					// it failed
					return false;
				}
				this.effectState.move = move.id;
				this.add('-start', target, 'Encore');
				const action = this.queue.willMove(target);
				if (!action) {
					this.effectState.duration!++;
				} else {
					this.queue.changeAction(target, {
						choice: 'move',
						target,
						// targetLoc: undefined,
						moveid: move.id,
						order: action.order, // TODO: check Quash + Encore interaction
					});
				}
			},
		},
	},
	ironhead: {
		inherit: true,
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
	},
	protect: {
		inherit: true,
		pp: 5,
	},
};
