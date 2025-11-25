export class UI {
    constructor() {
        this.board = document.getElementById("board");
        this.moves = document.getElementById("moves");
        this.lineRow = null;
        this.counter = 1;
        this.counterAllMoves = 1;
    }

    drawBoard() {
        const size = 8;
        let nums = 8;
        let char_codes = 0;

        for (let i = 0; i < size; ++i) {
            for (let j = 0; j < size; ++j) {
                const field = document.createElement("div");
                field.classList.add("field", (i + j) & 1 ? "dark" : "light");
                field.id = `${i}-${j}`;

                if (j == 0) {
                    const num = document.createElement("span");

                    if (nums & 1) {
                        num.style.color = "#ebecd2";
                    } else {
                        num.style.color = "#719557";
                    }

                    num.classList.add("nums_coard");
                    num.innerHTML = `${nums--}`;
                    field.appendChild(num);
                }

                if (i == 7) {
                    const char = document.createElement("span");

                    if (char_codes & 1) {
                        char.style.color = "#719557";
                    } else {
                        char.style.color = "#ebecd2";
                    }

                    char.classList.add("chars_coard");
                    char.innerHTML = String.fromCharCode(char_codes++ + 97);
                    field.appendChild(char);
                }

                this.board.appendChild(field);
            }
        }
    }

    showPieces(grid) {
        const size = 8;
        this.clearPieces();

        for (let i = 0; i < size; ++i) {
            for (let j = 0; j < size; ++j) {
                if (grid[i][j]) {
                    const field = document.getElementById(this.getId(i, j));
                    const img = document.createElement("img");
                    img.src = `../../images/pieces/${grid[i][j].color}-${grid[i][j].type}.png`;
                    img.classList.add("pieces");
                    field.appendChild(img);
                }
            }
        }
    }

    clearPieces() {
        const board = document.getElementById("board");
        const field = board.querySelectorAll(".field");

        for (const f of field) {
            const img = f.getElementsByClassName("pieces");
            if (img.length) {
                f.removeChild(img[0]);
            }
        }
    }

    // highlights

    highlights(board_state, piece) {
        if (!piece) return;

        const moves = piece.get_possible_moves(board_state);
        const [x, y] = piece.position;
        const clicked = document.getElementById(this.getId(x, y));
        clicked.classList.add((x + y) & 1 ? "clicked_dark" : "clicked_light");

        for (const [hx, hy] of moves) {
            const field = document.getElementById(this.getId(hx, hy));

            if (!board_state[hx][hy]) {
                field.classList.add("active_state");
                field.classList.add((hx + hy) & 1 ? "active_state_dark" : "active_state_light");
            } else {
                field.classList.add("active_state_on_piece");
                field.classList.add(
                    (hx + hy) & 1 ? "active_state_on_piece_dark" : "active_state_on_piece_light"
                );
            }
        }
    }

    highlightLastMove(lastMove) {
        this.clearHighlightLastMove();

        const [fx, fy] = lastMove[0];
        const [tx, ty] = lastMove[1];
        const from = document.getElementById(this.getId(fx, fy));
        const to = document.getElementById(this.getId(tx, ty));

        from.classList.add((fx + fy) & 1 ? "lastMove_dark" : "lastMove_light");
        to.classList.add((tx + ty) & 1 ? "lastMove_dark" : "lastMove_light");
    }

    clearHighlightLastMove() {
        const dark = document.querySelectorAll(".lastMove_dark");
        const light = document.querySelectorAll(".lastMove_light");

        for (const f of dark) {
            f.classList.remove("lastMove_dark");
        }

        for (const f of light) {
            f.classList.remove("lastMove_light");
        }
    }

    clearHighlights() {
        const active = document.querySelectorAll(".active_state");
        const active_dark = document.querySelectorAll(".active_state_dark");
        const active_light = document.querySelectorAll(".active_state_light");
        const activeP = document.querySelectorAll(".active_state_on_piece");
        const clicked_dark = document.querySelectorAll(".clicked_dark");
        const clicked_light = document.querySelectorAll(".clicked_light");
        const activeSOPD = document.querySelectorAll(".active_state_on_piece_dark");
        const activeSOPL = document.querySelectorAll(".active_state_on_piece_light");

        for (const f of active) {
            f.classList.remove("active_state");
        }

        for (const f of active_dark) {
            f.classList.remove("active_state_dark");
        }

        for (const f of active_light) {
            f.classList.remove("active_state_light");
        }

        for (const f of activeP) {
            f.classList.remove("active_state_on_piece");
        }

        for (const f of clicked_dark) {
            f.classList.remove("clicked_dark");
        }

        for (const f of clicked_light) {
            f.classList.remove("clicked_light");
        }

        for (const f of activeSOPD) {
            f.classList.remove("active_state_on_piece_dark");
        }

        for (const f of activeSOPL) {
            f.classList.remove("active_state_on_piece_light");
        }
    }

    // fucntions for history board

    writeMoves(move, piece, beforeStr = "", afterStr = "", specialMove = false, specialStr = "") {
        const moves = this.moves;
        const [from, to] = this.getUndoPos(move.moveText);
        const toText = to;

        this.clearActiveNode();

        const node = document.createElement("div");
        const span = document.createElement("span");

        node.id = this.counterAllMoves++;
        node.classList.add("node", "active_node");

        if (piece.type != "pawn" && !specialMove) {
            const icon = document.createElement("img");
            icon.src = `../../images/pieces/${piece.color}-${piece.type}.png`;
            node.appendChild(icon);
        }

        if (specialMove) {
            span.innerHTML = specialStr;
        } else {
            span.innerHTML = beforeStr + toText + afterStr;
        }

        node.appendChild(span);

        if (this.lineRow && this.lineRow.children.length < 2) {
            this.lineRow.appendChild(node);
        } else {
            this.lineRow = document.createElement("div");
            this.lineRow.classList.add(
                "line-row",
                this.counter & 1 ? "line-row-dark" : "line-row-light"
            );
            this.lineRow.innerHTML = `${this.counter++}.`;
            this.lineRow.appendChild(node);
        }

        moves.appendChild(this.lineRow);
    }

    clearActiveNode() {
        const active = document.querySelectorAll(".active_node");

        for (const node of active) {
            node.classList.remove("active_node");
        }
    }

    removeMove(history, undo) {
        const id = history.pop();
        undo.push(id);
        const p = document.getElementById(id);
        const moves = document.getElementById("moves");
        moves.removeChild(p);
        return this.getUndoPos(id);
    }

    // helper functions

    getUndoPos(id) {
        return id.split("-");
    }

    getId(x, y) {
        return `${x}-${y}`;
    }
}
