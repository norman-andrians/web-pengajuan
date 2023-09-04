import { Router, Request, Response, NextFunction } from "express";
import ErrorSend from "../helpers/errorsend";
import { User } from "../db";

export const isLogin = async (req: Request, res: Response, next: NextFunction) => {
    const errorsend = new ErrorSend(res);
    const { user_token } = req.cookies;

    if (!user_token) {
        return errorsend.send(401, "there's no session token");
    }

    try {
        const user = await User.getBySessionToken(user_token);

        if (!user || user.token !== user_token) {
            return errorsend.send(401, "invalid session token");
        }
        
        next();
    }
    catch (error) {
        console.error(error);
        console.error("Authoritation user failed");
        return res.sendStatus(400);
    }
}