import { Engine } from "./Engine"
import Position from "./Position"
import Piece from "./Piece"
import Move from "./Move"
import pieceValues from "./pieceValues"
import { Type } from "./Type"
import { Color } from "./Color"

const Pos = Position.create

export default function(engine: Engine, options = { depth: 6, materialBias: 10 }) {
    let startTime = Date.now()
    let evaluations = 0
    let cache = new Map<string, number>()

    const heuristic = (useFast) => {
        if (useFast)
            return engine.netMaterialValue * options.materialBias

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

                development += edgeDistance(pos) * invPieceValue * valueSign * 5

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

    const search = (depth = 0, rootCall = true, alpha = -Infinity, beta = Infinity) => {
        evaluations++
        if (depth <= 0)
            return heuristic(true)

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
        let bestValue = -Infinity * valueSign
        let alphaBetaCutoff = false
        for (let [move, h] of pairs) {
            let value = 0
            engine.doMove(move)
                // let capture = Piece.get.type(Move.get.captured(move)) != Type.Empty
                // let _depth = (depth == 1 && capture) ? 1 : depth - 1
                let _depth = depth - 1
                value = (search(_depth, false, alpha, beta) as number)
                // The advanced heuristic is too slow to use on leaves so instead it's evaluated on the parent.
                if (depth == 1)
                    value += heuristic(false)

                let isImprovement = best === null  || value * valueSign > bestValue * valueSign
                if (isImprovement) {
                    // console.log(engine.prettyString())
                    // console.log(value)
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

        cache.set(positionString, bestValue)

        return rootCall ? best : bestValue
    }

    let result = search(options.depth)
    let dt = (Date.now() - startTime)

    let addCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    engine.totalSearchTime += dt
    let evalsPerMs = (evaluations / dt).toString().split(".")[0]
    console.log(`${addCommas(evaluations)} evals | ${addCommas(dt)} ms | ${addCommas(evalsPerMs)} evals/ms | total search time: ${addCommas(engine.totalSearchTime)} ms`)

    return result
}