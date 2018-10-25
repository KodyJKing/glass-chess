import { Type } from "./Type";
import { Color } from "./Color";
import Piece from "./Piece";
import Position from "./Position";
import Move from "./Move";

const Pos = Position.create

const pieceToCharStr = ".pnbrqk"
function pieceToChar(piece: number) {
    let char = pieceToCharStr[Piece.get.type(piece)]
    return Piece.get.color(piece) === Color.Black ? char : char.toUpperCase()
}

function charToPiece(char: string) {
    let type = pieceToCharStr.indexOf(char.toLowerCase())
    let color = (char === char.toLowerCase()) ? Color.Black : Color.White
    return Piece.create(type, color, 0)
}

export class Game {

    // Representation

    pieces: Uint8Array
    constructor() {
        this.pieces = new Uint8Array(64)
    }

    standardSetup() {
        for (let x = 0; x < 8; x++) {
            let type = Piece.get.type(charToPiece("rnbqkbnr"[x]))
            this.pieces[Pos(x, 0)] = Piece.create(type, Color.Black, 0)
            this.pieces[Pos(x, 1)] = Piece.create(Type.Pawn, Color.Black, 0)
            this.pieces[Pos(x, 7)] = Piece.create(type, Color.White, 0)
            this.pieces[Pos(x, 6)] = Piece.create(Type.Pawn, Color.White, 0)
        }
        return this
    }

    static parseBoard(board: string) {
        let rows =
            board.split("\n")
            .filter( (row) => row.length > 0 ) // Remove empty lines.
            .map(
                (row) =>
                    row.replace(/ /g, "")     // Remove whitespace.
                    .split("")                // Convert to char array.
                    .map(charToPiece)
            )
        let game = new Game()
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                game.pieces[Pos(x, y)] = rows[y][x]
            }
        }
        return game
    }

    toString(moves?: number[]) {
        let positions = moves ? moves.map((move) => Move.get.to(move)) : []
        let result: string[] = []
        for (let y = 0; y < 8; y++) {
            let row: string[] = []
            for (let x = 0; x < 8; x++) {
                let char
                if (positions.indexOf(Position.create(x, y)) > -1)
                    char = "#"
                else
                    char = pieceToChar(this.pieces[Pos(x, y)])
                row.push(char + " ")
            }
            result.push(row.join(""))
        }
        return result.join("\n")
    }

    // Move Generation

    slide(from: number, dx: number, dy: number, max: number, color: Color, onlyCaptures: boolean, moves: number[]): number {
        let count = 0
        let x = Position.get.x(from)
        let y = Position.get.y(from)
        for (let i = 1; i <= max; i++) {
            x += dx
            y += dy
            if (x < 0 || x >= 8 || y < 0 || y >= 8)
                break
            let to = Pos(x, y)
            let obstacle = this.pieces[to]
            let move = Move.create(to, from, obstacle, 0, 0)
            if (Piece.get.type(obstacle) !== Type.Empty) {
                if (Piece.get.color(obstacle) !== color) {
                    moves.push(move)
                    return ++count
                }
                break
            } else if (!onlyCaptures) {
                moves.push(move)
                ++count
            }
        }
        return count
    }

    slideCardinals(pos: number, max: number, color: Color, onlyCaptures: boolean, moves: number[]) {
        this.slide(pos, 1, 0, max, color, onlyCaptures, moves)
        this.slide(pos, -1, 0, max, color, onlyCaptures, moves)
        this.slide(pos, 0, -1, max, color, onlyCaptures, moves)
        this.slide(pos, 0, 1, max, color, onlyCaptures, moves)
    }

    slideDiagonals(pos: number, max: number, color: Color, onlyCaptures: boolean, moves: number[]) {
        this.slide(pos, 1, 1, max, color, onlyCaptures, moves)
        this.slide(pos, -1, 1, max, color, onlyCaptures, moves)
        this.slide(pos, 1, -1, max, color, onlyCaptures, moves)
        this.slide(pos, -1, -1, max, color, onlyCaptures, moves)
    }

    generateMoves(pos: number, type: Type, color: Color, moved: number, onlyCaptures: boolean): number[] {
        let moves = []
        switch (type) {
            case Type.Pawn: {
                let dy = color == Color.White ? -1: 1
                this.slide(pos, 0, dy, moved ? 1 : 2, color, onlyCaptures, moves)
                this.slide(pos, -1, dy, 1, color, true, moves)
                this.slide(pos, 1, dy, 1, color, true, moves)
                break
            }
            case Type.Knight: {
                // QI, +x, +y
                this.slide(pos, 2, 1, 1, color, onlyCaptures, moves)
                this.slide(pos, 1, 2, 1, color, onlyCaptures, moves)
                // QII, -x, +y
                this.slide(pos, -2, 1, 1, color, onlyCaptures, moves)
                this.slide(pos, -1, 2, 1, color, onlyCaptures, moves)
                // QIII, -x, -y
                this.slide(pos, -2, -1, 1, color, onlyCaptures, moves)
                this.slide(pos, -1, -2, 1, color, onlyCaptures, moves)
                // QIV, +x, -y
                this.slide(pos, 2, -1, 1, color, onlyCaptures, moves)
                this.slide(pos, 1, -2, 1, color, onlyCaptures, moves)
                break
            }
            case Type.Bishop: { this.slideDiagonals(pos, 7, color, onlyCaptures, moves); break }
            case Type.Rook: { this.slideCardinals(pos, 7, color, onlyCaptures, moves); break }
            case Type.Queen: { this.slideDiagonals(pos, 7, color, onlyCaptures, moves); this.slideCardinals(pos, 7, color, onlyCaptures, moves); break }
            case Type.King: { this.slideDiagonals(pos, 1, color, onlyCaptures, moves); this.slideCardinals(pos, 1, color, onlyCaptures, moves); break }
        }
        return moves
    }

    generateMovesAt(pos: number) {
        let piece = this.pieces[pos]
        let moves = this.generateMoves(pos, Piece.get.type(piece), Piece.get.color(piece), Piece.get.moved(piece), false)
        if (!Piece.get.moved(piece))
            for (let i = 0; i < moves.length; i++)
                moves[i] = Move.set.firstMove(moves[i], 1)
        return moves
    }

    // This can be slow because it is only used by filterByKingSafetly.
    kingPos(turn: Color) {
        for (let i = 0; i < 64; i++) {
            let p = this.pieces[i]
            if (Piece.get.type(p) === Type.King && Piece.get.color(p) === turn)
                return i
        }
        throw new Error(`Missing ${turn} king.`)
    }

    // This can be slow because it's not used in the search algorithm.
    // Because of the piece value of the king, this check would be redundant.
    filterByKingSafety(turn: Color, moves: number[]) {
        let kingPos = this.kingPos(turn)
    }

    // Capturing moves are direction reversible so it's OK to scan from the friendly piece to the enemy pieces.
    // If we do this for each type, we can be sure no pieces threaten our piece.
    // If we can 'capture' them, they can capture us.
    isSafe(pos: number, color: Color) {
        for (let type = Type.Pawn; type <= Type.King; type++) {
            let moves = this.generateMoves(pos, type, color, 1, true)
            for (let move of moves) {
                let piece = this.pieces[Move.get.to(move)]
                if (Piece.get.type(piece) === type)
                    return false
            }
        }
        return true
    }
}