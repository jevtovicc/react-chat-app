import { Request, Response } from "express";
import prisma from '../../prisma/client'

export async function getAllUsers(_req: Request, res: Response) {
    const users = await prisma.user.findMany({
        include: {
            following: true,
            followedBy: true
        }
    })

    res.json(users)
}

export async function getUser(req: Request<{ userId: string }, {}, {}>, res: Response) {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
        where: {
            id: +userId
        },
        include: {
            following: true,
            followedBy: true
        }
    })

    res.json(user)
}
