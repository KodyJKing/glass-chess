import Checkbox from "@krisnye/glass-platform/ui/html/components/Checkbox"
import Stylesheets from "@krisnye/glass-platform/ui/html/Stylesheets"
import HtmlContext from "@krisnye/glass-platform/ui/html/HtmlContext"
import Context from "@krisnye/glass-platform/ui/Context"
import Key, { ModelKey } from "@krisnye/glass-platform/data/Key"
import Model from "@krisnye/glass-platform/data/Model"
import State from "@krisnye/glass-platform/data/State"

import { Engine } from "../engine/Engine"
import Position from "../engine/Position"
import Piece from "../engine/Piece"
import { Type } from "../engine/Type"
import { Color } from "../engine/Color"
import Move from "../engine/Move"

const WIDTH = 800
const SQUARE_WIDTH = WIDTH / 8

const WHITE = "darkseagreen"
const BLACK = "seagreen"
const OUTLINE = "#256F46"

Stylesheets.add(t => `
    .Game {
        display: flex;
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0px;
        left: 0px;
        user-select: none;
        background: #262626;
        color: white;
    }

    .Board {
        position: relative;
        width: ${WIDTH}px;
        height: ${WIDTH}px;
        background: ${t.colors.background.light};
        overflow: hidden;
        border-radius: 8px;
        box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.1);
        transition: transform .5s ease-in-out;
    }

    .Rotated {
        transform:rotate(180deg);
    }

    .Square {
        position: absolute;
        width: ${SQUARE_WIDTH}px;
        height: ${SQUARE_WIDTH}px;
        display: flex;
    }

    .Square_highlighted {
        filter: saturate(125%) brightness(110%);
        box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
        z-index: 1;
        margin-left: 1.5px;
        margin-top: 1.5px;
        outline: ${OUTLINE} 3px solid;
        width: ${SQUARE_WIDTH - 3}px;
        height: ${SQUARE_WIDTH - 3}px;
    }

    .Piece {
        flex-grow: 1;
        transition: transform .7s ease-in-out;
    }

    .Piece_highlighted {
        filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.5));
    }
`)

@Model.class()
class AppState extends State {
    @Model.property({ type: "number", default: -1 })
    selectX!: number

    @Model.property({ type: "number", default: -1 })
    selectY!: number

    @Model.property({ type: "number", default: -1 })
    hoverX!: number

    @Model.property({ type: "number", default: -1 })
    hoverY!: number

    @Model.property({ type: "boolean", default: false })
    debug!: boolean

    static readonly store = "memory"
    static key = Key.create(AppState, "0")
}

const engine = new Engine().standardSetup()

function board(c: Context) {
    let { store, localize, text } = c
    let { render, end, div, img } = HtmlContext(c)
    let appState = store.get(AppState.key)
    let { selectX, selectY } = appState

    let selectPos = Position.create(selectX, selectY)
    let moves = engine.generateSafeMovesAt(selectPos)
    let selection = {}
    for (let move of moves)
        selection[Move.get.to(move)] = move

    let rotate = engine.turn === Color.Black

    div({ class: "Board" + (rotate ? " Rotated" : "") })
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            let pos = Position.create(x, y)
            let piece = Piece.toObject(engine.pieces[pos])
            let move = selection[pos]
            let highlighted = move !== undefined
            let selected = x == selectX && y == selectY
            let color = (x + y) % 2 == 0 ? WHITE : BLACK

            div({
                class: `Square ${highlighted ? "Square_highlighted" : ""}`,
                style: `
                        left: ${x * SQUARE_WIDTH}px;
                        top: ${y * SQUARE_WIDTH}px;
                        background: ${color}; `,
                onclick() {
                    if (selected) {
                        store.patch(AppState.key, { selectX: -1, selectY: -1 })
                    } else if (highlighted) {
                        engine.doMove(move)
                        store.patch(AppState.key, { selectX: -1, selectY: -1 })
                    } else {
                        if (piece.color === engine.turn || appState.debug)
                            store.patch(AppState.key, { selectX: x, selectY: y })
                    }
                }
            })
            if (piece.type != Type.Empty) {
                let colorName = Color[piece.color]
                let typeName = Type[piece.type]
                let pieceName = colorName.toLowerCase() + typeName
                img({
                    src: "/pieces/" + pieceName + ".svg",
                    class: `Piece ${(selected || highlighted) ? "Piece_highlighted" : ""} ${rotate ? " Rotated" : ""}`,
                    draggable: false
                })
                end()
            }
            end()

        }
    }
    end()
}

Context.bind(c => {
    let { store, localize, text } = c
    let { render, end, div, h1 } = HtmlContext(c)
    let appState = store.get(AppState.key)

    div({ class: "Game" })
        div({ style: "flex-grow: 1;" }); end()
            div({ style: "margin: 16px;" })
                div({ style: "padding-bottom: 8px;" })
                h1("Glass Chess")
                end()
                render(board)
                div({ style: "padding-top: 8px; display: flex" })
                    text("Turn: " + Color[engine.turn])
                    div({ style: "flex-grow: 1" }); end()
                    text("Debug")
                    render(Checkbox, {
                        id: "debug",
                        value: appState.debug,
                        onchange(this: HTMLInputElement) {
                            store.patch(AppState.key, { debug: this.checked })
                        }
                    })
                end()
            end()
        div({ style: "flex-grow: 1;" }); end()
    end()
})