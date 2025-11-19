import { Piece } from "./piece.js";

export class Pawn extends Piece {
    constructor(color, position, type) {
        super(color, position, type);
        this.enPassant = false;
    }

    get_possible_moves(board_state, ignoreCheck = false) {
        const moves = [];
        const [x, y] = this.position;
        const dir = this.color === "black" ? 1 : -1;

        const one = x + dir;
        const two = x + 2 * dir;

        // 1 STEP FORWARD
        if (one >= 0 && one < 8) {
            if (!board_state[one][y]) {
                if (ignoreCheck || this.isValid(board_state, one, y)) {
                    moves.push([one, y]);
                }
            }
        }

        // 2 STEP FORWARD
        if (!this.has_moved && two >= 0 && two < 8) {
            if (!board_state[one][y] && !board_state[two][y]) {
                if (ignoreCheck || this.isValid(board_state, two, y)) {
                    moves.push([two, y]);
                }
            }
        }

        // CAPTURE LEFT
        if (one >= 0 && one < 8 && y - 1 >= 0) {
            if (board_state[one][y - 1] && board_state[one][y - 1].color !== this.color) {
                if (ignoreCheck || this.isValid(board_state, one, y - 1)) {
                    moves.push([one, y - 1]);
                }
            }
        }

        // CAPTURE RIGHT
        if (one >= 0 && one < 8 && y + 1 < 8) {
            if (board_state[one][y + 1] && board_state[one][y + 1].color !== this.color) {
                if (ignoreCheck || this.isValid(board_state, one, y + 1)) {
                    moves.push([one, y + 1]);
                }
            }
        }

        return moves;
    }
}
