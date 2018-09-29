import { PieceType } from "./PieceType";
import { Color } from "./Color";
import struct from "./struct";
import Piece from "./Piece";
import Position from "./Position";

const Pos = Position.create


const pieceToCharStr = ".pnbrqk"
function pieceToChar(piece: number) {
    let char = pieceToCharStr[Piece.get.type(piece)]
    return Piece.get.color(piece) === Color.Black ? char : char.toUpperCase()
}

function charToPiece(char: string) {
    let type = pieceToCharStr.indexOf(char)
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

    toString(moves?: number[]) {
        let result: string[] = []
        for (let y = 0; y < 8; y++) {
            let row: string[] = []
            for (let x = 0; x < 8; x++) {
                let char
                if (moves && moves.indexOf(Position.create(x, y)) > -1)
                    char = "#"
                else
                    char = pieceToChar(this.pieces[Pos(x, y)])
                row.push(char + " ")
            }
            result.push(row.join(""))
        }
        return result.join("\n")
    }

    slide(x: number, y: number, dx: number, dy: number, max: number, color: Color, moves: number[]) {
        for (let i = 1; i <= max; i++) {
            x += dx
            y += dy
            if (x < 0 || x >= 8 || y < 0 || y >= 8)
                break
            let pos = Pos(x, y)
            let obstacle = this.pieces[pos]
            if (Piece.get.type(obstacle) !== PieceType.Empty) {
                if (Piece.get.color(obstacle) !== color)
                    moves.push(pos)
                break
            } else {
                moves.push(pos)
            }
        }
    }

    slideCardinals(x: number, y: number, max: number, color: Color, moves: number[]) {
        this.slide(x, y, 1, 0, max, color, moves)
        this.slide(x, y, -1, 0, max, color, moves)
        this.slide(x, y, 0, -1, max, color, moves)
        this.slide(x, y, 0, 1, max, color, moves)
    }

    slideDiagnols(x: number, y: number, max: number, color: Color, moves: number[]) {
        this.slide(x, y, 1, 1, max, color, moves)
        this.slide(x, y, -1, 1, max, color, moves)
        this.slide(x, y, 1, -1, max, color, moves)
        this.slide(x, y, -1, -1, max, color, moves)
    }

    generateMoves(pos: number) {
        let x = Position.get.x(pos)
        let y = Position.get.y(pos)
        let piece = this.pieces[pos]
        let color = Piece.get.color(piece)
        let type = Piece.get.type(piece)
        let moves = []
        switch (type) {
            case PieceType.Rook: { this.slideCardinals(x, y, 7, color, moves); break }
            case PieceType.Bishop: { this.slideDiagnols(x, y, 7, color, moves); break }
        }
        return moves
    }
}