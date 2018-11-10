import Context from "glass/html/Context"
import Stylesheets from "glass/html/Stylesheets"
import Page from "glass/html/Page"
import Key, { ModelKey } from "glass/data/Key"
import Model from "glass/data/Model"
import SignupForm from "glass/html/components/SignupForm"
import { Game } from "../engine/Game";
import Position from "../engine/Position";
import { pieceToChar } from "../engine/common";
import pieces from "./pieces";
import Piece from "../engine/Piece";
import { Type } from "../engine/Type";
import { Color } from "../engine/Color";

const game = new Game().standardSetup()

class SignupPage extends Page {
    render(c: Context) {
        // c.render(SignupForm, "/api/signup")

        let { state, render, localize, text, begin, end, empty, html: { div, img, form, label, span, input, h1 } } = c

        const WIDTH = 800
        const SQUARE_WIDTH = WIDTH / 8

        const WHITE = "darkseagreen"
        const BLACK = "seagreen"

        div({
            style: `
                position: relative;
                width: 800px;
                height: ${WIDTH}px;
                background-color: red
            `
        })
            for (let x = 0; x < 8; x++) {
                for (let y = 0; y < 8; y++) {
                    let color = (x + y) % 2 == 0 ? WHITE : BLACK
                    div({
                        style: `
                            position: absolute;
                            width: ${SQUARE_WIDTH};
                            height: ${SQUARE_WIDTH};
                            left: ${x * SQUARE_WIDTH};
                            top: ${y * SQUARE_WIDTH};
                            background-color: ${color};
                            display: flex;
                        `
                    })
                        let pos = Position.create(x, y);
                        let piece = Piece.toObject(game.pieces[pos])
                        if (piece.type != Type.Empty) {
                            let colorName = Color[piece.color]
                            let typeName = Type[piece.type]
                            let pieceName = colorName.toLowerCase() + typeName
                            img({ src: pieces[pieceName], style: "flex-grow: 1" })
                            end()
                        }

                    end()
                }
            }
        end()
    }
}

SignupPage.show()