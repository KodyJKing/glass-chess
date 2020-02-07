"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const search_1 = __importDefault(require("../../engine/search"));
const Engine_1 = require("../../engine/Engine");
async function default_1(req, res) {
    let { position } = req.body;
    let engine = Engine_1.Engine.fromString(position);
    let move = search_1.default(engine, { depth: 6 });
    // let move = await parallelSearch(position)
    res.type("text/json").send(JSON.stringify(move));
}
exports.default = default_1;
