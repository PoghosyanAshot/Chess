import { Piece } from "./piece.js";

export class Rook extends Piece {
    constructor(color, position, type) {
        super(color, position, type);
    }

    get_possible_moves(board_state, ignoreCheck = false) {
        const [x, y] = this.position;
        const size = 8;
        const moves = [];

        for (let i = x + 1; i < size; ++i) {
            if (!board_state[i][y] || board_state[i][y].color != this.color) {
                if (ignoreCheck) {
                    moves.push([i, y]);

                    if (board_state[i][y] && board_state[i][y].color != this.color) {
                        break;
                    }

                    continue;
                }

                if (this.isValid(board_state, i, y)) {
                    moves.push([i, y]);
                }

                if (board_state[i][y] && board_state[i][y].color != this.color) {
                    break;
                }
            } else {
                break;
            }
        }

        for (let i = x - 1; i >= 0; --i) {
            if (!board_state[i][y] || board_state[i][y].color != this.color) {
                if (ignoreCheck) {
                    moves.push([i, y]);

                    if (board_state[i][y] && board_state[i][y].color != this.color) {
                        break;
                    }

                    continue;
                }

                if (this.isValid(board_state, i, y)) {
                    moves.push([i, y]);
                }

                if (board_state[i][y] && board_state[i][y].color != this.color) {
                    break;
                }
            } else {
                break;
            }
        }

        for (let i = y + 1; i < size; ++i) {
            if (!board_state[x][i] || board_state[x][i].color != this.color) {
                if (ignoreCheck) {
                    moves.push([x, i]);

                    if (board_state[x][i] && board_state[x][i].color != this.color) {
                        break;
                    }

                    continue;
                }

                if (this.isValid(board_state, x, i)) {
                    moves.push([x, i]);
                }

                if (board_state[x][i] && board_state[x][i].color != this.color) {
                    break;
                }
            } else {
                break;
            }
        }

        for (let i = y - 1; i >= 0; --i) {
            if (!board_state[x][i] || board_state[x][i].color != this.color) {
                if (ignoreCheck) {
                    moves.push([x, i]);

                    if (board_state[x][i] && board_state[x][i].color != this.color) {
                        break;
                    }

                    continue;
                }

                if (this.isValid(board_state, x, i)) {
                    moves.push([x, i]);
                }

                if (board_state[x][i] && board_state[x][i].color != this.color) {
                    break;
                }
            } else {
                break;
            }
        }

        return moves;
    }
}
