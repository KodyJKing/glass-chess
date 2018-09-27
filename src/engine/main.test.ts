import test from "ava"
import struct from "./struct";
import { PieceType } from "./PieceType";
import { Color } from "./Color";

test("struct", t => {
    let piece = struct([
        ["type", 3],
        ["color", 1],
        ["moved", 1]
    ])

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

    console.log(piece.toObject(p))
})