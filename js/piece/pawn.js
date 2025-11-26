import { Piece } from "./piece.js";

export class Pawn extends Piece {
    constructor(color, position, type) {
        super(color, position, type);
        this.enPassat = false;
    }

    get_possible_moves(board_state, ignoreCheck = false, lastMove = null) {
        const moves = [];
        const [x, y] = this.position;
        const dir = this.color === "black" ? 1 : -1;

        const one = x + dir;
        const two = x + 2 * dir;

        // 1 step
        if (one >= 0 && one < 8) {
            if (!board_state[one][y]) {
                if (ignoreCheck || this.isValid(board_state, one, y)) {
                    moves.push([one, y]);
                }
            }
        }

        // 2 step
        if (!this.has_moved && two >= 0 && two < 8) {
            if (!board_state[one][y] && !board_state[two][y]) {
                if (ignoreCheck || this.isValid(board_state, two, y)) {
                    moves.push([two, y]);
                }
            }
        }

        // capture left
        if (one >= 0 && one < 8 && y - 1 >= 0) {
            if (board_state[one][y - 1] && board_state[one][y - 1].color !== this.color) {
                if (ignoreCheck || this.isValid(board_state, one, y - 1)) {
                    moves.push([one, y - 1]);
                }
            }
        }

        // capture right
        if (one >= 0 && one < 8 && y + 1 < 8) {
            if (board_state[one][y + 1] && board_state[one][y + 1].color !== this.color) {
                if (ignoreCheck || this.isValid(board_state, one, y + 1)) {
                    moves.push([one, y + 1]);
                }
            }
        }

        // en-passat move
        if (lastMove && lastMove.piece.type == "pawn") {
            const [fx, fy] = lastMove.from;
            const [tx, ty] = lastMove.to;
            const step = Math.abs(tx - fx);

            if (step == 2) {
                if ((ty - 1 == y || ty + 1 == y) && tx == x) {
                    if (ty + 1 == y) {
                        if (ignoreCheck || this.isValid(board_state, one, y - 1)) {
                            this.enPassat = true;
                            moves.push([one, y - 1]);
                        }
                    }

                    if (ty - 1 == y) {
                        if (ignoreCheck || this.isValid(board_state, one, y + 1)) {
                            this.enPassat = true;
                            moves.push([one, y + 1]);
                        }
                    }
                }
            } else {
                this.enPassat = false;
            }
        }

        return moves;
    }
}
