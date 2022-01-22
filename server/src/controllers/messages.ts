import { Message, MessageThread, User } from "@prisma/client";
import { Request, Response } from "express";
import prisma from '../../prisma/client'

export async function getAllMessageThreads(_req: Request, res: Response) {
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

export async function createMessageThread(req: Request<{}, {}, { messageThreadName: string, participants: User[] }>, res: Response) {
    const { messageThreadName, participants } = req.body;

    const user = res.locals.user as User & { messageThreads: MessageThread[] };

    if (user.messageThreads.findIndex(mt => mt.name === messageThreadName) !== -1) {
        return res
            .status(409)
            .json(`Group '${messageThreadName}' already exists. Please choose another name`)
    }

    const participantIds = participants.map(p => ({ id: p.id }))
    participantIds.push({ id: user.id });

    const messageThread = await prisma.messageThread.create({
        data: {
            name: messageThreadName,
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

export async function leaveMessageThread(req: Request<{ messageThreadId: string }, {}, {}>, res: Response) {
    const { messageThreadId } = req.params

    const user = res.locals.user as User;

    const messageThread = await prisma.messageThread.update({
        where: {
            id: +messageThreadId
        },
        data: {
            users: {
                disconnect: { id: user.id }
            }
        },
        include: {
            users: true
        }
    })

    if (messageThread.users.length === 0) {
        await prisma.messageThread.delete({
            where: {
                id: +messageThreadId
            }
        })
    }

    res.json(messageThread)
}
