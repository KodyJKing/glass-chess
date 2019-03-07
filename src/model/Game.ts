import Key, { ModelKey } from "@krisnye/glass-platform/data/Key"
import Model from "@krisnye/glass-platform/data/Model"
import Entity from "@krisnye/glass-platform/data/Entity"
import { Engine } from "../engine/Engine";
import Store from "@krisnye/glass-platform/data/Store";

@Model.class()
export default class Game extends Entity {

    static readonly store = "server"

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

    doMove(store: Store, move: number) {
        let history = this.history.slice()
        history.push(move)
        store.patch(this.key, { history, undos: [] })
    }

    undoMove(store: Store) {
        let history = this.history.slice()
        let undos = this.undos.slice()
        let undo = history.pop()
        if (undo != null)
            undos.push(undo)
        store.patch(this.key, { history, undos })
    }

    redoMove(store: Store) {
        let history = this.history.slice()
        let undos = this.undos.slice()
        let redo = undos.pop()
        if (redo != null)
            history.push(redo)
        store.patch(this.key, { history, undos })
    }

    get engine() {
        return Engine.fromHistory(this.history)
    }

}