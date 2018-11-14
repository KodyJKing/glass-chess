import struct from "./struct";
let s = struct([
    ["x", 3],
    ["y", 3]
]) as unknown
type PositionObject = {x: number, y: number}
export default s as {
    get: {
        x(struct: number): number,
        y(struct: number): number,
    },
    set: {
        x(struct: number, value: number): number,
        y(struct: number, value: number): number
    }
    create(x: number, y: number): number,
    toObject(struct: number): PositionObject,
    fromObject(object: PositionObject): number
}