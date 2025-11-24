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

        this.grid[7][0] = new Rook("white", [7, 0], "rook");
        this.grid[7][1] = new Knight("white", [7, 1], "knight");
        this.grid[7][2] = new Bishop("white", [7, 2], "bishop");
        this.grid[7][3] = new Queen("white", [7, 3], "queen");
        this.grid[7][4] = new King("white", [7, 4], "king");
        this.grid[7][5] = new Bishop("white", [7, 5], "bishop");
        this.grid[7][6] = new Knight("white", [7, 6], "knight");
        this.grid[7][7] = new Rook("white", [7, 7], "rook");

        // black pieces

        this.grid[0][0] = new Rook("black", [0, 0], "rook");
        this.grid[0][1] = new Knight("black", [0, 1], "knight");
        this.grid[0][2] = new Bishop("black", [0, 2], "bishop");
        this.grid[0][3] = new Queen("black", [0, 3], "queen");
        this.grid[0][4] = new King("black", [0, 4], "king");
        this.grid[0][5] = new Bishop("black", [0, 5], "bishop");
        this.grid[0][6] = new Knight("black", [0, 6], "knight");
        this.grid[0][7] = new Rook("black", [0, 7], "rook");
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
}
