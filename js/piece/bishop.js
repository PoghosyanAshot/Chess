import { Piece } from "./piece.js";

export class Bishop extends Piece {
    constructor(color, position, type) {
        super(color, position, type);
    }

    get_possible_moves(board_state, ignoreCheck = false) {
        const moves = [];
        const size = 8;
        const [x, y] = this.position;

        for (let rx = x + 1, cy = y + 1; rx < size && cy < size; ++rx, ++cy) {
            if (!board_state[rx][cy] || board_state[rx][cy].color != this.color) {
                if (ignoreCheck) {
                    moves.push([rx, cy]);

                    if (board_state[rx][cy] && board_state[rx][cy].color != this.color) {
                        break;
                    }

                    continue;
                }

                if (this.isValid(board_state, rx, cy)) {
                    moves.push([rx, cy]);
                }

                if (board_state[rx][cy] && board_state[rx][cy].color != this.color) {
                    break;
                }
            } else {
                break;
            }
        }

        for (let rx = x - 1, cy = y - 1; rx >= 0 && cy >= 0; --rx, --cy) {
            if (!board_state[rx][cy] || board_state[rx][cy].color != this.color) {
                if (ignoreCheck) {
                    moves.push([rx, cy]);

                    if (board_state[rx][cy] && board_state[rx][cy].color != this.color) {
                        break;
                    }

                    continue;
                }

                if (this.isValid(board_state, rx, cy)) {
                    moves.push([rx, cy]);
                }

                if (board_state[rx][cy] && board_state[rx][cy].color != this.color) {
                    break;
                }
            } else {
                break;
            }
        }

        for (let rx = x - 1, cy = y + 1; rx >= 0 && cy < size; --rx, ++cy) {
            if (!board_state[rx][cy] || board_state[rx][cy].color != this.color) {
                if (ignoreCheck) {
                    moves.push([rx, cy]);

                    if (board_state[rx][cy] && board_state[rx][cy].color != this.color) {
                        break;
                    }

                    continue;
                }

                if (this.isValid(board_state, rx, cy)) {
                    moves.push([rx, cy]);
                }

                if (board_state[rx][cy] && board_state[rx][cy].color != this.color) {
                    break;
                }
            } else {
                break;
            }
        }

        for (let rx = x + 1, cy = y - 1; rx < size && cy >= 0; ++rx, --cy) {
            if (!board_state[rx][cy] || board_state[rx][cy].color != this.color) {
                if (ignoreCheck) {
                    moves.push([rx, cy]);

                    if (board_state[rx][cy] && board_state[rx][cy].color != this.color) {
                        break;
                    }

                    continue;
                }

                if (this.isValid(board_state, rx, cy)) {
                    moves.push([rx, cy]);
                }

                if (board_state[rx][cy] && board_state[rx][cy].color != this.color) {
                    break;
                }
            } else {
                break;
            }
        }
    
        return moves;
    }
}
