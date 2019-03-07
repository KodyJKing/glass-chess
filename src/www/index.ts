import Stylesheets from "@krisnye/glass-platform/ui/html/Stylesheets"
import HtmlContext from "@krisnye/glass-platform/ui/html/HtmlContext"
import Context from "@krisnye/glass-platform/ui/Context"
import Key, { ModelKey } from "@krisnye/glass-platform/data/Key"
import Model from "@krisnye/glass-platform/data/Model"
import State from "@krisnye/glass-platform/data/State"
import invoke from "@krisnye/glass-platform/server/invoke"

import { Engine } from "../engine/Engine"
import Position from "../engine/Position"
import Piece from "../engine/Piece"
import { Type } from "../engine/Type"
import { Color } from "../engine/Color"
import Move from "../engine/Move"
import Game from "../model/Game";
import search from "../engine/search";
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
        filter: saturate(125%) brightness(130%);
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
    rotate!: boolean

    @Model.property({ type: "boolean", default: false })
    debug!: boolean

    @Model.property({ type: "boolean", default: false })
    thinking!: boolean

    static readonly store = "memory"
    static key = Key.create(AppState, "0")
}

// var LOCAL_AI = false
var LOCAL_AI = true
function think(store: Store, gameKey: Key) {
    let game = store.get(gameKey) as Game
    let engine = game.engine
    if (engine.inMate())
        return
    store.patch(AppState.key, { selectX: -1, selectY: -1, thinking: true })
    let finish = move => {
        if (typeof move == "number")
            game.doMove(store, move)
        store.patch(AppState.key, { selectX: -1, selectY: -1, thinking: false })
    }
    if (LOCAL_AI)
        setTimeout(() => finish(search(engine)), 100);
    else
        invoke("/api/search", { position: engine.toString() }).then(move => finish(move))
}

type GUIPiece = {position: number, piece: number, id: number}
function getSortedPieces(engine: Engine) {
    let result: GUIPiece[] = []
    for (let p = 0; p < 64; p++) {
        let piece = engine.pieces[p]
        result.push({ position: p, piece, id: engine.ids[p] })
    }
    return result.sort((p, q) => p.id - q.id)
}

function board(c: Context, properties: { gameKey: Key }) {
    let { store } = c
    let { end, div, img } = HtmlContext(c)
    let appState = store.get(AppState.key)
    let { selectX, selectY } = appState

    let { gameKey } = properties
    let game = store.get(gameKey) as Game
    let engine = game.engine

    let selectPos = Position.create(selectX, selectY)
    let moves = engine.generateSafeMovesAt(selectPos)
    let selection = {}
    for (let move of moves)
        selection[Move.get.to(move)] = move

    let rotate = appState.rotate

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
                    } else if (highlighted && !appState.thinking) {
                        game.doMove(store, move)
                        store.patch(AppState.key, { selectX: -1, selectY: -1 })
                        think(store, gameKey)
                    } else {
                        if (piece.color === engine.turn || appState.debug)
                            store.patch(AppState.key, { selectX: x, selectY: y })
                    }
                }
            })
            end()
        }
    }

    let pieces = getSortedPieces(engine)
    for (let guiPiece of pieces) {
        let piece = Piece.toObject(guiPiece.piece)
        let {x, y} = Position.toObject(guiPiece.position)
        let colorName = Color[piece.color]
        let typeName = Type[piece.type]
        let pieceName = colorName.toLowerCase() + typeName
        div({
            class: "Square",
            style: `
                    transform: translate(${x * SQUARE_WIDTH}px, ${y * SQUARE_WIDTH}px);
                    transition: transform .2s ease-in-out;
                    z-index: ${piece.type == Type.Knight ? 3 : 2};
                    pointer-events: none`
        })
            if (piece.type != Type.Empty) {
                img({
                    src: "/pieces/" + pieceName + ".svg",
                    class: `Piece ${rotate ? " Rotated" : ""}`,
                    draggable: false
                })
                end()
            }
        end()
    }

    end()
}

Context.bind(c => {
    let { store, localize, text } = c
    let { render, end, div, span, iframe, h1, button } = HtmlContext(c)
    let appState = store.get(AppState.key)

    const gameKey = Key.create(Game, "0")

    div({ class: "Game" })

        let game = store.get(gameKey) as Game
        if (!game) {
            if (Game.store as string != "server" || game === null)
                store.patch(gameKey, new Game({ key: gameKey }))
            div({ style: "padding: 4px" }, "Loading game...")
        } else {

            let engine = game.engine
            let check = engine.inCheck()
            let mate = engine.inMate()

            div({ style: "flex-grow: 1;" }); end()
            div({ style: "margin: 16px;" })
                div({ style: "padding-bottom: 8px;" })
                    h1("Glass Chess")
                end()

                render(board, { gameKey })
                div({ style: "padding-top: 8px; display: flex" })

                    if (!mate)
                        text(`Turn: ${Color[engine.turn]}${ check ? ", Check" : ""}`)
                    else
                        text(check ? "Checkmate!" : "Stalemate!")
                    div({ style: "flex-grow: 1" }); end()

                    button({
                        onclick: () => store.patch(AppState.key, { rotate: !appState.rotate })
                    }, "Rotate")
                    button({
                        disabled: appState.thinking,
                        onclick() {
                            if (confirm("Reset game?")) {
                                store.patch(gameKey, { history: [] })
                                store.patch(AppState.key, { selectX: -1, selectY: -1 })
                            }
                        }
                    }, "Reset")
                    button({
                        disabled: appState.thinking,
                        onclick() {
                            if (engine.history.length > 0)
                                game.undoMove(store)
                            store.patch(AppState.key, { selectX: -1, selectY: -1 })
                        }
                    }, "Undo")
                    button({
                        disabled: mate || appState.thinking,
                        onclick: () => think(c.store, gameKey)
                    }, appState.thinking ? "Thinking..." : "Think")

                end()
            end()
            div({ style: "flex-grow: 1;" }); end()
            if (check && mate && engine.history.length <= 10) {
                iframe({
                    style: "position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); pointer-events: none",
                    width: 560, height: 315, src: "https://www.youtube.com/embed/0xKBsYVCdDk?controls=0&autoplay=1&showinfo=0",
                    frameborder: "0",  allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                })
                end()
            }
        }

    end()
})