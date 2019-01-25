import { Type } from "./Type";
import { Color } from "./Color";
import Piece from "./Piece";
import Position from "./Position";
import Move from "./Move";
import { pieceToChar, charToPiece } from "./common";

const Pos = Position.create
const posX = Position.get.x
const posY = Position.get.y

const EMPTY = Piece.create(0, 0, 0)

enum Ternary { always, never, either }

 const pieceValues = [
     0,       // Empty
     1,       // Pawn
     3,       // Knight
     3,       // Bishop
     5,       // Rook
     9,       // Queen
     99999    // King
 ]

export class Engine {

    // Representation

    pieces!: Uint8Array
    turn!: Color
    netMaterialValue!: number
    history!: number[]
    constructor() {
        try { (window as any).engine = this } catch (e) {}
        this.clear()
    }

    clear() {
        this.pieces = new Uint8Array(64)
        this.turn = Color.White
        this.netMaterialValue = 0
        this.history = []
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

    slide(from: number, dx: number, dy: number, max: number, color: Color, captures: Ternary, moves: number[]): number {
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

    slideCardinals(pos: number, max: number, color: Color, captures: Ternary, moves: number[]) {
        this.slide(pos, 1, 0, max, color, captures, moves)
        this.slide(pos, -1, 0, max, color, captures, moves)
        this.slide(pos, 0, -1, max, color, captures, moves)
        this.slide(pos, 0, 1, max, color, captures, moves)
    }

    slideDiagonals(pos: number, max: number, color: Color, captures: Ternary, moves: number[]) {
        this.slide(pos, 1, 1, max, color, captures, moves)
        this.slide(pos, -1, 1, max, color, captures, moves)
        this.slide(pos, 1, -1, max, color, captures, moves)
        this.slide(pos, -1, -1, max, color, captures, moves)
    }

    generateMoves(pos: number, type: Type, color: Color, moved: number, captures: Ternary): number[] {
        let moves: number[] = []
        switch (type) {
            case Type.Pawn: {
                let dy = color == Color.White ? -1: 1
                this.slide(pos, 0, dy, moved ? 1 : 2, color, Ternary.never, moves)
                this.slide(pos, -1, dy, 1, color, Ternary.always, moves)
                this.slide(pos, 1, dy, 1, color, Ternary.always, moves)
                break
            }
            case Type.Knight: {
                // QI, +x, +y
                this.slide(pos, 2, 1, 1, color, captures, moves)
                this.slide(pos, 1, 2, 1, color, captures, moves)
                // QII, -x, +y
                this.slide(pos, -2, 1, 1, color, captures, moves)
                this.slide(pos, -1, 2, 1, color, captures, moves)
                // QIII, -x, -y
                this.slide(pos, -2, -1, 1, color, captures, moves)
                this.slide(pos, -1, -2, 1, color, captures, moves)
                // QIV, +x, -y
                this.slide(pos, 2, -1, 1, color, captures, moves)
                this.slide(pos, 1, -2, 1, color, captures, moves)
                break
            }
            case Type.Bishop: { this.slideDiagonals(pos, 7, color, captures, moves); break }
            case Type.Rook: { this.slideCardinals(pos, 7, color, captures, moves); break }
            case Type.Queen: { this.slideDiagonals(pos, 7, color, captures, moves); this.slideCardinals(pos, 7, color, captures, moves); break }
            case Type.King: {
                this.slideDiagonals(pos, 1, color, captures, moves)
                this.slideCardinals(pos, 1, color, captures, moves)
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

    updateMaterial(move: number, undo: boolean) {
        let type = Piece.get.type(Move.get.captured(move))
        let isBlack = this.turn === Color.Black
        let sign = (isBlack === undo) ?  1 : -1
        this.netMaterialValue += sign * pieceValues[type]
    }

    doMove(move: number) {
        this.history.push(move)

        let from = Move.get.from(move)
        let to = Move.get.to(move)
        let piece = this.pieces[from]
        this.pieces[from] = EMPTY
        this.pieces[to] = Piece.set.moved(piece, 1)

        this.updateMaterial(move, false)

        this.turn = (this.turn + 1) % 2

        if (Piece.get.type(piece) === Type.King)
            this.tryCastle(to, from, false)
    }

    undoMove() {
        let move = this.history.pop() as number
        let from = Move.get.from(move)
        let to = Move.get.to(move)
        let piece = this.pieces[to]
        let hadMoved = Move.get.firstMove(move) ? 0 : 1
        this.pieces[from] = Piece.set.moved(piece,hadMoved)
        this.pieces[to] = Move.get.captured(move)

        this.turn = (this.turn + 1) % 2

        this.updateMaterial(move, true)

        if (Piece.get.type(piece) === Type.King)
            this.tryCastle(to, from, true)
    }

    generateMovesAt(pos: number) {
        let piece = this.pieces[pos]
        let moves = this.generateMoves(pos, Piece.get.type(piece), Piece.get.color(piece), Piece.get.moved(piece), Ternary.either)
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
            let moves = this.generateMoves(pos, type, color, 1, Ternary.always)
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

    // AI

    hashString() {
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

    totalSearchTime = 0
    alphabeta(depth = 5) {
        let startTime = Date.now()
        let evaluations = 0
        let transpositions = new Map<string, number>()

        let search = (depth = 0, rootCall = true, alpha = -Infinity, beta = Infinity) => {
            let isLeaf = depth <= 0
            let turn = this.turn

            let hashString = this.hashString() + depth
            if (!rootCall && !isLeaf && transpositions.has(hashString))
                return transpositions.get(hashString) as number

            let moves = this.allMoves()

            let valueSign = (this.turn === Color.White) ? 1 : -1
            let mobilityScore = moves.length * 0.1 * valueSign


            let best: number | null = null
            let bestValue = -Infinity * valueSign
            let alphaBetaCutoff = false
            for (let move of moves) {
                let value = 0
                this.doMove(move)
                    if (isLeaf) {
                        value = this.netMaterialValue + mobilityScore
                        evaluations++
                    } else {
                        value = search(depth - 1, false, alpha, beta) as number
                    }
                    if (value * valueSign > bestValue * valueSign && !this.inCheck(turn)) {
                        best = move
                        bestValue = value
                        if (turn === Color.White)
                            alpha = Math.max(alpha, bestValue)
                        else
                            beta = Math.min(beta, bestValue)
                        alphaBetaCutoff = (alpha >= beta)
                    }
                this.undoMove()
                if (alphaBetaCutoff)
                    break
            }

            if (!isLeaf)
                transpositions.set(hashString, bestValue)

            return rootCall ? best : bestValue
        }

        let result = search(depth)

        let addCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        let dt = (Date.now() - startTime)
        this.totalSearchTime += dt
        let _leaves = evaluations.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        let evalsPerMs = (evaluations / dt).toString().split(".")[0]
        console.log(`${addCommas(evaluations)} evals | ${addCommas(dt)} ms | ${addCommas(evalsPerMs)} leaves/ms | total search time: ${addCommas(this.totalSearchTime)} ms`)

        return result
    }

}