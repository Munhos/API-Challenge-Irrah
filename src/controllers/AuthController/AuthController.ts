import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Client } from "../../models/ClientModel";

const SECRET_KEY = process.env.JWT_SECRET || "";

export class AuthController {
    async autorize(req: Request, res: Response) {
        const { cpf, cnpj } = req.body;

        const clientId = await Client.findOne({ where: { documentId: cpf || cnpj }})

        const payload = {
            id: clientId,
            cpf: cpf || null,
            cnpj: cnpj || null,
        };

        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });

        return res.json({
            id: clientId || null,
            cpf: cpf || null,
            cnpj: cnpj || null,
            token
        });
    }
}
