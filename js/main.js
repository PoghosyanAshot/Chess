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
        this.positions = {};
        this.positionsIdx = {};
        this.lastMove = null;
        this.undo = document.getElementById("undo");
        this.redo = document.getElementById("redo");

        this.ui.drawBoard();
        this.ui.showPieces(this.board.grid);
        this.addEvents();
        this.addPositions(this.positions);
        this.addPositionsIdx(this.positionsIdx);
        this.addEventForUndoRedo();
    }

    addEvents() {
        const fields = this.ui.board.children;

        for (const field of fields) {
            field.addEventListener("click", (event) => {
                const clicked = event.target.closest(".field");
                if (!clicked) return;

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

                const moves = fPiece.get_possible_moves(this.board.grid);

                let legal = false;
                for (const [mx, my] of moves) {
                    if (mx == x && my == y) {
                        legal = true;
                        break;
                    }
                }

                if (!legal) {
                    this.selected = null;
                    this.ui.clearHighlights();
                    return;
                }

                // move

                fPiece.move_to([x, y]);
                this.board.grid[x][y] = fPiece;
                this.board.grid[fx][fy] = null;

                this.history.push(
                    `${this.positions[`${fx}-${fy}`]}-${this.positions[`${x}-${y}`]}`
                );

                this.lastMove = [
                    [fx, fy],
                    [x, y],
                ];

                // render

                this.ui.showPieces(this.board.grid);

                // reset selected

                this.selected = null;
                this.ui.clearHighlights();

                // change curent player

                this.curentPlayer = this.curentPlayer == "white" ? "black" : "white";

                this.ui.writeMoves(this.history[this.history.length - 1]);
            });
        }
    }

    getPosition(id) {
        return id.split("-");
    }

    getId(x, y) {
        return `${x}-${y}`;
    }

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

    addEventForUndoRedo() {
        this.undo.addEventListener("click", (event) => {
            if (!this.history.length) {
                return;
            }

            const [to, from] = this.ui.removeMove(this.history, this.removesMoves);
            const [fx, fy] = this.positionsIdx[from];
            const [tx, ty] = this.positionsIdx[to];
            const piece = this.board.grid[fx][fy];

            this.board.grid[tx][ty] = piece;
            this.board.grid[fx][fy] = null;
            piece.move_to([tx, ty]);
            piece.countMoves -= 2;

            if (piece.countMoves <= 0) {
                piece.has_moved = false;
            }

            this.ui.showPieces(this.board.grid);
            this.curentPlayer = this.curentPlayer == "white" ? "black" : "white";
        });

        this.redo.addEventListener("click", (event) => {
            console.log("world");
        });
    }
}

new Game();
