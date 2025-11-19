import { UI } from "./UI/UI.js";
import { Board } from "./UI/board.js";

class Game {
    constructor() {
        this.ui = new UI();
        this.board = new Board();
        this.selected = null;
        this.to = null;

        this.ui.drawBoard();
        this.ui.showPieces(this.board.grid);
        this.addEvents();
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
                    if (!piece) return;
                    this.selected = [x, y];
                    this.ui.clearHighlights();
                    this.ui.highlights(this.board.grid, piece);
                    return;
                }

                // move phase

                const [fx, fy] = this.selected;
                const fPiece = this.board.grid[fx][fy];
                console.log(fPiece.position);
                console.log(fPiece);

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

                // render

                this.ui.showPieces(this.board.grid);

                // reset selected

                this.selected = null;
                this.ui.clearHighlights();
            });
        }
    }

    getPosition(id) {
        return id.split("-");
    }

    getId(x, y) {
        return `${x}-${y}`;
    }
}

new Game();
