"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var AppState_1;
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = __importDefault(require("@glas/platform/ui/Context"));
const Key_1 = __importDefault(require("@glas/platform/data/Key"));
const html_1 = require("@glas/platform/ui/html");
const Model_1 = __importDefault(require("@glas/platform/data/Model"));
const State_1 = __importDefault(require("@glas/platform/data/State"));
const invoke_1 = __importDefault(require("@glas/platform/server/invoke"));
const WindowSize_1 = __importDefault(require("@glas/platform/ui/input/WindowSize"));
const Engine_1 = require("../engine/Engine");
const Position_1 = __importDefault(require("../engine/Position"));
const Piece_1 = __importDefault(require("../engine/Piece"));
const Type_1 = require("../engine/Type");
const Color_1 = require("../engine/Color");
const Move_1 = __importDefault(require("../engine/Move"));
const Game_1 = __importDefault(require("../model/Game"));
const search_1 = __importDefault(require("../engine/search"));
const Store_1 = __importDefault(require("@glas/platform/data/Store"));
const pieces_1 = __importDefault(require("./pieces"));
const WHITE = "darkseagreen";
const BLACK = "seagreen";
const OUTLINE = "#256F46";
let AppState = AppState_1 = class AppState extends State_1.default {
};
AppState.store = "memory";
AppState.key = Key_1.default.create(AppState_1, "0");
__decorate([
    Model_1.default.property({ type: "number", default: -1 })
], AppState.prototype, "selectX", void 0);
__decorate([
    Model_1.default.property({ type: "number", default: -1 })
], AppState.prototype, "selectY", void 0);
__decorate([
    Model_1.default.property({ type: "number", default: -1 })
], AppState.prototype, "hoverX", void 0);
__decorate([
    Model_1.default.property({ type: "number", default: -1 })
], AppState.prototype, "hoverY", void 0);
__decorate([
    Model_1.default.property({ type: "boolean", default: false })
], AppState.prototype, "rotate", void 0);
__decorate([
    Model_1.default.property({ type: "boolean", default: false })
], AppState.prototype, "debug", void 0);
__decorate([
    Model_1.default.property({ type: "boolean", default: false })
], AppState.prototype, "thinking", void 0);
AppState = AppState_1 = __decorate([
    Model_1.default.class()
], AppState);
// TODO: Fix the search api. It broke after porting to the new glass.
var LOCAL_AI = true;
function think(gameKey) {
    let game = Store_1.default.default.get(gameKey);
    let engine = game.engine;
    if (engine.inMate())
        return;
    Store_1.default.default.patch(AppState.key, { selectX: -1, selectY: -1, thinking: true });
    let finish = move => {
        if (typeof move == "number")
            game.doMove(move);
        Store_1.default.default.patch(AppState.key, { selectX: -1, selectY: -1, thinking: false });
    };
    if (LOCAL_AI)
        setTimeout(() => finish(search_1.default(engine)), 100);
    else
        invoke_1.default("/api/search", { position: engine.toString() }).then(move => finish(move));
}
function getSortedPieces(engine) {
    let result = [];
    for (let p = 0; p < 64; p++) {
        let piece = engine.pieces[p];
        result.push({ position: p, piece, id: engine.ids[p] });
    }
    return result.sort((p, q) => p.id - q.id);
}
const board = Context_1.default.component(function board(c, properties) {
    let store = Store_1.default.default;
    let appState = store.get(AppState.key);
    let { selectX, selectY } = appState;
    let { gameKey } = properties;
    let game = store.get(gameKey);
    let engine = game.engine;
    let selectPos = Position_1.default.create(selectX, selectY);
    let moves = engine.generateSafeMovesAt(selectPos);
    let selection = {};
    for (let move of moves)
        selection[Move_1.default.get.to(move)] = move;
    let rotate = appState.rotate;
    html_1.div({
        class: "Board" + (rotate ? " Rotated" : ""),
        content: () => {
            // Squares
            for (let x = 0; x < 8; x++) {
                for (let y = 0; y < 8; y++) {
                    let pos = Position_1.default.create(x, y);
                    let piece = Piece_1.default.toObject(engine.pieces[pos]);
                    let move = selection[pos];
                    let highlighted = move !== undefined;
                    let selected = x == selectX && y == selectY;
                    let color = (x + y) % 2 == 0 ? WHITE : BLACK;
                    html_1.div({
                        class: `Square ${highlighted ? "Square_highlighted" : ""}`,
                        style: `
                                left: ${x * 100 / 8}%;
                                top: ${y * 100 / 8}%;
                                background: ${color}; `,
                        onclick() {
                            if (selected) {
                                store.patch(AppState.key, { selectX: -1, selectY: -1 });
                            }
                            else if (highlighted && !appState.thinking) {
                                game.doMove(move);
                                store.patch(AppState.key, { selectX: -1, selectY: -1 });
                                // think(gameKey)
                            }
                            else {
                                if (piece.color === engine.turn || appState.debug)
                                    store.patch(AppState.key, { selectX: x, selectY: y });
                            }
                        }
                    });
                }
            }
            // Pieces
            let pieces = getSortedPieces(engine);
            for (let guiPiece of pieces) {
                let piece = Piece_1.default.toObject(guiPiece.piece);
                let { x, y } = Position_1.default.toObject(guiPiece.position);
                let colorName = Color_1.Color[piece.color];
                let typeName = Type_1.Type[piece.type];
                let pieceName = colorName.toLowerCase() + typeName;
                let highlighted = selection[guiPiece.position] !== undefined;
                let selected = x == selectX && y == selectY;
                html_1.div({
                    class: "Square",
                    style: `
                            left: ${x * 100 / 8}%;
                            top: ${y * 100 / 8}%;
                            opacity: ${piece.type == Type_1.Type.Empty ? 0 : 1};
                            transition: all 0.25s ease-in-out;
                            z-index: ${piece.type == Type_1.Type.Knight ? 3 : 2};
                            pointer-events: none`,
                    content: () => {
                        if (piece.type != Type_1.Type.Empty) {
                            html_1.img({
                                src: pieces_1.default[pieceName],
                                class: `Piece ${(selected || highlighted) ? "Piece_highlighted" : ""} ${rotate ? " Rotated" : ""}`,
                                draggable: false
                            });
                        }
                    }
                });
            }
        }
    });
});
Context_1.default.bind(c => {
    let store = Store_1.default.default;
    let appState = store.get(AppState.key);
    let windowSize = c.store.get(WindowSize_1.default.key);
    const gameKey = Key_1.default.create(Game_1.default, "0");
    let w = window;
    if (!w.load) {
        w.load = (s) => {
            let engine = Engine_1.Engine.fromString(s);
            store.patch(gameKey, { history: engine.history, undos: [] });
            store.patch(AppState.key, { selectX: -1, selectY: -1 });
        };
    }
    let boardWidth = Math.min((windowSize.height - 124), windowSize.width);
    html_1.div({
        class: "Game",
        style: `
            display: grid;
            grid-template-columns: auto ${boardWidth}px auto;
            grid-template-rows: 80px ${boardWidth}px 40px;`,
        content() {
            html_1.style(`
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
            `);
            html_1.div({ style: "grid-column: 2 / 2", content: () => html_1.h1("Glass Chess") });
            let game = store.get(gameKey);
            if (!game) {
                if (Game_1.default.store != "server" || game === null)
                    store.patch(gameKey, new Game_1.default({ key: gameKey }));
                html_1.div({ style: "padding: 4px; grid-column: 2 / 2; grid-row: 2 / 2", content: "Loading game..." });
            }
            else {
                let engine = game.engine;
                let check = engine.inCheck();
                let mate = engine.inMate();
                board({ gameKey });
                html_1.div({
                    style: "display: flex; padding: 8px; height: 20pt; grid-column: 2 / 2; grid-row: 3 / 3",
                    content: () => {
                        if (!mate)
                            html_1.span(`Turn: ${Color_1.Color[engine.turn]}${check ? ", Check" : ""}`);
                        else
                            html_1.span(check ? "Checkmate!" : "Stalemate!");
                        html_1.div({ style: "flex-grow: 1" });
                        html_1.button({
                            onclick: () => store.patch(AppState.key, { rotate: !appState.rotate }),
                            content: "Rotate"
                        });
                        html_1.button({
                            disabled: appState.thinking || (game.history.length < 1 && game.undos.length < 1),
                            onclick() {
                                if (confirm("Reset game?")) {
                                    store.patch(gameKey, { history: [], undos: [] });
                                    store.patch(AppState.key, { selectX: -1, selectY: -1 });
                                }
                            },
                            content: "Reset"
                        });
                        html_1.button({
                            disabled: appState.thinking || game.history.length < 1,
                            onclick() {
                                game.undoMove();
                                store.patch(AppState.key, { selectX: -1, selectY: -1 });
                            },
                            content: "Undo"
                        });
                        html_1.button({
                            disabled: appState.thinking || game.undos.length < 1,
                            onclick() {
                                game.redoMove();
                                store.patch(AppState.key, { selectX: -1, selectY: -1 });
                            },
                            content: "Redo"
                        });
                        html_1.button({
                            disabled: mate || appState.thinking,
                            onclick: () => think(gameKey),
                            content: appState.thinking ? "Thinking..." : "Think"
                        });
                    }
                });
                if (check && mate && engine.history.length <= 10) {
                    html_1.iframe({
                        style: "position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 4",
                        width: 560, height: 315, src: "https://www.youtube.com/embed/0xKBsYVCdDk?autoplay=1",
                        frameborder: "0", allow: "autoplay; picture-in-picture"
                    });
                }
            }
        }
    });
});
