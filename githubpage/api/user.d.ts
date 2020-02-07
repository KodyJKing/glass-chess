import { Request, Response } from "express";
import Patch from "../../data/Patch";
import { LoginFormModel, LoginFormState } from "../../ui/html/components/Login/LoginForm";
import { SignupFormState, SignupFormModel } from "../../ui/html/components/Login/SignupForm";
export declare function login(state: LoginFormModel): Promise<Patch<LoginFormState>>;
/**
 * Returns true if a User with this email exists, false otherwise.
 */
export declare function exists(email: string): Promise<boolean>;
export declare function signup(user: SignupFormModel, req: Request, res: Response): Promise<Patch<SignupFormState>>;
export declare function verifyEmail(req: Request, res: Response): Promise<Response | undefined>;
export declare function verifyMobile(req: Request, res: Response): Promise<Response | undefined>;
