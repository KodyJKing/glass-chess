import Context from "glass/html/Context"
import Stylesheets from "glass/html/Stylesheets"
import Page from "glass/html/Page"
import Key, { ModelKey } from "glass/data/Key"
import Model from "glass/data/Model"
import SignupForm from "glass/html/components/SignupForm"
import State from "glass/data/State"

import { Game } from "../engine/Game";
import Position from "../engine/Position";
import pieces from "./pieces";
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
    }

    .Board {
        position: relative;
        width: ${WIDTH}px;
        height: ${WIDTH}px;
        background: ${t.colors.background.light};
        user-select: none;
        overflow: hidden;
        border-radius: 8px;
        box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.8);
    }

    .Square {
        position: absolute;
        width: ${SQUARE_WIDTH};
        height: ${SQUARE_WIDTH};
        display: flex;
    }

    .Square_highlighted {
        filter: saturate(125%) brightness(110%);
        box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
        z-index: 1;
    }
`)

@Model.class()
class GameState extends State {

    @Model.property({ type: "number", default: -1 })
    selectX!: number

    @Model.property({ type: "number", default: -1 })
    selectY!: number

    static readonly store = "memory"
    static key = Key.create(GameState, "0")
}

const game = new Game().standardSetup()

const WHITE = "darkseagreen"
const BLACK = "seagreen"
function board(c: Context) {
    let { state, end, html: { div, img } } = c
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
                let color = (x + y) % 2 == 0 ? WHITE : BLACK

                div({
                    class: `Square ${highlighted ? "Square_highlighted" : ""}`,
                    style: `
                        left: ${x * SQUARE_WIDTH};
                        top: ${y * SQUARE_WIDTH};
                        background: ${color}; `,
                    onclick() {
                        if (x == selectX && y == selectY) {
                            state.patch(GameState.key, {selectX: -1, selectY: -1})
                        } else if (highlighted) {
                            game.doMove(move)
                            state.patch(GameState.key, {selectX: -1, selectY: -1})
                        } else {
                            if (piece.color === game.turn)
                                state.patch(GameState.key, {selectX: x, selectY: y})
                        }
                    }
                })
                    if (piece.type != Type.Empty) {
                        let colorName = Color[piece.color]
                        let typeName = Type[piece.type]
                        let pieceName = colorName.toLowerCase() + typeName
                        img({ src: pieces[pieceName], style: "flex-grow: 1;", draggable: "false" })
                        end()
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
                render(board)
                div({ style: "padding-top: 8px" })
                    text("Turn: " + Color[game.turn])
                end()
            end()
            div({style: "flex-grow: 1;"}); end()
        end()
    }

}

GamePage.show()