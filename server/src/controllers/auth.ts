import { Request, Response } from "express";
import prisma from "../../prisma/client";

export async function login(req: Request<{}, {}, { username: string, password: string }>, res: Response) {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            username: username,
        }
    });

    if (!user || user.password !== password) {
        res
            .status(401)
            .json({ message: "Invalid credentials" })
    } else {
        res
            .status(201)
            .json(user)
    }
}
