import { Request, Response } from "express";
import { IdentityRequest } from "../../server/IdentityProvider";
export declare function foo(req: Request, res: Response): void;
export declare function bar(req: Request, res: Response): void;
export default function (req: IdentityRequest, res: Response): void;
