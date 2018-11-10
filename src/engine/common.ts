import { Color } from "./Color";
import Piece from "./Piece";

const pieceToCharStr = ".pnbrqk"
export function pieceToChar(piece: number) {
    let char = pieceToCharStr[Piece.get.type(piece)]
    return Piece.get.color(piece) === Color.Black ? char : char.toUpperCase()
}

export function charToPiece(char: string) {
    let type = pieceToCharStr.indexOf(char.toLowerCase())
    let color = (char === char.toLowerCase()) ? Color.Black : Color.White
    return Piece.create(type, color, 0)
}

export default {pieceToChar, charToPiece}