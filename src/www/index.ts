import Context from "@glas/platform/ui/Context"
import Key from "@glas/platform/data/Key"
import { div, span, iframe, h1, button, img, style } from "@glas/platform/ui/html"
import Model from "@glas/platform/data/Model"
import State from "@glas/platform/data/State"
import invoke from "@glas/platform/server/invoke"
import WindowSize from "@glas/platform/ui/input/WindowSize"

import { Engine } from "../engine/Engine"
import Position from "../engine/Position"
import Piece from "../engine/Piece"
import { Type } from "../engine/Type"
import { Color } from "../engine/Color"
import Move from "../engine/Move"
import Game from "../model/Game"
import search from "../engine/search"
import Store from "@glas/platform/data/Store"

import piecesSvg from "./pieces"

const WHITE = "darkseagreen"
const BLACK = "seagreen"
const OUTLINE = "#256F46"

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

// TODO: Fix the search api. It broke after porting to the new glass.
var LOCAL_AI = true
function think(gameKey: Key) {
    let game = Store.default.get(gameKey) as Game
    let engine = game.engine
    if (engine.inMate())
        return
    Store.default.patch(AppState.key, { selectX: -1, selectY: -1, thinking: true })
    let finish = move => {
        if (typeof move == "number")
            game.doMove(move)
        Store.default.patch(AppState.key, { selectX: -1, selectY: -1, thinking: false })
    }
    if (LOCAL_AI)
        setTimeout(() => finish(search(engine)), 100);
    else
        invoke("/api/search", { position: engine.toString() }).then(move => finish(move))
}

type GUIPiece = { position: number, piece: number, id: number }
function getSortedPieces(engine: Engine) {
    let result: GUIPiece[] = []
    for (let p = 0; p < 64; p++) {
        let piece = engine.pieces[p]
        result.push({ position: p, piece, id: engine.ids[p] })
    }
    return result.sort((p, q) => p.id - q.id)
}

const board = Context.component(function board(c: Context, properties: { gameKey: Key }) {
    let store = Store.default
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

    div({
        class: "Board" + (rotate ? " Rotated" : ""),
        content: () => {
            // Squares
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
                                left: ${x * 100 / 8}%;
                                top: ${y * 100 / 8}%;
                                background: ${color}; `,
                        onclick() {
                            if (selected) {
                                store.patch(AppState.key, { selectX: -1, selectY: -1 })
                            } else if (highlighted && !appState.thinking) {
                                game.doMove(move)
                                store.patch(AppState.key, { selectX: -1, selectY: -1 })
                                // think(gameKey)
                            } else {
                                if (piece.color === engine.turn || appState.debug)
                                    store.patch(AppState.key, { selectX: x, selectY: y })
                            }
                        }
                    })
                }
            }

            // Pieces
            let pieces = getSortedPieces(engine)
            for (let guiPiece of pieces) {
                let piece = Piece.toObject(guiPiece.piece)
                let { x, y } = Position.toObject(guiPiece.position)
                let colorName = Color[piece.color]
                let typeName = Type[piece.type]
                let pieceName = colorName.toLowerCase() + typeName

                let highlighted = selection[guiPiece.position] !== undefined
                let selected = x == selectX && y == selectY
                div({
                    class: "Square",
                    style: `
                            left: ${x * 100 / 8}%;
                            top: ${y * 100 / 8}%;
                            opacity: ${piece.type == Type.Empty ? 0 : 1};
                            transition: all 0.25s ease-in-out;
                            z-index: ${piece.type == Type.Knight ? 3 : 2};
                            pointer-events: none`,
                    content: () => {
                        if (piece.type != Type.Empty) {
                            img({
                                src: piecesSvg[pieceName], //"/pieces/" + pieceName + ".svg",
                                class: `Piece ${(selected || highlighted) ? "Piece_highlighted" : ""} ${rotate ? " Rotated" : ""}`,
                                draggable: false
                            })
                        }
                    }
                })
            }
        }
    })
})

Context.bind(c => {
    let store = Store.default
    let appState = store.get(AppState.key)
    let windowSize = c.store.get(WindowSize.key)

    const gameKey = Key.create(Game, "0")

    let w = window as any
    if (!w.load) {
        w.load = (s) => {
            let engine = Engine.fromString(s)
            store.patch(gameKey, { history: engine.history, undos: [] })
            store.patch(AppState.key, { selectX: -1, selectY: -1 })
        }
    }

    let boardWidth = Math.min((windowSize.height - 124), windowSize.width)
    div({
        class: "Game",
        style: `
            display: grid;
            grid-template-columns: auto ${boardWidth}px auto;
            grid-template-rows: 80px ${boardWidth}px 40px;`,
        content() {
            style(`
                .Game {
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
                    grid-column: 2 / 2;
                    grid-row: 2 / 2;
                    background: white;
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
                    width: calc(100% / 8);
                    height: calc(100% / 8);
                    display: flex;
                }

                .Square_highlighted {
                    filter: saturate(125%) brightness(130%);
                    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25);
                    z-index: 1;
                    margin-left: 1.5px;
                    margin-top: 1.5px;
                    outline: ${OUTLINE} 3px solid;
                    width: calc(100% / 8 - 3px);
                    height: calc(100% / 8 - 3px);
                }

                .Piece {
                    flex-grow: 1;
                    transition: transform .7s ease-in-out;
                }

                .Piece_highlighted {
                    filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.5));
                }
            `)

            div({ style: "grid-column: 2 / 2", content: () => h1("Glass Chess") })

            let game = store.get(gameKey) as Game
            if (!game) {
                if (Game.store as string != "server" || game === null)
                    store.patch(gameKey, new Game({ key: gameKey }))
                div({ style: "padding: 4px; grid-column: 2 / 2; grid-row: 2 / 2", content: "Loading game..." })
            } else {

                let engine = game.engine
                let check = engine.inCheck()
                let mate = engine.inMate()

                board({ gameKey })

                div({
                    style: "display: flex; padding: 8px; height: 20pt; grid-column: 2 / 2; grid-row: 3 / 3",
                    content: () => {
                        if (!mate)
                            span(`Turn: ${Color[engine.turn]}${check ? ", Check" : ""}`)
                        else
                            span(check ? "Checkmate!" : "Stalemate!")
                        div({ style: "flex-grow: 1" })

                        button({
                            onclick: () => store.patch(AppState.key, { rotate: !appState.rotate }),
                            content: "Rotate"
                        })
                        button({
                            disabled: appState.thinking || (game.history.length < 1 && game.undos.length < 1),
                            onclick() {
                                if (confirm("Reset game?")) {
                                    store.patch(gameKey, { history: [], undos: [] })
                                    store.patch(AppState.key, { selectX: -1, selectY: -1 })
                                }
                            },
                            content: "Reset"
                        })
                        button({
                            disabled: appState.thinking || game.history.length < 1,
                            onclick() {
                                game.undoMove()
                                store.patch(AppState.key, { selectX: -1, selectY: -1 })
                            },
                            content: "Undo"
                        })
                        button({
                            disabled: appState.thinking || game.undos.length < 1,
                            onclick() {
                                game.redoMove()
                                store.patch(AppState.key, { selectX: -1, selectY: -1 })
                            },
                            content: "Redo"
                        })
                        button({
                            disabled: mate || appState.thinking,
                            onclick: () => think(gameKey),
                            content: appState.thinking ? "Thinking..." : "Think"
                        })
                    }
                })

                if (check && mate && engine.history.length <= 10) {
                    iframe({
                        style: "position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 4",
                        width: 560, height: 315, src: "https://www.youtube.com/embed/0xKBsYVCdDk?autoplay=1",
                        frameborder: "0", allow: "autoplay; picture-in-picture"
                    })
                }
            }

        }

    })


})