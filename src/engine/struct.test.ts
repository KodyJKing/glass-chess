import test from "ava"
import struct from "./struct";
import { PieceType } from "./PieceType";
import { Color } from "./Color";

const Piece = struct([
    ["type", 3],
    ["color", 1],
    ["moved", 1]
])

test("constructor/setComponent", t => {
    let p = Piece.create(PieceType.King, Color.White, 0)

    t.true(Piece.get.type(p) === PieceType.King)
    t.true(Piece.get.color(p) === Color.White)
    t.true(Piece.get.moved(p) === 0)

    p = Piece.set.type(p, PieceType.Rook)
    p = Piece.set.color(p, Color.Black)
    p = Piece.set.moved(p, 1)

    t.true(Piece.get.type(p) === PieceType.Rook)
    t.true(Piece.get.color(p) === Color.Black)
    t.true(Piece.get.moved(p) === 1)
})

test("toObject/fromObject", t => {
    let object = { type: PieceType.King, color: Color.Black, moved: 0 }

    let p = Piece.create(PieceType.King, Color.Black, 0)
    let q = Piece.fromObject(object)
    t.true(p === q)

    t.deepEqual(object, Piece.toObject(q))
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