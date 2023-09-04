import { Router, Request, Response } from "express";
import ErrorSend from "../helpers/errorsend";
import { Keluhan } from "../db";

const kel = async (req: Request, res: Response) => {
    const errorsend = new ErrorSend(res);

    const { name, telepon, keluhan } = req.body;
    const { subjek, pesan } = keluhan;

    if (!name || !keluhan)
        return errorsend.send(400, "nama, nomor telepon dan keluhan wajib diisi");

    if (!subjek || !pesan)
        return errorsend.send(400, "berikan subjek dan pesan");

    try {
        const keluh = await Keluhan.create({ name, telepon, keluhan });

        res.status(201).json(keluh).end();
    }
    catch (error) {
        console.error(error);
        console.error("Gagal menambahkan keluhan");
        return res.sendStatus(400);
    }
}

export default (router: Router) => {
    router.post("/keluhan", kel);
}