import { Rook } from "../piece/rook.js";
import { Pawn } from "../piece/pawn.js";
import { Knight } from "../piece/knight.js";
import { Bishop } from "../piece/bishop.js";
import { Queen } from "../piece/queen.js";
import { King } from "../piece/king.js";

export class Board {
    constructor() {
        this.grid = Array.from({ length: 8 }, () => Array(8).fill(null));

        this.init_board();
    }

    init_board() {
        const size = 8;

        // add pawns

        for (let i = 0; i < size; ++i) {
            this.grid[1][i] = new Pawn("black", [1, i], "pawn");
            this.grid[6][i] = new Pawn("white", [6, i], "pawn");
        }

        // white pieces

        this.grid[7][0] = this.init_rook("white", [7, 0]);
        this.grid[7][1] = this.init_knigth("white", [7, 1]);
        this.grid[7][2] = this.init_bishop("white", [7, 2]);
        this.grid[7][3] = this.init_queen("white", [7, 3]);
        this.grid[7][4] = this.init_king("white", [7, 4]);
        this.grid[7][5] = this.init_bishop("white", [7, 5]);
        this.grid[7][6] = this.init_knigth("white", [7, 6]);
        this.grid[7][7] = this.init_rook("white", [7, 7]);

        // black pieces

        this.grid[0][0] = this.init_rook("black", [0, 0]);
        this.grid[0][1] = this.init_knigth("black", [0, 1]);
        this.grid[0][2] = this.init_bishop("black", [0, 2]);
        this.grid[0][3] = this.init_queen("black", [0, 3]);
        this.grid[0][4] = this.init_king("black", [0, 4]);
        this.grid[0][5] = this.init_bishop("black", [0, 5]);
        this.grid[0][6] = this.init_knigth("black", [0, 6]);
        this.grid[0][7] = this.init_rook("black", [0, 7]);
    }

    getBoardState(board) {
        const state = Array.from({ length: 8 }, () => Array(8).fill(null));

        for (let i = 0; i < 8; ++i) {
            for (let j = 0; j < 8; ++j) {
                const piece = board[i][j];
                if (piece) {
                    state[i][j] = piece;
                }
            }
        }

        return state;
    }

    // init pieces

    init_queen(color, pos) {
        return new Queen(color, pos, "queen");
    }

    init_king(color, pos) {
        return new King(color, pos, "king");
    }

    init_rook(color, pos) {
        return new Rook(color, pos, "rook");
    }

    init_knigth(color, pos) {
        return new Knight(color, pos, "knight");
    }

    init_bishop(color, pos) {
        return new Bishop(color, pos, "bishop");
    }

    init_pawn(color, pos) {
        return new Pawn(color, pos, "pawn");
    }
}
