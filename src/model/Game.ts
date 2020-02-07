import Key, { ModelKey } from "@glas/platform/data/Key"
import Model from "@glas/platform/data/Model"
import Entity from "@glas/platform/data/Entity"
import { Engine } from "../engine/Engine";
import Store from "@glas/platform/data/Store";

@Model.class()
export default class Game extends Entity {

    // static readonly store = "server"
    static readonly store = "local"

    key!: ModelKey<Game>

    @Model.property({
        type: "array",
        items: {
            type: "number"
        },
        default: []
    })
    history!: number[]

    @Model.property({
        type: "array",
        items: {
            type: "number"
        },
        default: []
    })
    undos!: number[]

    doMove(move: number) {
        let history = this.history.slice()
        history.push(move)
        Store.default.patch(this.key, { history, undos: [] })
    }

    undoMove() {
        let history = this.history.slice()
        let undos = this.undos.slice()
        let undo = history.pop()
        if (undo != null)
            undos.push(undo)
        Store.default.patch(this.key, { history, undos })
    }

    redoMove() {
        let history = this.history.slice()
        let undos = this.undos.slice()
        let redo = undos.pop()
        if (redo != null)
            history.push(redo)
        Store.default.patch(this.key, { history, undos })
    }

    get engine() {
        return Engine.fromHistory(this.history)
    }

}