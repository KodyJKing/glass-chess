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
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/www/pieces/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/www/pieces/blackBishop.svg":
/*!****************************************!*\
  !*** ./lib/www/pieces/blackBishop.svg ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "df256cb41e62c8d8190ba1efbb0441b8.svg";

/***/ }),

/***/ "./lib/www/pieces/blackKing.svg":
/*!**************************************!*\
  !*** ./lib/www/pieces/blackKing.svg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a98c8b076fced614be051a0894b30a3a.svg";

/***/ }),

/***/ "./lib/www/pieces/blackKnight.svg":
/*!****************************************!*\
  !*** ./lib/www/pieces/blackKnight.svg ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c66000332c1e4320badc73c4960f5278.svg";

/***/ }),

/***/ "./lib/www/pieces/blackPawn.svg":
/*!**************************************!*\
  !*** ./lib/www/pieces/blackPawn.svg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1b9cc35c3399f765cd9e22153e40cf1e.svg";

/***/ }),

/***/ "./lib/www/pieces/blackQueen.svg":
/*!***************************************!*\
  !*** ./lib/www/pieces/blackQueen.svg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "5ee93cfca3a889f3426afca8d910d5e8.svg";

/***/ }),

/***/ "./lib/www/pieces/blackRook.svg":
/*!**************************************!*\
  !*** ./lib/www/pieces/blackRook.svg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f4c02b9b7b14ee9d5484bd1a420df1b9.svg";

/***/ }),

/***/ "./lib/www/pieces/index.js":
/*!*********************************!*\
  !*** ./lib/www/pieces/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blackBishop_svg_1 = __importDefault(__webpack_require__(/*! ./blackBishop.svg */ "./lib/www/pieces/blackBishop.svg"));
const blackKing_svg_1 = __importDefault(__webpack_require__(/*! ./blackKing.svg */ "./lib/www/pieces/blackKing.svg"));
const blackKnight_svg_1 = __importDefault(__webpack_require__(/*! ./blackKnight.svg */ "./lib/www/pieces/blackKnight.svg"));
const blackPawn_svg_1 = __importDefault(__webpack_require__(/*! ./blackPawn.svg */ "./lib/www/pieces/blackPawn.svg"));
const blackQueen_svg_1 = __importDefault(__webpack_require__(/*! ./blackQueen.svg */ "./lib/www/pieces/blackQueen.svg"));
const blackRook_svg_1 = __importDefault(__webpack_require__(/*! ./blackRook.svg */ "./lib/www/pieces/blackRook.svg"));
const whiteBishop_svg_1 = __importDefault(__webpack_require__(/*! ./whiteBishop.svg */ "./lib/www/pieces/whiteBishop.svg"));
const whiteKing_svg_1 = __importDefault(__webpack_require__(/*! ./whiteKing.svg */ "./lib/www/pieces/whiteKing.svg"));
const whiteKnight_svg_1 = __importDefault(__webpack_require__(/*! ./whiteKnight.svg */ "./lib/www/pieces/whiteKnight.svg"));
const whitePawn_svg_1 = __importDefault(__webpack_require__(/*! ./whitePawn.svg */ "./lib/www/pieces/whitePawn.svg"));
const whiteQueen_svg_1 = __importDefault(__webpack_require__(/*! ./whiteQueen.svg */ "./lib/www/pieces/whiteQueen.svg"));
const whiteRook_svg_1 = __importDefault(__webpack_require__(/*! ./whiteRook.svg */ "./lib/www/pieces/whiteRook.svg"));
exports.default = {
    blackBishop: blackBishop_svg_1.default,
    blackKing: blackKing_svg_1.default,
    blackKnight: blackKnight_svg_1.default,
    blackPawn: blackPawn_svg_1.default,
    blackQueen: blackQueen_svg_1.default,
    blackRook: blackRook_svg_1.default,
    whiteBishop: whiteBishop_svg_1.default,
    whiteKing: whiteKing_svg_1.default,
    whiteKnight: whiteKnight_svg_1.default,
    whitePawn: whitePawn_svg_1.default,
    whiteRook: whiteRook_svg_1.default,
    whiteQueen: whiteQueen_svg_1.default
};


/***/ }),

/***/ "./lib/www/pieces/whiteBishop.svg":
/*!****************************************!*\
  !*** ./lib/www/pieces/whiteBishop.svg ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "25fd55d032c3cc0aeb15b89ffdfd01ce.svg";

/***/ }),

/***/ "./lib/www/pieces/whiteKing.svg":
/*!**************************************!*\
  !*** ./lib/www/pieces/whiteKing.svg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "29d92e646e03b815f8160d5bb2e56343.svg";

/***/ }),

/***/ "./lib/www/pieces/whiteKnight.svg":
/*!****************************************!*\
  !*** ./lib/www/pieces/whiteKnight.svg ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a2c477d2f050bb0dea697a776a8f17fc.svg";

/***/ }),

/***/ "./lib/www/pieces/whitePawn.svg":
/*!**************************************!*\
  !*** ./lib/www/pieces/whitePawn.svg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "9d8cff0861080140dd480aa1efe52134.svg";

/***/ }),

/***/ "./lib/www/pieces/whiteQueen.svg":
/*!***************************************!*\
  !*** ./lib/www/pieces/whiteQueen.svg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "2b51c5914fd5dbfc67fa4bb90a598509.svg";

/***/ }),

/***/ "./lib/www/pieces/whiteRook.svg":
/*!**************************************!*\
  !*** ./lib/www/pieces/whiteRook.svg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "8a34e84060da1a54eb39ba8575e3f86f.svg";

/***/ })

/******/ });
//# sourceMappingURL=index.pack.js.map