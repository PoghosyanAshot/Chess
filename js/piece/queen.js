import { Piece } from "./piece.js";

export class Queen extends Piece {
    constructor(color, position, type) {
        super(color, position, type);
    }

    get_possible_moves(board_state, ignoreCheck = false) {
        const moves = [];
        const size = 8;
        const [x, y] = this.position;

        // horizonal and vertical

        for (let tx = x + 1, ty = y; tx < size; ++tx) {
            if (!board_state[tx][ty] || board_state[tx][ty].color != this.color) {
                if (ignoreCheck) {
                    moves.push([tx, ty]);

                    if (board_state[tx][ty]) {
                        break;
                    }

                    continue;
                }

                if (this.isValid(board_state, tx, ty)) {
                    moves.push([tx, ty]);
                }

                if (board_state[tx][ty]) {
                    break;
                }
            } else {
                break;
            }
        }

        for (let tx = x - 1, ty = y; tx >= 0; --tx) {
            if (!board_state[tx][ty] || board_state[tx][ty].color != this.color) {
                if (ignoreCheck) {
                    moves.push([tx, ty]);

                    if (board_state[tx][ty]) {
                        break;
                    }

                    continue;
                }

                if (this.isValid(board_state, tx, ty)) {
                    moves.push([tx, ty]);
                }

                if (board_state[tx][ty]) {
                    break;
                }
            } else {
                break;
            }
        }

        for (let tx = x, ty = y + 1; ty < size; ++ty) {
            if (!board_state[tx][ty] || board_state[tx][ty].color != this.color) {
                if (ignoreCheck) {
                    moves.push([tx, ty]);

                    if (board_state[tx][ty]) {
                        break;
                    }

                    continue;
                }

                if (this.isValid(board_state, tx, ty)) {
                    moves.push([tx, ty]);
                }

                if (board_state[tx][ty]) {
                    break;
                }
            } else {
                break;
            }
        }

        for (let tx = x, ty = y - 1; ty >= 0; --ty) {
            if (!board_state[tx][ty] || board_state[tx][ty].color != this.color) {
                if (ignoreCheck) {
                    moves.push([tx, ty]);

                    if (board_state[tx][ty]) {
                        break;
                    }

                    continue;
                }

                if (this.isValid(board_state, tx, ty)) {
                    moves.push([tx, ty]);
                }

                if (board_state[tx][ty]) {
                    break;
                }
            } else {
                break;
            }
        }

        // diaganals

        for (let tx = x + 1, ty = y + 1; tx < size && ty < size; ++tx, ++ty) {
            if (!board_state[tx][ty] || board_state[tx][ty].color != this.color) {
                if (ignoreCheck) {
                    moves.push([tx, ty]);

                    if (board_state[tx][ty]) {
                        break;
                    }

                    continue;
                }

                if (this.isValid(board_state, tx, ty)) {
                    moves.push([tx, ty]);
                }

                if (board_state[tx][ty]) {
                    break;
                }
            } else {
                break;
            }
        }

        for (let tx = x - 1, ty = y - 1; tx >= 0 && ty >= 0; --tx, --ty) {
            if (!board_state[tx][ty] || board_state[tx][ty].color != this.color) {
                if (ignoreCheck) {
                    moves.push([tx, ty]);

                    if (board_state[tx][ty]) {
                        break;
                    }

                    continue;
                }

                if (this.isValid(board_state, tx, ty)) {
                    moves.push([tx, ty]);
                }

                if (board_state[tx][ty]) {
                    break;
                }
            } else {
                break;
            }
        }

        for (let tx = x - 1, ty = y + 1; tx >= 0 && ty < size; --tx, ++ty) {
            if (!board_state[tx][ty] || board_state[tx][ty].color != this.color) {
                if (ignoreCheck) {
                    moves.push([tx, ty]);

                    if (board_state[tx][ty]) {
                        break;
                    }

                    continue;
                }

                if (this.isValid(board_state, tx, ty)) {
                    moves.push([tx, ty]);
                }

                if (board_state[tx][ty]) {
                    break;
                }
            } else {
                break;
            }
        }

        for (let tx = x + 1, ty = y - 1; tx < size && ty >= 0; ++tx, --ty) {
            if (!board_state[tx][ty] || board_state[tx][ty].color != this.color) {
                if (ignoreCheck) {
                    moves.push([tx, ty]);

                    if (board_state[tx][ty]) {
                        break;
                    }

                    continue;
                }

                if (this.isValid(board_state, tx, ty)) {
                    moves.push([tx, ty]);
                }

                if (board_state[tx][ty]) {
                    break;
                }
            } else {
                break;
            }
        }

        return moves;
    }
}
