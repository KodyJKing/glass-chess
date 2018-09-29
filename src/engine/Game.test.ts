import test from "ava"
import { Game } from "./Game";
import Position from "./Position";
import Piece from "./Piece";
import { PieceType } from "./PieceType";
import { Color } from "./Color";

test("game", t => {
    let game = new Game()
    game.toString()
    // console.log("\n" + game.toString())
    t.pass()
})

test("generateMoves_Rook", t => {
    let game = new Game()
    let x = 0
    let y = 2
    let pos = Position.create(x, y)
    game.pieces[pos] = Piece.create(PieceType.Rook, Color.Black, 0)
    
    // console.log("\n" + game.toString())

    let moves = game.generateMoves(pos)
    for (let move of moves.map(Position.toObject))
        t.true(move.x === x || move.y === y)

    // console.log("\n" + game.toString(moves))

    t.pass()
})