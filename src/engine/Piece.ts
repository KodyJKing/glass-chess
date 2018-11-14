import struct from "./struct";
import { Type } from "./Type";
import { Color } from "./Color";
import { Bool } from "./Bool";
let s = struct([
    ["type", 3],
    ["color", 1],
    ["moved", 1]
]) as unknown
type PieceObject = { type: Type, color: Color, moved: Bool }
export default s as {
    get: {
        type(struct: number): Type,
        color(struct: number): Color,
        moved(struct: number): Bool
    },
    set: {
        type(struct: number, value: Type): number
        color(struct: number, value: Color): number,
        moved(struct: number, value: Bool): number,
    }
    create(type: Type, color: Color, moved: Bool): number,
    toObject(struct: number): PieceObject,
    fromObject(object: PieceObject): number
}