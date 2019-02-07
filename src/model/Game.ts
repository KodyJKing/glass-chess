import Key, { ModelKey } from "@krisnye/glass-platform/data/Key"
import Model from "@krisnye/glass-platform/data/Model"
import Entity from "@krisnye/glass-platform/data/Entity"

@Model.class()
export default class Game extends Entity {

    static readonly store = "server"

    key!: ModelKey<Game>

    @Model.property({
        type: "array",
        items: {
            type: "number"
        }
    })
    history!: number[]

}