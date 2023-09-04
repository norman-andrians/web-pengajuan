import { Response } from "express";

export default class {
    public res: Response;

    constructor (res: Response) {
        this.res = res;
    }

    public static theObject (res: Response, msg: string) {
        return {
            status: res.statusCode,
            type: res.statusMessage,
            msg
        }
    }
    public send (status: number, msg: string) {
        this.res
            .status(status)
            .json({
                status,
                reason: this.res.statusMessage,
                message: msg
            })
            .end();
    }
}