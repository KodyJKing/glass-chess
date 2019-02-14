import test from "ava"
import { Engine } from "./Engine";
import Position from "./Position";
import Piece from "./Piece";
import { Type } from "./Type";
import { Color } from "./Color";
import search from "./search";

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
    let engine = Engine.parseBoard(board)
    t.true(Engine.compareBoards(board, engine.prettyString()))
    t.pass()
})

test("generateMoves_Rook", t => {
    let engine = new Engine().standardSetup()
    let pos = Position.create(0, 2)
    engine.pieces[pos] = Piece.create(Type.Rook, Color.Black, 0)

    let expected = `
        r n b q k b n r
        p p p p p p p p
        r # # # # # # #
        # . . . . . . .
        # . . . . . . .
        # . . . . . . .
        # P P P P P P P
        R N B Q K B N R`

    // console.log("\n" + engine.toString())
    let moves = engine.generateMovesAt(pos)
    let actual = engine.prettyString(moves)
    t.true(Engine.compareBoards(expected, actual))
    // console.log("\n" + actual)
})

test("generateMoves_Pawn", t => {
    let engine = new Engine().standardSetup()
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

    // console.log("\n" + engine.toString())
    let moves = engine.generateMovesAt(pos)
    let actual = engine.prettyString(moves)
    t.true(Engine.compareBoards(expected, actual))
    // console.log("\n" + actual)
})


test("generateMoves_Knight", t => {
    let engine = new Engine()
    let pos = Position.create(3, 3)
    engine.pieces[pos] = Piece.create(Type.Knight, Color.Black, 0)

    let expected = `
         . . . . . . . .
         . . # . # . . .
         . # . . . # . .
         . . . n . . . .
         . # . . . # . .
         . . # . # . . .
         . . . . . . . .
         . . . . . . . .`

    // console.log("\n" + engine.toString())
    let moves = engine.generateMovesAt(pos)
    let actual = engine.prettyString(moves)
    t.true(Engine.compareBoards(expected, actual))
    // console.log("\n" + actual)
})


test("isSafe", t => {
    let engine = new Engine()
    let pos = Position.create(3, 3)
    engine.pieces[pos] = Piece.create(Type.Knight, Color.Black, 0)

    // console.log("\n" + engine.toString())
    t.true(engine.isSafe(pos, Color.Black))
    engine.pieces[Position.create(3, 0)] = Piece.create(Type.Queen, Color.White, 0)
    // console.log("\n" + engine.toString())
    t.false(engine.isSafe(pos, Color.Black))
})

// Previously, alphabeta would ony accept moves which were an improvment when searching a node.
// This made it impossible to pick a move ending in a checkmate in a doomed match.
// Making alpha beta accept any move when it's best move is null fixed this.
test("finishDoomedGame", t => {
    let engine = Engine.fromString("ത̜೫š๪ࡪ౪çථৌྭ̚ઢژຳبଡ଼Ζ܍č໭ู͎˓๩਩಩R෧ң୥ࣲ༴ಣബࣲ଴ಣ഼ࣲ༻ಣয়ƕߖ¦໺ࣩາ੣ಪϗ࿗ࣔ६Ն׏Ǐ֏Ώ൭ϖ୦཯ʚঞԣ௝֎஦ńଯࣝঝə࢙ӛޖƕ೗Άמۣળڢޕࢪೲ")
    t.not(search(engine), null)
    t.pass()
})

test("searchPerformance", t => {
    let engine = new Engine().standardSetup()
    t.not(search(engine), null)
    t.pass()
})

// test("moveGenPerformance", t => {
//     let engine = new Game().standardSetup()
//     let pos = Position.create(0, 2)
//     engine.pieces[pos] = Piece.create(Type.Rook, Color.Black, 0)

//     // console.log("\n" + engine.toString())
//     let moves = engine.generateMovesAt(pos)
//     console.time("moveGen")
//     for (let i = 0; i < 10000; i++)
//         engine.generateMovesAt(pos)
//     console.timeEnd("moveGen")

//     t.pass()
// })