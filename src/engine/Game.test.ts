import test from "ava"
import { Game } from "./Game";

test("game", t => {
    let game = new Game()
    let str = game.toString()
    // console.log("\n" + str)
    t.pass()
})