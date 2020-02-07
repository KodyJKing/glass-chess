/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/www/api/search.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/engine/Color.js":
/*!*****************************!*\
  !*** ./lib/engine/Color.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Color;
(function (Color) {
    Color[Color["White"] = 0] = "White";
    Color[Color["Black"] = 1] = "Black";
})(Color = exports.Color || (exports.Color = {}));


/***/ }),

/***/ "./lib/engine/Engine.js":
/*!******************************!*\
  !*** ./lib/engine/Engine.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Type_1 = __webpack_require__(/*! ./Type */ "./lib/engine/Type.js");
const Color_1 = __webpack_require__(/*! ./Color */ "./lib/engine/Color.js");
const Piece_1 = __importDefault(__webpack_require__(/*! ./Piece */ "./lib/engine/Piece.js"));
const Position_1 = __importDefault(__webpack_require__(/*! ./Position */ "./lib/engine/Position.js"));
const Move_1 = __importDefault(__webpack_require__(/*! ./Move */ "./lib/engine/Move.js"));
const common_1 = __webpack_require__(/*! ./common */ "./lib/engine/common.js");
const pieceValues_1 = __importDefault(__webpack_require__(/*! ./pieceValues */ "./lib/engine/pieceValues.js"));
const Pos = Position_1.default.create;
const posX = Position_1.default.get.x;
const posY = Position_1.default.get.y;
const EMPTY = Piece_1.default.create(0, 0, 0);
var Ternary;
(function (Ternary) {
    Ternary[Ternary["always"] = 0] = "always";
    Ternary[Ternary["never"] = 1] = "never";
    Ternary[Ternary["either"] = 2] = "either";
})(Ternary || (Ternary = {}));
class Engine {
    constructor() {
        try {
            window.engine = this;
        }
        catch (e) { }
        this.clear();
    }
    clear() {
        this.pieces = new Uint8Array(64);
        this.ids = new Uint8Array(64);
        for (let i = 0; i < 64; i++)
            this.ids[i] = i;
        this.turn = Color_1.Color.White;
        this.netMaterialValue = 0;
        this.history = [];
    }
    standardSetup() {
        for (let x = 0; x < 8; x++) {
            let type = Piece_1.default.get.type(common_1.charToPiece("rnbqkbnr"[x]));
            this.pieces[Pos(x, 0)] = Piece_1.default.create(type, Color_1.Color.Black, 0);
            this.pieces[Pos(x, 1)] = Piece_1.default.create(Type_1.Type.Pawn, Color_1.Color.Black, 0);
            this.pieces[Pos(x, 7)] = Piece_1.default.create(type, Color_1.Color.White, 0);
            this.pieces[Pos(x, 6)] = Piece_1.default.create(Type_1.Type.Pawn, Color_1.Color.White, 0);
        }
        return this;
    }
    static parseBoard(board) {
        let rows = board.split("\n")
            .filter((row) => row.length > 0) // Remove empty lines.
            .map((row) => row.replace(/ /g, "") // Remove whitespace.
            .split("") // Convert to char array.
            .map(common_1.charToPiece));
        let engine = new Engine();
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                engine.pieces[Pos(x, y)] = rows[y][x];
            }
        }
        return engine;
    }
    prettyString(moves) {
        let positions = moves ? moves.map((move) => Move_1.default.get.to(move)) : [];
        let result = [];
        for (let y = 0; y < 8; y++) {
            let row = [];
            for (let x = 0; x < 8; x++) {
                let char;
                if (positions.indexOf(Position_1.default.create(x, y)) > -1)
                    char = "#";
                else
                    char = common_1.pieceToChar(this.pieces[Pos(x, y)]);
                row.push(char + " ");
            }
            result.push(row.join(""));
        }
        return result.join("\n");
    }
    static compareBoards(a, b) {
        let format = (x) => (x.split("\n")
            .map((x) => x.trim())
            .filter((x) => x.length > 0)).join("\n");
        return format(a) === format(b);
    }
    positionString() {
        let parts = new Array(24);
        let i = 0;
        for (let y = 0; y < 8; y++)
            for (let x = 0; x < 8; x += 3)
                parts[i++] = String.fromCharCode((this.pieces[Pos(x, y)] << 10) |
                    (this.pieces[Pos(x + 1, y)] << 5) |
                    (this.pieces[Pos(x + 2, y)] || 0));
        return parts.join("");
    }
    toString() {
        let parts = new Array();
        for (let move of this.history)
            parts.push(String.fromCharCode(Move_1.default.set.firstMove(Move_1.default.set.captured(move, 0), 0)));
        return parts.join("");
    }
    static fromString(movesString) {
        let engine = new Engine();
        engine.standardSetup();
        for (let i = 0; i < movesString.length; i++)
            engine.doMove(movesString.charCodeAt(i));
        return engine;
    }
    static fromHistory(moves) {
        let engine = new Engine();
        engine.standardSetup();
        for (let move of moves)
            engine.doMove(move);
        return engine;
    }
    // Move Generation
    slide(from, dx, dy, max, color, selfCaptures, captures, moves) {
        let count = 0;
        let x = posX(from);
        let y = posY(from);
        for (let i = 1; i <= max; i++) {
            x += dx;
            y += dy;
            if (x < 0 || x >= 8 || y < 0 || y >= 8)
                break;
            let to = Pos(x, y);
            let obstacle = this.pieces[to];
            let move = Move_1.default.create(to, from, obstacle, 0);
            if (Piece_1.default.get.type(obstacle) !== Type_1.Type.Empty) {
                if (captures !== Ternary.never && Piece_1.default.get.color(obstacle) !== color) {
                    moves.push(move);
                    return ++count;
                }
                break;
            }
            else if (captures !== Ternary.always) {
                moves.push(move);
                ++count;
            }
        }
        return count;
    }
    slideCardinals(pos, max, color, selfCaptures, captures, moves) {
        this.slide(pos, 1, 0, max, color, selfCaptures, captures, moves);
        this.slide(pos, -1, 0, max, color, selfCaptures, captures, moves);
        this.slide(pos, 0, -1, max, color, selfCaptures, captures, moves);
        this.slide(pos, 0, 1, max, color, selfCaptures, captures, moves);
    }
    slideDiagonals(pos, max, color, selfCaptures, captures, moves) {
        this.slide(pos, 1, 1, max, color, selfCaptures, captures, moves);
        this.slide(pos, -1, 1, max, color, selfCaptures, captures, moves);
        this.slide(pos, 1, -1, max, color, selfCaptures, captures, moves);
        this.slide(pos, -1, -1, max, color, selfCaptures, captures, moves);
    }
    generateMoves(pos, type, color, moved, selfCaptures, captures) {
        let moves = [];
        switch (type) {
            case Type_1.Type.Pawn: {
                let dy = color == Color_1.Color.White ? -1 : 1;
                this.slide(pos, 0, dy, moved ? 1 : 2, color, selfCaptures, Ternary.never, moves);
                this.slide(pos, -1, dy, 1, color, selfCaptures, Ternary.always, moves);
                this.slide(pos, 1, dy, 1, color, selfCaptures, Ternary.always, moves);
                if ((Position_1.default.get.y(pos) == 6 && color == Color_1.Color.Black) ||
                    (Position_1.default.get.y(pos) == 1 && color == Color_1.Color.White)) {
                    for (let i = 0; i < moves.length; i++)
                        moves[i] = Move_1.default.set.promotion(moves[i], 1);
                }
                break;
            }
            case Type_1.Type.Knight: {
                // QI, +x, +y
                this.slide(pos, 2, 1, 1, color, selfCaptures, captures, moves);
                this.slide(pos, 1, 2, 1, color, selfCaptures, captures, moves);
                // QII, -x, +y
                this.slide(pos, -2, 1, 1, color, selfCaptures, captures, moves);
                this.slide(pos, -1, 2, 1, color, selfCaptures, captures, moves);
                // QIII, -x, -y
                this.slide(pos, -2, -1, 1, color, selfCaptures, captures, moves);
                this.slide(pos, -1, -2, 1, color, selfCaptures, captures, moves);
                // QIV, +x, -y
                this.slide(pos, 2, -1, 1, color, selfCaptures, captures, moves);
                this.slide(pos, 1, -2, 1, color, selfCaptures, captures, moves);
                break;
            }
            case Type_1.Type.Bishop: {
                this.slideDiagonals(pos, 7, color, selfCaptures, captures, moves);
                break;
            }
            case Type_1.Type.Rook: {
                this.slideCardinals(pos, 7, color, selfCaptures, captures, moves);
                break;
            }
            case Type_1.Type.Queen: {
                this.slideDiagonals(pos, 7, color, selfCaptures, captures, moves);
                this.slideCardinals(pos, 7, color, selfCaptures, captures, moves);
                break;
            }
            case Type_1.Type.King: {
                this.slideDiagonals(pos, 1, color, selfCaptures, captures, moves);
                this.slideCardinals(pos, 1, color, selfCaptures, captures, moves);
                if (!moved) {
                    if (this.canCastle(pos, color, -1))
                        moves.push(Move_1.default.create(Pos(2, posY(pos)), pos, 0, 1));
                    if (this.canCastle(pos, color, 1))
                        moves.push(Move_1.default.create(Pos(6, posY(pos)), pos, 0, 1));
                }
                break;
            }
        }
        return moves;
    }
    canCastle(pos, color, dx) {
        return this.rookVisible(pos, color, dx) && !this.passesThroughCheck(pos, color, dx);
    }
    rookVisible(pos, color, dx) {
        let x = posX(pos);
        let y = posY(pos);
        while (x >= 0 && x <= 7) {
            x += dx;
            let piece = this.pieces[Pos(x, y)];
            let type = Piece_1.default.get.type(piece);
            if (type != Type_1.Type.Empty)
                return type === Type_1.Type.Rook && !Piece_1.default.get.moved(piece) && Piece_1.default.get.color(piece) === color;
        }
        return false;
    }
    passesThroughCheck(pos, color, dx) {
        let x = posX(pos);
        let y = posY(pos);
        for (let i = 0; i < 2; i++)
            if (!this.isSafe(Pos(x + i * dx, y), color))
                return true;
        return false;
    }
    tryCastle(to, from, undo) {
        let dx = posX(to) - posX(from);
        if (Math.abs(dx) < 2)
            return;
        let y = posY(to);
        let rookFrom = Pos(dx > 0 ? 7 : 0, y);
        let rookTo = Pos(posX(to) - Math.sign(dx), y);
        if (undo) {
            let rook = this.pieces[rookTo];
            this.pieces[rookFrom] = Piece_1.default.set.moved(rook, 0);
            this.pieces[rookTo] = EMPTY;
            this.swapIds(rookFrom, rookTo);
        }
        else {
            let rook = this.pieces[rookFrom];
            this.pieces[rookFrom] = EMPTY;
            this.pieces[rookTo] = Piece_1.default.set.moved(rook, 1);
            this.swapIds(rookFrom, rookTo);
        }
    }
    setPiece(pos, piece) {
        let captured = this.pieces[pos];
        this.netMaterialValue -= pieceValues_1.default[Piece_1.default.get.type(captured)] * (Piece_1.default.get.color(captured) == Color_1.Color.White ? 1 : -1);
        this.netMaterialValue += pieceValues_1.default[Piece_1.default.get.type(piece)] * (Piece_1.default.get.color(piece) == Color_1.Color.White ? 1 : -1);
        this.pieces[pos] = piece;
    }
    swapIds(p, q) {
        let tmp = this.ids[p];
        this.ids[p] = this.ids[q];
        this.ids[q] = tmp;
    }
    doMove(move) {
        this.history.push(move);
        let from = Move_1.default.get.from(move);
        let to = Move_1.default.get.to(move);
        let piece = Piece_1.default.set.moved(this.pieces[from], 1);
        if (Move_1.default.get.promotion(move))
            piece = Piece_1.default.set.type(piece, Type_1.Type.Queen);
        this.setPiece(from, EMPTY);
        this.setPiece(to, piece);
        this.turn = (this.turn + 1) % 2;
        this.swapIds(to, from);
        if (Piece_1.default.get.type(piece) === Type_1.Type.King)
            this.tryCastle(to, from, false);
    }
    undoMove() {
        let move = this.history.pop();
        let from = Move_1.default.get.from(move);
        let to = Move_1.default.get.to(move);
        let piece = Piece_1.default.set.moved(this.pieces[to], Move_1.default.get.firstMove(move) ? 0 : 1);
        if (Move_1.default.get.promotion(move))
            piece = Piece_1.default.set.type(piece, Type_1.Type.Pawn);
        this.setPiece(from, piece);
        this.setPiece(to, Move_1.default.get.captured(move));
        this.turn = (this.turn + 1) % 2;
        this.swapIds(to, from);
        if (Piece_1.default.get.type(piece) === Type_1.Type.King)
            this.tryCastle(to, from, true);
    }
    generateMovesAt(pos, selfCaptures = false) {
        let piece = this.pieces[pos];
        let moves = this.generateMoves(pos, Piece_1.default.get.type(piece), Piece_1.default.get.color(piece), Piece_1.default.get.moved(piece), selfCaptures, Ternary.either);
        if (!Piece_1.default.get.moved(piece))
            for (let i = 0; i < moves.length; i++)
                moves[i] = Move_1.default.set.firstMove(moves[i], 1);
        return moves;
    }
    generateSafeMovesAt(pos) {
        let piece = this.pieces[pos];
        let color = Piece_1.default.get.color(piece);
        return this.filterByKingSafety(color, this.generateMovesAt(pos));
    }
    // This can be slow because it is only used by filterByKingSafetly.
    kingPos(turn) {
        for (let i = 0; i < 64; i++) {
            let p = this.pieces[i];
            if (Piece_1.default.get.type(p) === Type_1.Type.King && Piece_1.default.get.color(p) === turn)
                return i;
        }
        return null;
        // throw new Error(`Missing ${turn} king.`)
    }
    // This can be slow because it's not used in the search algorithm.
    // Because of the piece value of the king, this check would be redundant.
    filterByKingSafety(turn, moves) {
        let result = [];
        for (let move of moves) {
            this.doMove(move);
            let kingPos = this.kingPos(turn);
            if (kingPos == null || this.isSafe(kingPos, turn))
                result.push(move);
            this.undoMove();
        }
        return result;
    }
    // Capturing moves are direction reversible so it's OK to scan from the friendly piece to the enemy pieces.
    // If we do this for each type, we can be sure no pieces threaten our piece.
    // If we can 'capture' them, they can capture us.
    isSafe(pos, color) {
        for (let type = Type_1.Type.Pawn; type <= Type_1.Type.King; type++) {
            let moves = this.generateMoves(pos, type, color, 1, false, Ternary.always);
            for (let move of moves) {
                let piece = this.pieces[Move_1.default.get.to(move)];
                if (Piece_1.default.get.type(piece) === type)
                    return false;
            }
        }
        return true;
    }
    allMoves(safe = false) {
        let moves = [];
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                let pos = Pos(x, y);
                let piece = this.pieces[pos];
                if (Piece_1.default.get.color(piece) !== this.turn || Piece_1.default.get.type(piece) === Type_1.Type.Empty)
                    continue;
                let _moves = safe ? this.generateSafeMovesAt(pos) : this.generateMovesAt(pos);
                for (let move of _moves)
                    moves.push(move);
            }
        }
        return moves;
    }
    inCheck(turn = this.turn) {
        let pos = this.kingPos(turn);
        return (pos === null) ? false : !this.isSafe(pos, turn);
    }
    inMate() {
        return this.allMoves(true).length === 0;
    }
}
exports.Engine = Engine;


/***/ }),

/***/ "./lib/engine/Move.js":
/*!****************************!*\
  !*** ./lib/engine/Move.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bitfield_1 = __importDefault(__webpack_require__(/*! ./bitfield */ "./lib/engine/bitfield.js"));
exports.default = bitfield_1.default([
    ["to", 6],
    ["from", 6],
    ["captured", 5],
    ["firstMove", 1],
    ["promotion", 1]
]);


/***/ }),

/***/ "./lib/engine/Piece.js":
/*!*****************************!*\
  !*** ./lib/engine/Piece.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bitfield_1 = __importDefault(__webpack_require__(/*! ./bitfield */ "./lib/engine/bitfield.js"));
let s = bitfield_1.default([
    ["type", 3],
    ["color", 1],
    ["moved", 1]
]);
exports.default = s;


/***/ }),

/***/ "./lib/engine/Position.js":
/*!********************************!*\
  !*** ./lib/engine/Position.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bitfield_1 = __importDefault(__webpack_require__(/*! ./bitfield */ "./lib/engine/bitfield.js"));
let s = bitfield_1.default([
    ["x", 3],
    ["y", 3]
]);
exports.default = s;


/***/ }),

/***/ "./lib/engine/Type.js":
/*!****************************!*\
  !*** ./lib/engine/Type.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Type;
(function (Type) {
    Type[Type["Empty"] = 0] = "Empty";
    Type[Type["Pawn"] = 1] = "Pawn";
    Type[Type["Knight"] = 2] = "Knight";
    Type[Type["Bishop"] = 3] = "Bishop";
    Type[Type["Rook"] = 4] = "Rook";
    Type[Type["Queen"] = 5] = "Queen";
    Type[Type["King"] = 6] = "King";
})(Type = exports.Type || (exports.Type = {}));


/***/ }),

/***/ "./lib/engine/bitfield.js":
/*!********************************!*\
  !*** ./lib/engine/bitfield.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mask = (width) => (1 << width) - 1;
function propertiesWithShift(properties) {
    let shift = 0;
    let result = [];
    for (let [name, width] of properties) {
        result.push([name, width, shift]);
        shift += width;
    }
    return result;
}
function fromArguments(properties) {
    let names = properties.map((component) => component[0]);
    let parts = properties.map(([name, width, shift]) => `(${name} << ${shift})`);
    let result = new Function(...names, "return " + parts.join(" | "));
    return result;
}
function fromObject(properties) {
    let parts = properties.map(([name, width, shift]) => `(object.${name} << ${shift})`);
    let result = new Function("object", "return " + parts.join(" | "));
    return result;
}
function toObject(properties) {
    let parts = properties.map(([name, width, shift]) => `${name}: (struct >> ${shift}) & ${mask(width)}`);
    let result = new Function("struct", `return { ${parts.join(" , ")} }`);
    return result;
}
function struct(properties) {
    let bitCount = properties.map((component) => component[1]).reduce((x, y) => x + y);
    if (bitCount > 32)
        throw new Error("Components don't fit 32 bit number.");
    let _properties = propertiesWithShift(properties);
    let get = {};
    let set = {};
    for (let [name, width, shift] of _properties) {
        let getMask = mask(width);
        get[name] = (struct) => (struct >> shift) & getMask;
        let setMask = ~(getMask << shift); // Used to clear components bits.
        set[name] = (struct, value) => (struct & setMask) | ((value & getMask) << shift);
    }
    return { create: fromArguments(_properties), toObject: toObject(_properties), fromObject: fromObject(_properties), get, set };
}
exports.default = struct;


/***/ }),

/***/ "./lib/engine/common.js":
/*!******************************!*\
  !*** ./lib/engine/common.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __webpack_require__(/*! ./Color */ "./lib/engine/Color.js");
const Piece_1 = __importDefault(__webpack_require__(/*! ./Piece */ "./lib/engine/Piece.js"));
const pieceToCharStr = ".pnbrqk";
function pieceToChar(piece) {
    let char = pieceToCharStr[Piece_1.default.get.type(piece)];
    return Piece_1.default.get.color(piece) === Color_1.Color.Black ? char : char.toUpperCase();
}
exports.pieceToChar = pieceToChar;
function charToPiece(char) {
    let type = pieceToCharStr.indexOf(char.toLowerCase());
    let color = (char === char.toLowerCase()) ? Color_1.Color.Black : Color_1.Color.White;
    return Piece_1.default.create(type, color, 0);
}
exports.charToPiece = charToPiece;
exports.default = { pieceToChar, charToPiece };


/***/ }),

/***/ "./lib/engine/pieceValues.js":
/*!***********************************!*\
  !*** ./lib/engine/pieceValues.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    0,
    1,
    3,
    3,
    5,
    9,
    99999 // King
];


/***/ }),

/***/ "./lib/engine/search.js":
/*!******************************!*\
  !*** ./lib/engine/search.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Position_1 = __importDefault(__webpack_require__(/*! ./Position */ "./lib/engine/Position.js"));
const Piece_1 = __importDefault(__webpack_require__(/*! ./Piece */ "./lib/engine/Piece.js"));
const Move_1 = __importDefault(__webpack_require__(/*! ./Move */ "./lib/engine/Move.js"));
const pieceValues_1 = __importDefault(__webpack_require__(/*! ./pieceValues */ "./lib/engine/pieceValues.js"));
const Type_1 = __webpack_require__(/*! ./Type */ "./lib/engine/Type.js");
const Color_1 = __webpack_require__(/*! ./Color */ "./lib/engine/Color.js");
const Pos = Position_1.default.create;
const MAX_VALUE = Number.MAX_SAFE_INTEGER; // Infinity
function default_1(engine, options = {}) {
    options = Object.assign({ depth: 40, rootCall: true, maxSeconds: 5 }, options);
    let startTime = Date.now();
    let endTime = startTime + options.maxSeconds * 1000;
    let evaluations = 0;
    let cache = options.cache || new Map();
    const heuristic = (useFast) => {
        evaluations++;
        const config = {
            material: 10,
            control: 5,
            threat: 1,
            threateningPieces: 1,
            development: 5,
            support: 5
        };
        if (engine.inCheck() && engine.inMate())
            return engine.turn == Color_1.Color.White ? -MAX_VALUE : MAX_VALUE;
        if (useFast)
            return engine.netMaterialValue * config.material;
        if (engine.inMate())
            return 0;
        let control = 0;
        let threat = 0;
        let threateningPieces = 0;
        let development = 0;
        let support = 0;
        const edgeDistance = (pos) => {
            let xDist = 3.5 - Math.abs(Position_1.default.get.x(pos) - 3.5);
            let yDist = 3.5 - Math.abs(Position_1.default.get.y(pos) - 3.5);
            return xDist + yDist;
        };
        for (let pos = 0; pos < 64; pos++) {
            let piece = engine.pieces[pos];
            let type = Piece_1.default.get.type(piece);
            if (type === Type_1.Type.Empty)
                continue;
            let invPieceValue = 1 / pieceValues_1.default[type];
            let color = Piece_1.default.get.color(piece);
            let valueSign = color === Color_1.Color.White ? 1 : -1;
            development += edgeDistance(pos) * invPieceValue * valueSign;
            if (type === Type_1.Type.Pawn) {
                let pawnDevelopment = (color == Color_1.Color.White) ? 7 - Position_1.default.get.y(pos) : Position_1.default.get.y(pos);
                development += Math.max(8, 1.5 ** pawnDevelopment) * valueSign;
            }
            let threatening = false;
            for (let move of engine.generateMovesAt(pos, true)) {
                let capturedType = Piece_1.default.get.type(Move_1.default.get.captured(move));
                let capturedColor = Piece_1.default.get.color(Move_1.default.get.captured(move));
                let captured = capturedType !== Type_1.Type.Empty;
                if (captured && capturedColor == color) {
                    support += valueSign * invPieceValue / pieceValues_1.default[capturedType];
                }
                else {
                    let to = Move_1.default.get.to(move);
                    control += (1 + edgeDistance(to) * invPieceValue) * valueSign;
                    if (captured) {
                        threatening = true;
                        let value = capturedType == Type_1.Type.King ? 10 : pieceValues_1.default[capturedType] * invPieceValue;
                        threat += valueSign * value;
                    }
                }
            }
            if (threatening)
                threateningPieces += valueSign;
        }
        return engine.netMaterialValue * config.material
            + control * config.control
            + threat * config.threat
            + threateningPieces * config.threateningPieces
            + development * config.development
            + support * config.support;
    };
    const search = (depth = 0, rootCall = true, alpha = options.alpha || -MAX_VALUE, beta = options.beta || MAX_VALUE) => {
        let turn = engine.turn;
        let valueSign = (engine.turn === Color_1.Color.White) ? 1 : -1;
        let positionString = engine.positionString() + depth + "," + turn;
        if (!rootCall && cache.has(positionString))
            return cache.get(positionString);
        let pairs = engine.allMoves(true).map((move) => {
            engine.doMove(move);
            let h = heuristic(depth < 3);
            engine.undoMove();
            return [move, h];
        });
        pairs.sort((a, b) => ((b[1] - a[1]) * valueSign));
        let best = null;
        let bestValue = -MAX_VALUE * valueSign;
        let cutoff = false;
        for (let [move, h] of pairs) {
            if (Date.now() > endTime)
                break;
            let value = 0;
            engine.doMove(move);
            value = depth == 1 ? h : search(depth - 1, false, alpha, beta);
            // The advanced heuristic is too slow to use on leaves so instead it's evaluated on the parent.
            if (depth == 3)
                value += heuristic(false);
            if (best === null || value * valueSign > bestValue * valueSign) {
                best = move;
                bestValue = value;
                if (turn === Color_1.Color.White)
                    alpha = Math.max(alpha, bestValue);
                else
                    beta = Math.min(beta, bestValue);
                cutoff = (alpha >= beta);
            }
            engine.undoMove();
            if (cutoff)
                break;
        }
        cache.set(positionString, bestValue);
        return rootCall ? [best, bestValue] : bestValue;
    };
    let result, resultValue, depthReached;
    for (let d = 3; d <= options.depth; d++) {
        let _ = search(d);
        if (Date.now() > endTime)
            break;
        [result, resultValue] = _;
        depthReached = d;
    }
    if (options.rootCall) {
        let dt = (Date.now() - startTime);
        let addCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        let evalsPerMs = (evaluations / dt).toString().split(".")[0];
        console.log(`${addCommas(evaluations)} evals | ${addCommas(dt)} ms | ${addCommas(evalsPerMs)} evals/ms | depth ${depthReached} reached`);
    }
    return options.rootCall ? result : resultValue;
}
exports.default = default_1;


/***/ }),

/***/ "./lib/www/api/search.js":
/*!*******************************!*\
  !*** ./lib/www/api/search.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const search_1 = __importDefault(__webpack_require__(/*! ../../engine/search */ "./lib/engine/search.js"));
const Engine_1 = __webpack_require__(/*! ../../engine/Engine */ "./lib/engine/Engine.js");
async function default_1(req, res) {
    let { position } = req.body;
    let engine = Engine_1.Engine.fromString(position);
    let move = search_1.default(engine, { depth: 6 });
    // let move = await parallelSearch(position)
    res.type("text/json").send(JSON.stringify(move));
}
exports.default = default_1;


/***/ })

/******/ });
//# sourceMappingURL=search.pack.js.map