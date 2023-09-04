import { Router } from "express";
import { isLogin } from "../middleware";
import auth from "./auth";
import keluh from "./keluh";

const router = Router();

export default (): Router => {
    auth(router);
    keluh(router);
    return router;
};