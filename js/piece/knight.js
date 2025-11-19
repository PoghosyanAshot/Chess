import { Piece } from "./piece.js";

export class Knight extends Piece {
    constructor(color, position, type) {
        super(color, position, type);
    }

    get_possible_moves(board_state, ignoreCheck = false) {
        const size = 8;
        const moves = [];
        const [x, y] = this.position;
        console.log([x, y]);
        const dirs = [
            [-2, -1],
            [-2, 1],
            [-1, -2],
            [-1, 2],
            [2, -1],
            [2, 1],
            [1, -2],
            [1, 2],
        ];

        for (const dir of dirs) {
            const [dx, dy] = dir;
            const tx = x + dx;
            const ty = y + dy;

            if (tx < 0 || tx >= size || ty < 0 || ty >= size) continue;

            if (!board_state[tx][ty] || board_state[tx][ty].color != this.color) {
                if (ignoreCheck) {
                    moves.push([tx, ty]);
                    continue;
                }

                if (this.isValid(board_state, tx, ty)) {
                    moves.push([tx, ty]);
                }
            }
        }

        return moves;
    }
}
