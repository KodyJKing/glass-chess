import test from "ava"
import { Type } from "./Type";
import { Color } from "./Color";
import Piece from "./Piece";

test("constructor/setComponent", t => {
    let p = Piece.create(Type.King, Color.White, 0)

    t.true(Piece.get.type(p) === Type.King)
    t.true(Piece.get.color(p) === Color.White)
    t.true(Piece.get.moved(p) === 0)

    p = Piece.set.type(p, Type.Rook)
    p = Piece.set.color(p, Color.Black)
    p = Piece.set.moved(p, 1)

    t.true(Piece.get.type(p) === Type.Rook)
    t.true(Piece.get.color(p) === Color.Black)
    t.true(Piece.get.moved(p) === 1)
})

test("toObject/fromObject", t => {
    let object = { type: Type.King, color: Color.Black, moved: 0 }

    let p = Piece.create(Type.King, Color.Black, 0)
    let q = Piece.fromObject(object)
    t.true(p === q)

    t.deepEqual(object, Piece.toObject(q))
})

// test("structConstructorPerformance", t => {
//     console.time("structConstructor")
//     for (let i = 0; i < 10000; i++) {
//         Piece.create(Type.King, Color.White, 0)
//         Piece.create(Type.Rook, Color.Black, 1)
//         Piece.create(Type.Knight, Color.Black, 1)
//     }
//     console.timeEnd("structConstructor")
//     t.pass()
// })