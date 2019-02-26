import { Type } from "./Type";
import { Color } from "./Color";
import Piece from "./Piece";
import Position from "./Position";
import Move from "./Move";
import { pieceToChar, charToPiece } from "./common";
import pieceValues from "./pieceValues";

const Pos = Position.create
const posX = Position.get.x
const posY = Position.get.y

const EMPTY = Piece.create(0, 0, 0)

enum Ternary { always, never, either }

export class Engine {

    // Representation

    pieces!: Uint8Array
    turn!: Color
    netMaterialValue!: number
    history!: number[]
    totalSearchTime = 0
    constructor() {
        try { (window as any).engine = this } catch (e) {}
        this.clear()
    }

    clear() {
        this.pieces = new Uint8Array(64)
        this.turn = Color.White
        this.netMaterialValue = 0
        this.history = []
        this.totalSearchTime = 0
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
        let engine = new Engine()
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                engine.pieces[Pos(x, y)] = rows[y][x]
            }
        }
        return engine
    }

    prettyString(moves?: number[]) {
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

    static compareBoards(a: string, b: string) {
        let format = (x) => (
            x.split("\n")
            .map( (x) => x.trim() )
            .filter( (x) => x.length > 0 )
        ).join("\n")
        return format(a) === format(b)
    }

    positionString() {
        let parts = new Array(24)
        let i = 0
        for (let y = 0; y < 8; y++)
            for (let x = 0; x < 8; x += 3)
                parts[i++] = String.fromCharCode(
                    (this.pieces[Pos(x, y)] << 10) |
                    (this.pieces[Pos(x + 1, y)] << 5) |
                    (this.pieces[Pos(x + 2, y)] || 0)
                )
        return parts.join("")
    }

    toString() {
        let parts = new Array()
        for (let move of this.history)
            parts.push(
                String.fromCharCode(
                    Move.set.firstMove(Move.set.captured(move, 0), 0)
                )
            )
        return parts.join("")
    }

    static fromString(movesString: string) {
        let engine = new Engine()
        engine.standardSetup()
        for (let i = 0; i < movesString.length; i++)
            engine.doMove(movesString.charCodeAt(i))
        return engine
    }

    static fromHistory(moves: number[]) {
        let engine = new Engine()
        engine.standardSetup()
        for (let move of moves)
            engine.doMove(move)
        return engine
    }

    // Move Generation

    slide(from: number, dx: number, dy: number, max: number, color: Color, selfCaptures: boolean, captures: Ternary, moves: number[]): number {
        let count = 0
        let x = posX(from)
        let y = posY(from)
        for (let i = 1; i <= max; i++) {
            x += dx
            y += dy
            if (x < 0 || x >= 8 || y < 0 || y >= 8)
                break
            let to = Pos(x, y)
            let obstacle = this.pieces[to]
            let move = Move.create(to, from, obstacle, 0)
            if (Piece.get.type(obstacle) !== Type.Empty) {
                if (captures !== Ternary.never && Piece.get.color(obstacle) !== color) {
                    moves.push(move)
                    return ++count
                }
                break
            } else if (captures !== Ternary.always) {
                moves.push(move)
                ++count
            }
        }
        return count
    }

    slideCardinals(pos: number, max: number, color: Color, selfCaptures: boolean, captures: Ternary, moves: number[]) {
        this.slide(pos, 1, 0, max, color, selfCaptures, captures, moves)
        this.slide(pos, -1, 0, max, color, selfCaptures, captures, moves)
        this.slide(pos, 0, -1, max, color, selfCaptures, captures, moves)
        this.slide(pos, 0, 1, max, color, selfCaptures, captures, moves)
    }

    slideDiagonals(pos: number, max: number, color: Color, selfCaptures: boolean, captures: Ternary, moves: number[]) {
        this.slide(pos, 1, 1, max, color, selfCaptures, captures, moves)
        this.slide(pos, -1, 1, max, color, selfCaptures, captures, moves)
        this.slide(pos, 1, -1, max, color, selfCaptures, captures, moves)
        this.slide(pos, -1, -1, max, color, selfCaptures, captures, moves)
    }

    generateMoves(pos: number, type: Type, color: Color, moved: number, selfCaptures: boolean, captures: Ternary): number[] {
        let moves: number[] = []
        switch (type) {
            case Type.Pawn: {
                let dy = color == Color.White ? -1: 1
                this.slide(pos, 0, dy, moved ? 1 : 2, color, selfCaptures, Ternary.never, moves)
                this.slide(pos, -1, dy, 1, color, selfCaptures, Ternary.always, moves)
                this.slide(pos, 1, dy, 1, color, selfCaptures, Ternary.always, moves)
                if (
                    (Position.get.y(pos) == 6 && color == Color.Black) ||
                    (Position.get.y(pos) == 1 && color == Color.White)
                ) {
                    for (let i = 0; i < moves.length; i++)
                        moves[i] = Move.set.promotion(moves[i], 1)
                }
                break
            }
            case Type.Knight: {
                // QI, +x, +y
                this.slide(pos, 2, 1, 1, color, selfCaptures, captures, moves)
                this.slide(pos, 1, 2, 1, color, selfCaptures, captures, moves)
                // QII, -x, +y
                this.slide(pos, -2, 1, 1, color, selfCaptures, captures, moves)
                this.slide(pos, -1, 2, 1, color, selfCaptures, captures, moves)
                // QIII, -x, -y
                this.slide(pos, -2, -1, 1, color, selfCaptures, captures, moves)
                this.slide(pos, -1, -2, 1, color, selfCaptures, captures, moves)
                // QIV, +x, -y
                this.slide(pos, 2, -1, 1, color, selfCaptures, captures, moves)
                this.slide(pos, 1, -2, 1, color, selfCaptures, captures, moves)
                break
            }
            case Type.Bishop: { this.slideDiagonals(pos, 7, color, selfCaptures, captures, moves); break }
            case Type.Rook: { this.slideCardinals(pos, 7, color, selfCaptures, captures, moves); break }
            case Type.Queen: { this.slideDiagonals(pos, 7, color, selfCaptures, captures, moves); this.slideCardinals(pos, 7, color, selfCaptures, captures, moves); break }
            case Type.King: {
                this.slideDiagonals(pos, 1, color, selfCaptures, captures, moves)
                this.slideCardinals(pos, 1, color, selfCaptures, captures, moves)
                if (!moved) {
                    if (this.canCastle(pos, color, -1))
                        moves.push(Move.create(Pos(2, posY(pos)), pos, 0, 1))
                    if (this.canCastle(pos, color, 1))
                        moves.push(Move.create(Pos(6, posY(pos)), pos, 0, 1))
                }
                break
            }
        }
        return moves
    }

    canCastle(pos: number, color: Color, dx: number) {
        return this.rookVisible(pos, color, dx) && !this.passesThroughCheck(pos, color, dx)
    }
    rookVisible(pos: number, color: Color, dx: number) {
        let x = posX(pos)
        let y = posY(pos)
        while (x >= 0 && x <= 7) {
            x += dx
            let piece = this.pieces[Pos(x, y)]
            let type = Piece.get.type(piece)
            if (type != Type.Empty)
                return type === Type.Rook && !Piece.get.moved(piece) && Piece.get.color(piece) === color
        }
        return false
    }
    passesThroughCheck(pos: number, color: Color, dx: number) {
        let x = posX(pos)
        let y = posY(pos)
        for (let i = 0; i < 2; i++)
            if (!this.isSafe(Pos(x + i * dx, y), color))
                return true
        return false
    }

    tryCastle(to, from, undo: boolean) {
        let dx = posX(to) - posX(from)
        if (Math.abs(dx) < 2)
            return

        let y = posY(to)
        let rookFrom = Pos(dx > 0 ? 7 : 0, y)
        let rookTo = Pos(posX(to) - Math.sign(dx), y)

        if (undo) {
            let rook = this.pieces[rookTo]
            this.pieces[rookFrom] = Piece.set.moved(rook, 0)
            this.pieces[rookTo] = EMPTY
        } else {
            let rook = this.pieces[rookFrom]
            this.pieces[rookFrom] = EMPTY
            this.pieces[rookTo] = Piece.set.moved(rook, 1)
        }
    }

    setPiece(pos: number, piece: number) {
        let captured = this.pieces[pos]
        this.netMaterialValue -= pieceValues[Piece.get.type(captured)] * (Piece.get.color(captured) == Color.White ? 1 : -1)
        this.netMaterialValue += pieceValues[Piece.get.type(piece)] * (Piece.get.color(piece) == Color.White ? 1 : -1)
        this.pieces[pos] = piece
    }

    doMove(move: number) {
        this.history.push(move)

        let from = Move.get.from(move)
        let to = Move.get.to(move)
        let piece = Piece.set.moved(this.pieces[from], 1)
        if (Move.get.promotion(move))
            piece = Piece.set.type(piece, Type.Queen)

        this.setPiece(from, EMPTY)
        this.setPiece(to, piece)
        this.turn = (this.turn + 1) % 2

        if (Piece.get.type(piece) === Type.King)
            this.tryCastle(to, from, false)
    }

    undoMove() {
        let move = this.history.pop() as number

        let from = Move.get.from(move)
        let to = Move.get.to(move)
        let piece = Piece.set.moved(this.pieces[to], Move.get.firstMove(move) ? 0 : 1)
        if (Move.get.promotion(move))
            piece = Piece.set.type(piece, Type.Pawn)

        this.setPiece(from, piece)
        this.setPiece(to, Move.get.captured(move))
        this.turn = (this.turn + 1) % 2

        if (Piece.get.type(piece) === Type.King)
            this.tryCastle(to, from, true)
    }

    generateMovesAt(pos: number, selfCaptures = false) {
        let piece = this.pieces[pos]
        let moves = this.generateMoves(pos, Piece.get.type(piece), Piece.get.color(piece), Piece.get.moved(piece), selfCaptures, Ternary.either)
        if (!Piece.get.moved(piece))
            for (let i = 0; i < moves.length; i++)
                moves[i] = Move.set.firstMove(moves[i], 1)
        return moves
    }

    generateSafeMovesAt(pos: number) {
        let piece = this.pieces[pos]
        let color = Piece.get.color(piece)
        return this.filterByKingSafety(color, this.generateMovesAt(pos))
    }

    // This can be slow because it is only used by filterByKingSafetly.
    kingPos(turn: Color) {
        for (let i = 0; i < 64; i++) {
            let p = this.pieces[i]
            if (Piece.get.type(p) === Type.King && Piece.get.color(p) === turn)
                return i
        }
        return null
        // throw new Error(`Missing ${turn} king.`)
    }

    // This can be slow because it's not used in the search algorithm.
    // Because of the piece value of the king, this check would be redundant.
    filterByKingSafety(turn: Color, moves: number[]) {
        let result: number[] = []
        for (let move of moves) {
            this.doMove(move)
            let kingPos = this.kingPos(turn)
            if (kingPos == null || this.isSafe(kingPos, turn))
                result.push(move)
            this.undoMove()
        }
        return result
    }

    // Capturing moves are direction reversible so it's OK to scan from the friendly piece to the enemy pieces.
    // If we do this for each type, we can be sure no pieces threaten our piece.
    // If we can 'capture' them, they can capture us.
    isSafe(pos: number, color: Color) {
        for (let type = Type.Pawn; type <= Type.King; type++) {
            let moves = this.generateMoves(pos, type, color, 1, false, Ternary.always)
            for (let move of moves) {
                let piece = this.pieces[Move.get.to(move)]
                if (Piece.get.type(piece) === type)
                    return false
            }
        }
        return true
    }

    allMoves(safe = false) {
        let moves: number[] = []
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                let pos = Pos(x, y)
                let piece = this.pieces[pos]
                if (Piece.get.color(piece) !== this.turn || Piece.get.type(piece) === Type.Empty)
                    continue
                let _moves = safe ? this.generateSafeMovesAt(pos) : this.generateMovesAt(pos)
                for (let move of _moves)
                    moves.push(move)
            }
        }
        return moves
    }

    inCheck(turn = this.turn) {
        let pos = this.kingPos(turn)
        return (pos === null) ? false : !this.isSafe(pos, turn)
    }

    inMate() {
        return this.allMoves(true).length === 0
    }

}