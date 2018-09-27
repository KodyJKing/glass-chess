import { PieceType } from "./PieceType";
import { Color } from "./Color";
import struct from "./struct";

const Piece = struct([
    ["type", 3],
    ["color", 1],
    ["moved", 1]
])

const Position = struct([
    ["x", 3],
    ["y", 3]
])

export class Game {
    pieces: number[]
    constructor() {
        this.pieces = new Array(64)
    }
}