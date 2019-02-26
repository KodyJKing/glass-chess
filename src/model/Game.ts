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

    doMove(store: Store, move: number) {
        let history = this.history.slice()
        history.push(move)
        store.patch(this.key, { history })
    }

    undoMove(store: Store) {
        let history = this.history.slice()
        history.pop()
        store.patch(this.key, { history })
    }

    get engine() {
        return Engine.fromHistory(this.history)
    }

}