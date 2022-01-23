import { MessageThread, User } from "@prisma/client";
import { Request, Response } from "express";
import prisma from '../../prisma/client'

export async function getAllUsers(_req: Request, res: Response) {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            following: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    username: true,
                }
            },
            followedBy: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    username: true,
                }
            },
            messageThreads: {
                include: {
                    messages: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    firstName: true,
                                    lastName: true,
                                    username: true,
                                }
                            }
                        }
                    },
                    users: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            username: true,
                        }
                    }
                }
            }
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
        select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            following: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    username: true,
                }
            },
            followedBy: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    username: true,
                }
            },
            messageThreads: {
                include: {
                    messages: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    firstName: true,
                                    lastName: true,
                                    username: true,
                                }
                            }
                        }
                    },
                    users: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            username: true,
                        }
                    }
                }
            }
        }
    })

    res.json(user)
}

export async function findUserByUsername(req: Request<{}, {}, {}, { username: string }>, res: Response) {
    const { username } = req.query;

    const user = await prisma.user.findUnique({
        where: {
            username: username
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
        }
    })

    if (!user) {
        res
            .status(404)
            .json(`User '${username}' not found`)
    } else {
        res.json(user)
    }

}

export async function sendFriendRequest(req: Request<{}, {}, { friendUsername: string }>, res: Response) {
    const { friendUsername } = req.body;

    const user = res.locals.user as User & { messageThreads: MessageThread[] };

    try {
        const friend = await prisma.user.update({
            where: {
                username: friendUsername
            },
            data: {
                following: {
                    connect: { id: user.id },
                },
                followedBy: {
                    connect: { id: user.id },
                }
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
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
