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
        this.moveId = 0;

        this.startGame();
    }

    startGame() {
        this.ui.drawBoard();
        this.ui.showPieces(this.board.grid);
        this.addEvents();
        this.addPositions(this.positions);
        this.addPositionsIdx(this.positionsIdx);
        this.history.push({
            idx: 0,
            state: this.board.getBoardState(this.board.grid),
            lastMove: [null, null],
            moveText: "",
        });
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
            return false;
        }

        // move phase

        ++this.counterMoves;

        if (piece.type === "king") {
            const row = piece.color === "black" ? 0 : 7;

            if (ty == 2) {
                const rook = this.board.grid[row][0];
                rook.move_to([row, 3]);
                this.board.grid[row][3] = rook;
                this.board.grid[row][0] = null;
            } else if (ty == 6) {
                const rook = this.board.grid[row][7];
                rook.move_to([row, 5]);
                this.board.grid[row][5] = rook;
                this.board.grid[row][7] = null;
            }
        }

        if (this.board.grid[tx][ty]) {
            this.eatenPieces[`${this.counterMoves}:${this.getId(tx, ty)}`] =
                this.board.grid[tx][ty];
        }

        piece.move_to([tx, ty]);
        this.board.grid[tx][ty] = piece;
        this.board.grid[fx][fy] = null;

        this.lastMove = [
            [fx, fy],
            [+tx, +ty],
        ];

        this.history.push({
            moveText: `${this.positions[`${fx}-${fy}`]}-${this.positions[`${tx}-${ty}`]}`,
            lastMove: this.lastMove,
            state: this.board.getBoardState(this.board.grid),
            idx: this.counterMoves - 1,
        });

        // change current player
        this.curentPlayer = this.curentPlayer == "white" ? "black" : "white";
        this.ui.writeMoves(this.history[this.history.length - 1], piece);

        // highlight the last move
        this.ui.highlightLastMove(this.lastMove);

        return true;
    }

    // adding events

    addEvents() {
        const fields = this.ui.board.children;

        for (const field of fields) {
            field.addEventListener("click", (event) => {
                if (this.moveId < this.history.length - 1) return;
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

                const hasMoved = this.move(fPiece, [x, y]);

                if (hasMoved) {
                    ++this.moveId;
                }

                // render
                this.ui.showPieces(this.board.grid);

                // reset selected
                this.selected = null;
                this.ui.clearHighlights();

                // add event on nodes

                this.addEventsOnNodes();
            });
        }

        this.undo.addEventListener("click", () => {
            if (this.moveId > 0) {
                const node = document.getElementById(`${--this.moveId}`);

                this.ui.clearHighlights();
                this.ui.showPieces(this.history[this.moveId].state);
                this.ui.clearHighlightLastMove();
                this.ui.clearActiveNode();

                if (node) {
                    this.ui.highlightLastMove(this.history[this.moveId].lastMove);
                    node.classList.add("active_node");
                }
            }
        });

        this.redo.addEventListener("click", () => {
            if (this.moveId >= this.history.length - 1) return;

            const node = document.getElementById(`${++this.moveId}`);

            this.ui.clearHighlights();
            this.ui.showPieces(this.history[this.moveId].state);
            this.ui.clearHighlightLastMove();
            this.ui.clearActiveNode();

            this.ui.highlightLastMove(this.history[this.moveId].lastMove);
            node.classList.add("active_node");
        });
    }

    addEventsOnNodes() {
        const nodes = document.querySelectorAll(".node");
        const last = nodes.length - 1;

        if (!nodes[last]) return;

        nodes[last].addEventListener("click", () => {
            const id = nodes[last].id;
            this.moveId = +id;
            this.ui.clearHighlights();
            this.ui.showPieces(this.history[this.moveId].state);
            this.ui.clearHighlightLastMove();
            this.ui.highlightLastMove(this.history[this.moveId].lastMove);
            this.ui.clearActiveNode();
            nodes[last].classList.add("active_node");
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
