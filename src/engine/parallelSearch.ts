import search from "./search";
import child_process, { ChildProcess } from "child_process"
import os from "os"
import { Engine } from "./Engine";
import { Color } from "./Color";

export function parallelSearch(position: string): Promise<number> {

    return new Promise((resolve, reject) => {

        console.time("parallelSearch")
        let forks = os.cpus().map(() => child_process.fork(__filename))

        let engine = Engine.fromString(position)
        let turn = engine.turn
        let valueSign = turn === Color.White ? 1 : -1

        let moves = engine.allMoves(true)
        let moveCount = moves.length
        let pairs: [number, number][] = []

        let alpha = -Number.MAX_SAFE_INTEGER
        let beta = Number.MAX_SAFE_INTEGER

        let takeMove = (fork) => {
            let move = moves.pop()
            if (move) {
                fork.send([position, move, alpha, beta])
            } else if (pairs.length == moveCount) {
                console.timeEnd("parallelSearch")
                let best = 0
                for (let i = 1; i < pairs.length; i++)
                    if (pairs[i][1] * valueSign > pairs[best][1] * valueSign)
                        best = i
                // console.log(pairs)
                // console.log()
                // console.log(pairs[best])
                resolve(pairs[best][0])
            }
        }

        for (let fork of forks) {
            fork.on("message", (result) => {
                let [move, value] = result
                if (turn === Color.White)
                    alpha = Math.max(alpha, value)
                else
                    beta = Math.min(beta, value)
                pairs.push(result)
                takeMove(fork)
            })
            takeMove(fork)
        }

    })
}

const cache = new Map<string, number>()
process.on("message", ([position, move, alpha, beta]) => {
    if (typeof position != "string" || !process.send)
        return
    let engine = Engine.fromString(position)
    engine.doMove(move)
    let value = search(engine, { depth: 5, rootCall: false, alpha, beta, cache })
    value = Math.max(Number.MIN_SAFE_INTEGER, value)
    value = Math.min(Number.MAX_SAFE_INTEGER, value)
    process.send([move, value])
}