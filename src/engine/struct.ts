type Properties = [string, number][]
type Getters = { [name: string]: (struct: number) => number }
type Setters = { [name: string]: (struct: number, value: number) => number }

const mask = (width: number) => (1 << width) - 1

function createConstructor(properties: Properties) {
    let names = properties.map( (component) => component[0] )
    let components: string[] = []
    let shift = 0
    for (let component of properties) {
        let [name, width] = component
        components.push( `(${name} << ${shift})` )
        shift += width
    }
    let result = new Function(...names, "return " + components.join(" | "))
    return result as (...args: number[]) => number
}

function createToObject(properties: Properties) {
    let components: string[] = []
    let shift = 0
    for (let component of properties) {
        let [name, width] = component
        components.push(`${name}: (struct >> ${shift}) & ${mask(width)}`)
        shift += width
    }
    let result = new Function("struct", `return { ${components.join(" , ")} }`)
    return result as (struct: number) => { [name: string]: number }
}

function createFromObject(properties: Properties) {
    let components: string[] = []
    let shift = 0
    for (let component of properties) {
        let [name, width] = component
        components.push(`(object.${name} << ${shift})`)
        shift += width
    }
    let result = new Function("object", "return " + components.join(" | "))
    return result as (object: { [name: string]: number }) => number
}

export default function struct(properties: Properties) {
    let bitCount = properties.map( (component) => component[1] ).reduce( (x, y) => x + y )
    if (bitCount > 32)
        throw new Error("Components don't fit 32 bit number.")

    let get: Getters = {}
    let set: Setters  = {}

    let netShift = 0
    for (let component of properties) {
        let [name, width] = component;

        ((shift: number) => { // Have to use an iffy to freeze the value of shift in the closure.
            let getMask = mask(width)
            get[name] = (struct: number) => (struct >> shift) & getMask

            let setMask = ~(getMask << shift) // Used to clear components bits.
            set[name] = (struct: number, value: number) => (struct & setMask) | (value << shift)
        })(netShift)

        netShift += width
    }

    return { create: createConstructor(properties), toObject: createToObject(properties), fromObject: createFromObject(properties), get, set }
}