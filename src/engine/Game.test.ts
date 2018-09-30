import test from "ava"
import { Game } from "./Game";
import Position from "./Position";
import Piece from "./Piece";
import { Type } from "./Type";
import { Color } from "./Color";

function compareBoards(a: string, b: string) {
    let format = (x) => (
        x.split("\n")
        .filter( (x) => x.length > 0 )
        .map( (x) => x.trim() )
    ).join("\n")
    return format(a) === format(b)
}

test("parseBoard", t => {
    let board = `
        r n b q k b n r
        p p p p p p p p
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
        P P P P P P P P
        R N B Q K B N R`
    let game = Game.parseBoard(board)
    t.true(compareBoards(board, game.toString()))
    t.pass()
})

test("generateMoves_Rook", t => {
    let game = new Game().standardSetup()
    let x = 0
    let y = 2
    let pos = Position.create(x, y)
    game.pieces[pos] = Piece.create(Type.Rook, Color.Black, 0)

    let expected = `
        r n b q k b n r
        p p p p p p p p
        r # # # # # # #
        # . . . . . . .
        # . . . . . . .
        # . . . . . . .
        # P P P P P P P
        R N B Q K B N R`

    // console.log("\n" + game.toString())
    let moves = game.generateMovesAt(pos)
    let actual = game.toString(moves)
    t.true(compareBoards(expected, actual))
    // console.log("\n" + actual)
})

test("generateMoves_Pawn", t => {
    let game = new Game().standardSetup()
    let pos = Position.create(0, 1)

    let expected = `
        r n b q k b n r
        p p p p p p p p
        # . . . . . . .
        # . . . . . . .
        . . . . . . . .
        . . . . . . . .
        P P P P P P P P
        R N B Q K B N R`

    // console.log("\n" + game.toString())
    let moves = game.generateMovesAt(pos)
    let actual = game.toString(moves)
    t.true(compareBoards(expected, actual))
    // console.log("\n" + actual)
})


test("generateMoves_Knight", t => {
    let game = new Game()
    let pos = Position.create(3, 3)
    game.pieces[pos] = Piece.create(Type.Knight, Color.Black, 0)

    let expected = `
         . . . . . . . . 
         . . # . # . . .
         . # . . . # . .
         . . . n . . . .
         . # . . . # . .
         . . # . # . . .
         . . . . . . . .
         . . . . . . . .`

    // console.log("\n" + game.toString())
    let moves = game.generateMovesAt(pos)
    let actual = game.toString(moves)
    t.true(compareBoards(expected, actual))
    // console.log("\n" + actual)
})