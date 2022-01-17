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
