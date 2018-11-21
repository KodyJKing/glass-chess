import SignupForm from "glass-platform/html/components/SignupForm"
import Checkbox from "glass-platform/html/components/Checkbox"
import Stylesheets from "glass-platform/html/Stylesheets"
import Context from "glass-platform/html/Context"
import Page from "glass-platform/html/Page"
import Key, { ModelKey } from "glass-platform/data/Key"
import Model from "glass-platform/data/Model"
import State from "glass-platform/data/State"

import { Game } from "../engine/Game";
import Position from "../engine/Position";
// import pieces from "./pieces";
import Piece from "../engine/Piece";
import { Type } from "../engine/Type";
import { Color } from "../engine/Color";
import Move from "../engine/Move";

const WIDTH = 800
const SQUARE_WIDTH = WIDTH / 8

Stylesheets.add(t => `
    .Game {
        display: flex;
        width: 100vw;
        position: absolute;
        top: 0px;
        left: 0px;
        user-select: none;
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

const WHITE = "darkseagreen"
const BLACK = "seagreen"
function board(c: Context) {
    let { state, end, text, html: { div, img } } = c
    let gameState = state.get(GameState.key)
    let {selectX, selectY} = gameState

    let selectPos = Position.create(selectX, selectY)
    let moves = game.generateSafeMovesAt(selectPos)
    let selection = {}
    for (let move of moves)
        selection[Move.get.to(move)] = move

    div({ class: "Board" })
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                let pos = Position.create(x, y)
                let piece = Piece.toObject(game.pieces[pos])
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
                            state.patch(GameState.key, {selectX: -1, selectY: -1})
                        } else if (highlighted) {
                            game.doMove(move)
                            state.patch(GameState.key, {selectX: -1, selectY: -1})
                        } else {
                            if (piece.color === game.turn || gameState.debug)
                                state.patch(GameState.key, {selectX: x, selectY: y})
                        }
                    }
                })
                    if (piece.type != Type.Empty) {
                        let colorName = Color[piece.color]
                        let typeName = Type[piece.type]
                        let pieceName = colorName.toLowerCase() + typeName
                        text(pieceName)
                        // img({
                        //     src: pieces[pieceName],
                        //     class: `Piece ${ (selected || highlighted) ? "Piece_highlighted" : "" }`,
                        //     draggable: false
                        // })
                        // end()
                    }
                end()

            }
        }
    end()
}

class GamePage extends Page {
    render(c: Context) {
        // c.render(SignupForm, "/api/signup")

        let { state, render, localize, text, begin, end, empty, html: { div, img, form, label, span, input, h1 } } = c
        let gameState = state.get(GameState.key)

        div({ class: "Game" })
            div({style: "flex-grow: 1;"}); end()
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
                        onchange(this: HTMLInputElement){
                            state.patch(GameState.key, { debug: this.checked })
                        }
                    })
                end()
            end()
            div({style: "flex-grow: 1;"}); end()
        end()
    }

}

GamePage.show()