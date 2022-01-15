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

export async function addMessage(message: Message) {
    await prisma.messageThread.update({
        where: {
            id: message.messageThreadId
        },
        data: {
            // TODO: FIX FIX FIX
            name: 'Some other thread name'
        }
    })
}
