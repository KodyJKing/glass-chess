import { Engine } from "./Engine"
import Position from "./Position"
import Piece from "./Piece"
import Move from "./Move"
import pieceValues from "./pieceValues"
import { Type } from "./Type"
import { Color } from "./Color"

const Pos = Position.create
const MAX_VALUE = Number.MAX_SAFE_INTEGER // Infinity

export default function(engine: Engine, options: any = {}) {
    options = Object.assign({ depth: 6, rootCall: true }, options)

    let startTime = Date.now()
    let evaluations = 0
    let cache = options.cache || new Map<string, number>()

    const heuristic = (useFast) => {
        evaluations++

        const config = {
            material: 10,
            control: 5,
            threat: 1,
            threateningPieces: 1,
            development: 5,
            support: 5
        }

        if (engine.inCheck() && engine.inMate())
            return engine.turn == Color.White ? -MAX_VALUE : MAX_VALUE

        if (useFast)
            return engine.netMaterialValue * config.material

        let control = 0
        let threat = 0
        let threateningPieces = 0
        let development = 0
        let support = 0

        const edgeDistance = (pos) => {
            let xDist = 3.5 - Math.abs(Position.get.x(pos) - 3.5)
            let yDist = 3.5 - Math.abs(Position.get.y(pos) - 3.5)
            return xDist + yDist
        }

        for (let pos = 0; pos < 64; pos++) {
            let piece = engine.pieces[pos]
            let type = Piece.get.type(piece)
            if (type === Type.Empty)
                continue

            let invPieceValue = 1 / pieceValues[type]
            let color = Piece.get.color(piece)
            let valueSign = color === Color.White ? 1 : -1

            development += edgeDistance(pos) * invPieceValue * valueSign
            if (type === Type.Pawn) {
                let pawnDevelopment = (color == Color.White) ? 7 - Position.get.y(pos) : Position.get.y(pos)
                development += Math.max(8, 1.5 ** pawnDevelopment) * valueSign
            }

            let threatening = false
            for (let move of engine.generateMovesAt(pos, true)) {
                let capturedType = Piece.get.type(Move.get.captured(move))
                let capturedColor = Piece.get.color(Move.get.captured(move))
                let captured = capturedType !== Type.Empty
                if (captured && capturedColor == color) {
                    support += valueSign * invPieceValue / pieceValues[capturedType]
                } else {
                    let to = Move.get.to(move)
                    control += (1 + edgeDistance(to) * invPieceValue) * valueSign
                    if (captured) {
                        threatening = true
                        let value = capturedType == Type.King ? 10 : pieceValues[capturedType] * invPieceValue
                        threat += valueSign * value
                    }
                }
            }

            if (threatening)
                threateningPieces += valueSign
        }

        return engine.netMaterialValue * config.material
            + control * config.control
            + threat * config.threat
            + threateningPieces * config.threateningPieces
            + development * config.development
            + support * config.support
    }

    const search = (depth = 0, rootCall = true, alpha = options.alpha || -MAX_VALUE, beta = options.beta || MAX_VALUE) => {
        let turn = engine.turn
        let valueSign = (engine.turn === Color.White) ? 1 : -1

        let positionString = engine.positionString() + depth + "," + turn
        if (!rootCall && cache.has(positionString))
            return cache.get(positionString) as number

        let pairs = engine.allMoves(true).map((move) => {
            engine.doMove(move)
            let h = heuristic(depth < 3)
            engine.undoMove()
            return [move, h]
        })
        pairs.sort((a,b) => ((b[1] - a[1]) * valueSign))

        let best: number | null = null
        let bestValue = -MAX_VALUE * valueSign
        let cutoff = false
        for (let [move, h] of pairs) {
            let value = 0
            engine.doMove(move)
                value = depth == 1 ? h : (search(depth - 1, false, alpha, beta) as number)
                // The advanced heuristic is too slow to use on leaves so instead it's evaluated on the parent.
                if (depth == 3)
                    value += heuristic(false)
                if (best === null  || value * valueSign > bestValue * valueSign) {
                    best = move
                    bestValue = value
                    if (turn === Color.White)
                        alpha = Math.max(alpha, bestValue)
                    else
                        beta = Math.min(beta, bestValue)
                    cutoff = (alpha >= beta)
                }
            engine.undoMove()
            if (cutoff)
                break
        }

        cache.set(positionString, bestValue)

        return rootCall ? [best, bestValue]: bestValue
    }

    let [result, resultValue] = search(options.depth) as number[]

    if (options.rootCall) {
        let dt = (Date.now() - startTime)
        let addCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        engine.totalSearchTime += dt
        let evalsPerMs = (evaluations / dt).toString().split(".")[0]
        console.log(`${addCommas(evaluations)} evals | ${addCommas(dt)} ms | ${addCommas(evalsPerMs)} evals/ms | total search time: ${addCommas(engine.totalSearchTime)} ms`)
    }

    return options.rootCall ? result : resultValue
}