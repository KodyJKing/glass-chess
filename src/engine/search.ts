import { Engine } from "./Engine"
import Position from "./Position"
import Piece from "./Piece"
import Move from "./Move"
import pieceValues from "./pieceValues"
import { Type } from "./Type"
import { Color } from "./Color"

const Pos = Position.create

export default function(engine: Engine, depth = 5, options = { materialBias: 10 }) {
    let startTime = Date.now()
    let evaluations = 0
    let cache = new Map<string, number>()

    let heuristic = (depth, options) => {
        if (depth === 0)
            return engine.netMaterialValue * options.materialBias
        if (depth > 1)
            return 0

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

        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                let pos = Pos(x, y)
                let piece = engine.pieces[pos]
                let type = Piece.get.type(piece)
                if (type === Type.Empty)
                    continue

                let invPieceValue = 1 / pieceValues[type]
                let color = Piece.get.color(piece)
                let valueSign = color === Color.White ? 1 : -1

                development += edgeDistance(pos) * valueSign * invPieceValue

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
        }
        return engine.netMaterialValue * options.materialBias + (control + threat + threateningPieces + development + support)
    }

    let search = (depth = 0, rootCall = true, alpha = -Infinity, beta = Infinity) => {
        let isLeaf = depth <= 0
        let turn = engine.turn
        let valueSign = (engine.turn === Color.White) ? 1 : -1

        let positionString = engine.positionString() + depth + "," + turn
        if (!rootCall && !isLeaf && cache.has(positionString))
            return cache.get(positionString) as number

        let pairs = engine.allMoves().map((move) => {
            engine.doMove(move)
            let value = heuristic(isLeaf ? 0 : 1, options)
            engine.undoMove()
            return [move, value]
        })
        pairs.sort((a,b) => ((b[1] - a[1]) * valueSign))

        let best: number | null = null
        let bestValue = -Infinity * valueSign
        let alphaBetaCutoff = false
        for (let [move] of pairs) {
            let value = 0
            engine.doMove(move)
                evaluations++
                value = heuristic(depth, options)
                if (!isLeaf)
                    value += search(depth - 1, false, alpha, beta) as number

                // console.log(engine.prettyString())
                // console.log(value)

                let isImprovement = best === null  || value * valueSign > bestValue * valueSign
                if (isImprovement && !engine.inCheck(turn)) {
                    best = move
                    bestValue = value
                    if (turn === Color.White)
                        alpha = Math.max(alpha, bestValue)
                    else
                        beta = Math.min(beta, bestValue)
                    alphaBetaCutoff = (alpha >= beta)
                }
            engine.undoMove()
            if (alphaBetaCutoff)
                break
        }

        if (!isLeaf)
            cache.set(positionString, bestValue)

        return rootCall ? best : bestValue
    }

    let result = search(depth)
    let dt = (Date.now() - startTime)

    let addCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    engine.totalSearchTime += dt
    let evalsPerMs = (evaluations / dt).toString().split(".")[0]
    console.log(`${addCommas(evaluations)} evals | ${addCommas(dt)} ms | ${addCommas(evalsPerMs)} evals/ms | total search time: ${addCommas(engine.totalSearchTime)} ms`)

    return result
}