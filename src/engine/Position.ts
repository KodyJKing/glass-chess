import bitfield from "./bitfield";
let s = bitfield([
    ["x", 3],
    ["y", 3]
]) as unknown
type PositionObject = {x: number, y: number}
export default s as {
    get: {
        x(bitfield: number): number,
        y(bitfield: number): number,
    },
    set: {
        x(bitfield: number, value: number): number,
        y(bitfield: number, value: number): number
    }
    create(x: number, y: number): number,
    toObject(bitfield: number): PositionObject,
    fromObject(object: PositionObject): number
}