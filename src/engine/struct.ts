type Template = [string, number][]
type Constructor = (...args: number[]) => number
type ToObject = (struct: number) => { [name: string]: number }
type Getter = (struct: number) => number
type Setter = (struct: number, value: number) => number
type StructAccessor = { create: Constructor, toObject: ToObject, get: { [name: string]: Getter }, set: { [name: string]: Setter } }

const mask = (width: number) => (1 << width) - 1

function createConstructor(template: Template): Constructor {
    let widths = template.map( (component) => component[1] )
    let count = template.length
    return function(...args: number[]) {
        let value = args[count - 1]
        for (let i = count - 2; i >= 0; i--) 
            value = (value << widths[i]) | args[i]
        return value
    }
}

// This can be slower because it's only for high level APIs.
function createToObject(template: Template): ToObject {
    return function (struct: number) {
        let result = {}
        for (let component of template) {
            let [name, width] = component
            result[name] = struct & mask(width)
            struct >>= width
        }
        return result
    }
}

export default function struct(template: Template): StructAccessor {
    let bitCount = template.map( (component) => component[1] ).reduce( (x, y) => x + y )
    if (bitCount > 32)
        throw new Error("Components don't fit 32 bit number.")

    let result = { create: createConstructor(template), toObject: createToObject(template), get: {}, set: {} }

    let netShift = 0
    for (let component of template) {
        let [name, width] = component;

        ((shift: number) => { // Have to use an iffy to freeze the value of shift in the closure.
            let getMask = mask(width)
            result.get[name] = (struct: number) => (struct >> shift) & getMask

            let setMask = ~(getMask << shift) // Used to clear components bits.
            result.set[name] = (struct: number, value: number) => (struct & setMask) | (value << shift)
        })(netShift)

        netShift += width
    }

    return result
}