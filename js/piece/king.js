import { Piece } from "./piece.js";

export class King extends Piece {
    constructor(color, position, type) {
        super(color, position, type);
    }

    get_possible_moves(board_state, ignoreCheck = false) {
        const size = 8;
        const moves = [];
        const [x, y] = this.position;
        const dirs = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1],
        ];

        for (const dir of dirs) {
            const [dx, dy] = dir;
            const tx = x + dx;
            const ty = y + dy;

            if (tx < 0 || tx >= size || ty < 0 || ty >= size) {
                continue;
            }

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

        // castling

        const row = this.color == "black" ? 0 : 7;

        if (!this.has_moved) {
            // king-side castlig

            if (
                board_state[row][7] &&
                board_state[row][7].type == "rook" &&
                !board_state[row][7].has_moved
            ) {
                if (!board_state[row][5] && !board_state[row][6]) {
                    if (ignoreCheck) {
                        moves.push([row, 6]);
                    } else {
                        if (
                            this.isValid(board_state, row, 5) &&
                            this.isValid(board_state, row, 6)
                        ) {
                            moves.push([row, 6]);
                        }
                    }
                }
            }

            // queen-side castlig

            if (
                board_state[row][0] &&
                board_state[row][0].type == "rook" &&
                !board_state[row][0].has_moved
            ) {
                if (!board_state[row][3] && !board_state[row][2] && !board_state[row][1]) {
                    if (ignoreCheck) {
                        moves.push([row, 2]);
                    } else {
                        if (
                            this.isValid(board_state, row, 3) &&
                            this.isValid(board_state, row, 2)
                        ) {
                            moves.push([row, 2]);
                        }
                    }
                }
            }
        }

        return moves;
    }
}
