import { UI } from "./UI/UI.js";
import { Board } from "./UI/board.js";

class Game {
    constructor() {
        this.ui = new UI();
        this.board = new Board();
        this.selected = null;
        this.curentPlayer = "white";
        this.history = [];
        this.removesMoves = [];
        this.eatenPieces = {};
        this.positions = {};
        this.positionsIdx = {};
        this.lastMove = null;
        this.undo = document.getElementById("undo");
        this.redo = document.getElementById("redo");
        this.counterMoves = 0;

        this.startGame();
    }

    startGame() {
        this.ui.drawBoard();
        this.ui.showPieces(this.board.grid);
        this.addEvents();
        this.addPositions(this.positions);
        this.addPositionsIdx(this.positionsIdx);
        this.addEventForUndoRedo();
    }

    // move piece

    move(piece, to) {
        const [fx, fy] = piece.position;
        const [tx, ty] = to;
        const moves = piece.get_possible_moves(this.board.grid);
        let legal = false;

        // check if the piece can move
        for (const [mx, my] of moves) {
            if (mx == tx && my == ty) {
                legal = true;
                break;
            }
        }

        if (!legal) {
            this.selected = null;
            this.ui.clearHighlights();
            return;
        }

        // move phase
        ++this.counterMoves;

        if (this.board.grid[tx][ty]) {
            this.eatenPieces[`${this.counterMoves}:${this.getId(tx, ty)}`] =
                this.board.grid[tx][ty];
        }

        piece.move_to([tx, ty]);
        this.board.grid[tx][ty] = piece;
        this.board.grid[fx][fy] = null;

        this.history.push(`${this.positions[`${fx}-${fy}`]}-${this.positions[`${tx}-${ty}`]}`);

        this.lastMove = [
            [fx, fy],
            [tx, ty],
        ];

        // change current player
        this.curentPlayer = this.curentPlayer == "white" ? "black" : "white";

        // write move in history board
        this.ui.writeMoves(this.history[this.history.length - 1]);
    }

    // adding events

    addEvents() {
        const fields = this.ui.board.children;

        for (const field of fields) {
            field.addEventListener("click", (event) => {
                const clicked = event.target.closest(".field");
                if (!clicked || this.removesMoves.length) return;

                const [x, y] = this.getPosition(clicked.id);
                const piece = this.board.grid[x][y];

                // select piece

                if (!this.selected) {
                    if (!piece || piece.color != this.curentPlayer) return;
                    this.selected = [x, y];
                    this.ui.clearHighlights();
                    this.ui.highlights(this.board.grid, piece);
                    return;
                }

                // move phase

                const [fx, fy] = this.selected;
                const fPiece = this.board.grid[fx][fy];

                this.move(fPiece, [x, y]);

                // render

                this.ui.showPieces(this.board.grid);

                // reset selected

                this.selected = null;
                this.ui.clearHighlights();

                // change curent player

                // write move in history board
            });
        }
    }

    addEventForUndoRedo() {
        this.undo.addEventListener("click", (event) => {
            if (!this.history.length) {
                return;
            }

            const counter = this.counterMoves--;
            const [to, from] = this.ui.removeMove(this.history, this.removesMoves);
            const [fx, fy] = this.positionsIdx[from];
            const [tx, ty] = this.positionsIdx[to];
            const piece = this.board.grid[fx][fy];

            if (this.eatenPieces[`${counter}:${this.getId(fx, fy)}`]) {
                this.board.grid[fx][fy] = this.eatenPieces[`${counter}:${this.getId(fx, fy)}`];
                delete this.eatenPieces[`${counter}:${this.getId(fx, fy)}`];
            } else {
                this.board.grid[fx][fy] = null;
            }

            this.board.grid[tx][ty] = piece;
            piece.move_to([tx, ty]);
            piece.countMoves -= 2;

            if (piece.countMoves <= 0) {
                piece.has_moved = false;
            }

            this.ui.showPieces(this.board.grid);
            this.selected = null;
        });

        this.redo.addEventListener("click", (event) => {
            if (!this.removesMoves.length) return;

            const move = this.removesMoves.pop();
            let [from, to] = this.getPosition(move);
            from = this.positionsIdx[from];
            to = this.positionsIdx[to];
            const [fx, fy] = from;
            const piece = this.board.grid[fx][fy];

            this.move(piece, to);
            this.ui.showPieces(this.board.grid);
        });
    }

    // init positions

    addPositions(map) {
        let num = 8;

        for (let i = 0; i < 8; ++i, --num) {
            for (let j = 0; j < 8; ++j) {
                const char = String.fromCharCode(j + 97);
                map[`${i}-${j}`] = `${char}${num}`;
            }
        }
    }

    addPositionsIdx(map) {
        let num = 8;

        for (let i = 0; i < 8; ++i, --num) {
            for (let j = 0; j < 8; ++j) {
                const char = String.fromCharCode(j + 97);
                map[`${char}${num}`] = [i, j];
            }
        }
    }

    // helper functions

    getPosition(id) {
        return id.split("-");
    }

    getId(x, y) {
        return `${x}-${y}`;
    }
}

new Game();
