import { Request, Response } from "express";
import Entity from "../../data/Entity";
import Patch from "../../data/Patch";
declare type Batch = {
    [key: string]: Patch<Entity>;
};
export declare function create(batch: Batch): Promise<void>;
export declare function set(batch: Batch): Promise<any>;
export declare function patch(batch: Batch): Promise<any>;
export declare function get(keyStrings: Array<string | string[]>): Promise<Entity[][]>;
export declare function query(req: Request, res: Response & {
    flush: any;
}): (Response & {
    flush: any;
}) | undefined;
export default function (req: Request, res: Response): Promise<void>;
export {};
