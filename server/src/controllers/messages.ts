import { Message } from "@prisma/client";
import { Request, Response } from "express";
import prisma from '../../prisma/client'

export async function getAllMessageThreads(req: Request, res: Response) {
    const messageThreads = await prisma.messageThread.findMany({
        include: {
            messages: {
                include: {
                    user: true
                }
            }
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
