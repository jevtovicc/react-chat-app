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
            followedBy: true,
            messageThreads: {
                include: {
                    messages: {
                        include: {
                            user: true
                        }
                    }
                }
            }
        }
    })

    res.json(user)
}

export async function sendFriendRequest(req: Request<{}, {}, { senderUsername: string, friendUsername: string }>, res: Response) {
    const { senderUsername, friendUsername } = req.body;

    try {
        const sender = await prisma.user.findUnique({
            where: {
                username: senderUsername
            }
        })

        if (!sender) {
            return res
                .status(404)
                .json(`User ${sender} not found`)
        }

        const friend = await prisma.user.update({
            where: {
                username: friendUsername
            },
            data: {
                following: {
                    connect: { id: sender!.id },
                },
                followedBy: {
                    connect: { id: sender!.id },
                }
            }
        })

        res.json(friend)
    } catch (e) {
        console.error(e)
        res
            .status(404)
            .json(`User ${friendUsername} not found`)
    }
}
