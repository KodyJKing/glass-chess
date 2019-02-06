import bitfield from "./bitfield";
import { Type } from "./Type";
import { Color } from "./Color";
import { Bool } from "./Bool";
let s = bitfield([
    ["type", 3],
    ["color", 1],
    ["moved", 1]
]) as unknown
type PieceObject = { type: Type, color: Color, moved: Bool }
export default s as {
    get: {
        type(bitfield: number): Type,
        color(bitfield: number): Color,
        moved(bitfield: number): Bool
    },
    set: {
        type(bitfield: number, value: Type): number
        color(bitfield: number, value: Color): number,
        moved(bitfield: number, value: Bool): number,
    }
    create(type: Type, color: Color, moved: Bool): number,
    toObject(bitfield: number): PieceObject,
    fromObject(object: PieceObject): number
}