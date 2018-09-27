type Properties = [string, number, number][]

const mask = (width: number) => (1 << width) - 1

function propertiesWithShift(properties: [string, number][]) {
    let shift = 0
    let result: Properties = []
    for (let [name, width] of properties) {
        result.push([name, width, shift])
        shift += width
    }
    return result
}

function fromArguments(properties: Properties) {
    let names = properties.map( (component) => component[0] )
    let parts = properties.map( ([name, width, shift]) => `(${name} << ${shift})` )
    let result = new Function(...names, "return " + parts.join(" | "))
    return result as (...args: number[]) => number
}

function toObject(properties: Properties) {
    let parts = properties.map( ([name, width, shift]) => `${name}: (struct >> ${shift}) & ${mask(width)}` )
    let result = new Function("struct", `return { ${parts.join(" , ")} }`)
    return result as (struct: number) => { [name: string]: number }
}

function fromObject(properties: Properties) {
    let parts = properties.map( ([name, width, shift]) => `(object.${name} << ${shift})` )
    let result = new Function("object", "return " + parts.join(" | "))
    return result as (object: { [name: string]: number }) => number
}

export default function struct(properties: [string, number][]) {
    let bitCount = properties.map( (component) => component[1] ).reduce( (x, y) => x + y )
    if (bitCount > 32)
        throw new Error("Components don't fit 32 bit number.")

    let _properties = propertiesWithShift(properties)

    let get: { [name: string]: (struct: number) => number } = {}
    let set: { [name: string]: (struct: number, value: number) => number }  = {}

    for (let [name, width, shift] of _properties) {
        let getMask = mask(width)
        get[name] = (struct: number) => (struct >> shift) & getMask

        let setMask = ~(getMask << shift) // Used to clear components bits.
        set[name] = (struct: number, value: number) => (struct & setMask) | (value << shift)
    }

    return { create: fromArguments(_properties), toObject: toObject(_properties), fromObject: fromObject(_properties), get, set }
}