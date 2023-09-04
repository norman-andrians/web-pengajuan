import { Router, Request, Response } from "express";
import validator from "validator";
import { User } from "../db";
import { comparePassword, generateToken, hashPassword } from "../helpers/crypt";
import ErrorSend from "../helpers/errorsend";

const register = async (req: Request, res: Response) => {
    const errorsend = new ErrorSend(res);
    const { email, password } = req.body;

    if (!email || !password)
        return errorsend.send(400, "email and password required!");

    // if (!validator.isEmail(email))
    //     return errorsend.send(400, "invalid email format");
    
    try {
        const userExist = await User.getByEmail(email);
    
        if (userExist) {
            return errorsend.send(400, "email and password already exist!");
        }
    
        const hash = await hashPassword(password);
        const user = await User.create({ email, password: hash, token: null });

        res.status(201).json(user).end();
        
    }
    catch (error) {
        console.error(error);
        console.error("Adding user failed");
        return res.sendStatus(400);
    }
}

const login = async (req: Request, res: Response) => {
    const errorsend = new ErrorSend(res);
    const { email, password } = req.body;

    if (!email || !password) 
        return errorsend.send(400, "email and password required!");

    // if (!validator.isEmail(email))
    //     return errorsend.send(400, "invalid email format");

    try {
        const user = await User.getByEmail(email);
    
        if (!user) {
            return errorsend.send(400, "user not found!");
        }

        const passwordCorrect = await comparePassword(password, user.password);

        if (!passwordCorrect) {
            return errorsend.send(403, "wrong password");
        }

        const token = generateToken();

        user.token = token;
        await user.save();
    
        res.cookie("user_token", token, {
            expires: new Date(Date.now() + (3600000 * 2))
        });
        res.status(200).json(user).end();
    }
    catch (error) {
        console.error(error);
        console.error("Login user failed");
        return res.sendStatus(400);
    }
}

export default (router: Router) => {
    router.post('/user/register', register);
    router.patch('/user/login', login);
}