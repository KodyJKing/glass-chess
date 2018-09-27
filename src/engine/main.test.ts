import test from "ava"
import struct from "./struct";
import { PieceType } from "./PieceType";
import { Color } from "./Color";
import { Game } from "./Game";

const piece = struct([
    ["type", 3],
    ["color", 1],
    ["moved", 1]
])

test("struct", t => {
    let p = piece.create(PieceType.King, Color.White, 0)

    t.true(piece.get.type(p) === PieceType.King)
    t.true(piece.get.color(p) === Color.White)
    t.true(piece.get.moved(p) === 0)

    p = piece.set.type(p, PieceType.Rook)
    p = piece.set.color(p, Color.Black)
    p = piece.set.moved(p, 1)

    t.true(piece.get.type(p) === PieceType.Rook)
    t.true(piece.get.color(p) === Color.Black)
    t.true(piece.get.moved(p) === 1)
})

// test("structConstructorPerformance", t => {
//     console.time("structConstructor")
//     for (let i = 0; i < 10000; i++) {
//         piece.create(PieceType.King, Color.White, 0)
//         piece.create(PieceType.Rook, Color.Black, 1)
//         piece.create(PieceType.Knight, Color.Black, 1)
//     }
//     console.timeEnd("structConstructor")
//     t.pass()
// })

test("game", t => {
    let game = new Game()
    console.log("\n" + game.toString())
    t.pass()
})