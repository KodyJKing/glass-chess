import { Request, Response } from "express";
import search from "../../engine/search";
import { Engine } from "../../engine/Engine";
import { parallelSearch } from "../../engine/parallelSearch";

export default async function (req: Request, res: Response) {
    let { position } = req.body
    let engine = Engine.fromString(position)
    // let move = search(engine, { depth: 6 })
    let move = await parallelSearch(position)
    res.type("text/json").send(JSON.stringify(move))
}