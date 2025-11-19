export class Piece {
    constructor(color, position, type) {
        this.color = color;
        this.position = position;
        this.type = type;
        this.has_moved = false;
    }

    move_to(new_position) {
        this.position = new_position;
        this.has_moved = true;
    }

    get_possible_moves(board_state, ignoreCheck = false) {
        throw new Error("abstract method can't be called");
    }

    legal_moves_in_board(grid) {
        const map = Array.from({ length: 8 }, () => Array(8).fill(false));
        const size = 8;

        for (let i = 0; i < size; ++i) {
            for (let j = 0; j < size; ++j) {
                const piece = grid[i][j];

                if (!piece || piece.color == this.color) {
                    continue;
                }

                const moves = piece.get_possible_moves(grid, true);

                for (const [mx, my] of moves) {
                    map[mx][my] = true;
                }
            }
        }

        return map;
    }

    isValid(board_state, x, y) {
        const copy_board = this.simulate_move(board_state, this.position, [x, y]);

        return !this.isChecked(copy_board);
    }

    isChecked(board) {
        const map = this.legal_moves_in_board(board);
        const size = 8;
        let kingX = -1;
        let kingy = -1;

        for (let i = 0; i < size; ++i) {
            for (let j = 0; j < size; ++j) {
                if (board[i][j] && board[i][j].type == "king" && board[i][j].color == this.color) {
                    kingX = i;
                    kingy = j;
                }
            }
        }

        return map[kingX][kingy];
    }

    simulate_move(board_state, from, to) {
        const size = 8;

        const copy = Array.from({ length: size }, () => Array(size).fill(null));

        for (let i = 0; i < size; ++i) {
            for (let j = 0; j < size; ++j) {
                const p = board_state[i][j];
                if (!p) continue;

                const clone = new p.constructor(p.color, [...p.position], p.type);

                for (const key of Object.keys(p)) {
                    if (!(key in clone)) {
                        clone[key] = JSON.parse(JSON.stringify(p[key]));
                    }
                }

                clone.has_moved = p.has_moved;

                copy[i][j] = clone;
            }
        }

        const [fx, fy] = from;
        const [tx, ty] = to;

        copy[tx][ty] = copy[fx][fy];
        copy[fx][fy] = null;

        copy[tx][ty].position = [tx, ty];

        return copy;
    }
}
