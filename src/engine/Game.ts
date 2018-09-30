import { Type } from "./Type";
import { Color } from "./Color";
import Piece from "./Piece";
import Position from "./Position";

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
    pieces: number[]
    constructor() {
        this.pieces = new Array(64)
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

    slide(x: number, y: number, dx: number, dy: number, max: number, color: Color, onlyCaptures: boolean, moves: number[]): number {
        let count = 0
        for (let i = 1; i <= max; i++) {
            x += dx
            y += dy
            if (x < 0 || x >= 8 || y < 0 || y >= 8)
                break
            let pos = Pos(x, y)
            let obstacle = this.pieces[pos]
            if (Piece.get.type(obstacle) !== Type.Empty) {
                if (Piece.get.color(obstacle) !== color) {
                    moves.push(pos)
                    return ++count
                }
                break
            } else if (!onlyCaptures) {
                moves.push(pos)
                ++count
            }
        }
        return count
    }

    slideCardinals(x: number, y: number, max: number, color: Color, onlyCaptures: boolean, moves: number[]) {
        this.slide(x, y, 1, 0, max, color, onlyCaptures, moves)
        this.slide(x, y, -1, 0, max, color, onlyCaptures, moves)
        this.slide(x, y, 0, -1, max, color, onlyCaptures, moves)
        this.slide(x, y, 0, 1, max, color, onlyCaptures, moves)
    }

    slideDiagonals(x: number, y: number, max: number, color: Color, onlyCaptures: boolean, moves: number[]) {
        this.slide(x, y, 1, 1, max, color, onlyCaptures, moves)
        this.slide(x, y, -1, 1, max, color, onlyCaptures, moves)
        this.slide(x, y, 1, -1, max, color, onlyCaptures, moves)
        this.slide(x, y, -1, -1, max, color, onlyCaptures, moves)
    }

    generateMovesAt(pos: number) {
        let piece = this.pieces[pos]
        return this.generateMoves(pos, Piece.get.type(piece), Piece.get.color(piece), Piece.get.moved(piece), false)
    }

    generateMoves(pos: number, type: Type, color: Color, moved: number, onlyCaptures: boolean) {
        let x = Position.get.x(pos)
        let y = Position.get.y(pos)
        let moves = []
        switch (type) {
            case Type.Pawn: {
                let dy = color == Color.White ? -1: 1
                this.slide(x, y, 0, dy, moved ? 1 : 2, color, onlyCaptures, moves)
                this.slide(x, y, -1, dy, 1, color, true, moves)
                this.slide(x, y, 1, dy, 1, color, true, moves)
                break
            }
            case Type.Knight: {
                // QI, +x, +y
                this.slide(x, y, 2, 1, 1, color, onlyCaptures, moves)
                this.slide(x, y, 1, 2, 1, color, onlyCaptures, moves)
                // QII, -x, +y
                this.slide(x, y, -2, 1, 1, color, onlyCaptures, moves)
                this.slide(x, y, -1, 2, 1, color, onlyCaptures, moves)
                // QIII, -x, -y
                this.slide(x, y, -2, -1, 1, color, onlyCaptures, moves)
                this.slide(x, y, -1, -2, 1, color, onlyCaptures, moves)
                // QIV, +x, -y
                this.slide(x, y, 2, -1, 1, color, onlyCaptures, moves)
                this.slide(x, y, 1, -2, 1, color, onlyCaptures, moves)
                break
            }
            case Type.Bishop: { this.slideDiagonals(x, y, 7, color, onlyCaptures, moves); break }
            case Type.Rook: { this.slideCardinals(x, y, 7, color, onlyCaptures, moves); break }
            case Type.Queen: { this.slideDiagonals(x, y, 7, color, onlyCaptures, moves); this.slideCardinals(x, y, 7, color, onlyCaptures, moves); break }
            case Type.King: { this.slideDiagonals(x, y, 1, color, onlyCaptures, moves); this.slideCardinals(x, y, 1, color, onlyCaptures, moves); break }
        }
        return moves
    }

    // Capturing moves are direction reversible so it's OK to scan from the friendly piece to the enemy pieces.
    // If we do this for each type, we can be sure no pieces threaten our piece.
    // If we can 'capture' them, they can capture us.
    isSafe(pos: number, color: Color) {
        for (let type = Type.Pawn; type <= Type.King; type++) {
            let moves = this.generateMoves(pos, type, color, 1, true)
            for (let move of moves) {
                let piece = this.pieces[move]
                if (Piece.get.type(piece) === type)
                    return false
            }
        }
        return true
    }
}