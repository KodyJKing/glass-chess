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

const Pos = Position.create

function pieceToChar(piece: number) {
    let char = ".pnbrqk"[Piece.get.type(piece)]
    return Piece.get.color(piece) === Color.Black ? char : char.toUpperCase()
}

function charToPiece(char: string) {
    let type = ".pnbrqk".indexOf(char)
    let color = char === char.toLowerCase() ? Color.Black : Color.White
    return Piece.create(type, color, 0)
}
export class Game {
    pieces: number[]
    constructor() {
        this.pieces = new Array(64)
        this.standardSetup()
    }

    standardSetup() {
        for (let x = 0; x < 8; x++) {
            let type = Piece.get.type(charToPiece("rnbqkbnr"[x]))
            this.pieces[Pos(x, 0)] = Piece.create(type, Color.Black, 0)
            this.pieces[Pos(x, 1)] = Piece.create(PieceType.Pawn, Color.Black, 0)
            this.pieces[Pos(x, 7)] = Piece.create(type, Color.White, 0)
            this.pieces[Pos(x, 6)] = Piece.create(PieceType.Pawn, Color.White, 0)
        }
    }

    toString() {
        let result: string[] = []
        for (let y = 0; y < 8; y++) {
            let row: string[] = []
            for (let x = 0; x < 8; x++)
                row.push(pieceToChar(this.pieces[Pos(x, y)]))
            result.push(row.join(""))
        }
        return result.join("\n")
    }
}