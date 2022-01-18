import { Message, User } from "@prisma/client";
import { Request, Response } from "express";
import prisma from '../../prisma/client'

export async function getAllMessageThreads(req: Request, res: Response) {
    const messageThreads = await prisma.messageThread.findMany({
        include: {
            messages: {
                include: {
                    user: true
                }
            },
            users: true
        }
    });
    res.json(messageThreads)
}

// export async function addMessage(req: Request<{}, {}, { message: Message }>, res: Response) {
//     const { message } = req.body;

//     const newMessage = await prisma.message.create({
//         data: message
//     })

//     res.json(newMessage)
// }

export async function addMessage(message: Message) {

    const newMessage = await prisma.message.create({
        data: message,
        include: {
            user: true
        }
    })

    return newMessage
}

export async function createMessageThread(req: Request<{}, {}, { username: string, messageThreadName: string }>, res: Response) {
    const { messageThreadName, username } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    })

    if (!user) {
        return res
            .status(404)
            .json("User not found")
    }

    const newMessageThread = await prisma.messageThread.create({
        data: {
            name: messageThreadName,
            users: {
                connect: { id: user.id }
            }
        },
        include: {
            messages: {
                include: {
                    user: true
                }
            }
        }
    })

    res.json(newMessageThread)
}

export async function addParticipantsToMessageThreads(req: Request<{ messageThreadId: string }, {}, { participants: User[] }>, res: Response) {
    const { messageThreadId } = req.params;
    const { participants } = req.body

    const participantIds = participants.map(p => ({ id: p.id }))

    const messageThread = await prisma.messageThread.update({
        where: {
            id: +messageThreadId
        },
        data: {
            users: {
                connect: participantIds
            }
        },
        include: {
            users: true,
            messages: {
                include: {
                    user: true
                }
            }
        }
    })

    res.json(messageThread)
}
