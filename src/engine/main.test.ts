import test from "ava"
import { Game } from "./Game";

test("game", t => {
    let game = new Game()
    console.log("\n" + game.toString())
    t.pass()
})