// import SignupForm from "@krisnye/glass-platform/html/components/SignupForm"
import Checkbox from "@krisnye/glass-platform/ui/html/components/Checkbox"
import Stylesheets from "@krisnye/glass-platform/ui/html/Stylesheets"
import HtmlContext from "@krisnye/glass-platform/ui/html/HtmlContext"
import Context from "@krisnye/glass-platform/ui/Context"
import Key, { ModelKey } from "@krisnye/glass-platform/data/Key"
import Model from "@krisnye/glass-platform/data/Model"
import State from "@krisnye/glass-platform/data/State"

import { Game } from "../engine/Game"
import Position from "../engine/Position"
import Piece from "../engine/Piece"
import { Type } from "../engine/Type"
import { Color } from "../engine/Color"
import Move from "../engine/Move"
import Store from "@krisnye/glass-platform/data/Store";

const WIDTH = 800
const SQUARE_WIDTH = WIDTH / 8

const WHITE = "darkseagreen"
const BLACK = "seagreen"
const OUTLINE = "#256F46"

Stylesheets.add(t => `
    .Game {
        display: flex;
        width: 100vw;
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
        marigin: 2px;
        outline: ${OUTLINE} 3px solid;
    }

    .Piece {
        flex-grow: 1;
    }

    .Piece_highlighted {
        filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.5));
    }
`)

@Model.class()
class GameState extends State {

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
    static key = Key.create(GameState, "0")
}

const game = new Game().standardSetup()

function board(c: Context) {
    let { store, localize, text } = c
    let { render, end, div, img } = HtmlContext(c)
    let gameState = store.get(GameState.key)
    let { selectX, selectY } = gameState

    let selectPos = Position.create(selectX, selectY)
    let moves = game.generateSafeMovesAt(selectPos)
    let selection = {}
    for (let move of moves)
        selection[Move.get.to(move)] = move

    div({ class: "Board" })
    for (let _x = 0; _x < 8; _x++) {
        for (let _y = 0; _y < 8; _y++) {
            let y = (game.turn == Color.White) ? _y : 7 - _y
            let x = (game.turn == Color.White) ? _x : 7 - _x
            let pos = Position.create(x, y)
            let piece = Piece.toObject(game.pieces[pos])
            let move = selection[pos]
            let highlighted = move !== undefined
            let selected = x == selectX && y == selectY
            let color = (x + y) % 2 == 0 ? WHITE : BLACK

            div({
                class: `Square ${highlighted ? "Square_highlighted" : ""}`,
                style: `
                        left: ${_x * SQUARE_WIDTH}px;
                        top: ${_y * SQUARE_WIDTH}px;
                        background: ${color}; `,
                onclick() {
                    if (selected) {
                        store.patch(GameState.key, { selectX: -1, selectY: -1 })
                    } else if (highlighted) {
                        game.doMove(move)
                        store.patch(GameState.key, { selectX: -1, selectY: -1 })
                    } else {
                        if (piece.color === game.turn || gameState.debug)
                            store.patch(GameState.key, { selectX: x, selectY: y })
                    }
                }
            })
            if (piece.type != Type.Empty) {
                let colorName = Color[piece.color]
                let typeName = Type[piece.type]
                let pieceName = colorName.toLowerCase() + typeName
                img({
                    src: "/pieces/" + pieceName + ".svg",
                    class: `Piece ${(selected || highlighted) ? "Piece_highlighted" : ""}`,
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
    let gameState = store.get(GameState.key)

    div({ class: "Game" })
        div({ style: "flex-grow: 1;" }); end()
            div({ style: "margin: 16px;" })
                div({ style: "padding-bottom: 8px;" })
                h1("Glass Chess")
                end()
                render(board)
                div({ style: "padding-top: 8px; display: flex" })
                    text("Turn: " + Color[game.turn])
                    div({ style: "flex-grow: 1" }); end()
                    text("Debug")
                    render(Checkbox, {
                        id: "debug",
                        value: gameState.debug,
                        onchange(this: HTMLInputElement) {
                            store.patch(GameState.key, { debug: this.checked })
                        }
                    })
                end()
            end()
        div({ style: "flex-grow: 1;" }); end()
    end()
})