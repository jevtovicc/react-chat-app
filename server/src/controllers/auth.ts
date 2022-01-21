import { Request, Response } from "express";
import prisma from "../../prisma/client";
import jsonwebtoken from 'jsonwebtoken';

export async function login(req: Request<{}, {}, { username: string, password: string }>, res: Response) {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            username: username
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
                    },
                    users: true
                }
            }
        }
    })

    if (!user || user.password !== password) {
        res
            .status(401)
            .json("Username or Password are invalid. Please try again")
    } else {
        // TODO: move to .env
        const TOKEN_SECURITY = '123456';
        const token = jsonwebtoken.sign(user, TOKEN_SECURITY)
        res
            .header('accessToken', token)
            .json(user)
    }
}

export async function signup(req: Request<{}, {}, { firstName: string, lastName: string, username: string, password: string }>, res: Response) {
    const { firstName, lastName, username, password } = req.body;

    try {
        const user = await prisma.user.create({
            data: { firstName, lastName, username, password }
        });

        res
            .status(201)
            .json(user)
    } catch (e) {
        console.error(e)
        res
            .status(409)
            .json(`Username '${username}' is already taken. Please choose another one`)
    }

}
