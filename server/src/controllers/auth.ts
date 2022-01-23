import { Request, Response } from "express";
import prisma from "../../prisma/client";
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

export async function login(req: Request<{}, {}, { username: string, password: string }>, res: Response) {
    const { username, password } = req.body;

    const _user = await prisma.user.findUnique({
        where: {
            username: username
        },
    })

    if (!_user || !(await bcrypt.compare(password, _user.password))) {
        return res.status(401).json("Username or Password are invalid. Please try again")
    }

    const user = await prisma.user.findUnique({
        where: {
            username: username
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            following: true,
            followedBy: true,
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
        },

    })

    if (!user) {
        res.status(401).json("Username or Password are invalid. Please try again")
    } else {
        const SECURITY_TOKEN = process.env.SECURITY_TOKEN;
        if (!SECURITY_TOKEN) {
            console.error('Security token not found in .env')
            return res.status(500).json('Error on server side occurred')
        }
        const token = jsonwebtoken.sign(user, SECURITY_TOKEN)
        res.json({
            accessToken: token,
            user: user
        })
    }
}

export async function signup(req: Request<{}, {}, { firstName: string, lastName: string, username: string, password: string }>, res: Response) {
    const { firstName, lastName, username, password } = req.body;

    try {
        const salt = (await bcrypt.genSalt(10)).toString();
        const hashedPassword = (await bcrypt.hash(password, salt)).toString();

        const user = await prisma.user.create({
            data: { firstName, lastName, username, password: hashedPassword },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                following: true,
                followedBy: true,
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
            },
        });

        const SECURITY_TOKEN = process.env.SECURITY_TOKEN;

        if (!SECURITY_TOKEN) {
            console.error('Security token not found in .env')
            return res.status(500).json('Error on server side occurred')
        }

        const token = jsonwebtoken.sign(user, SECURITY_TOKEN)
        res.status(201).json({
            accessToken: token,
            user: user
        })

    } catch (e) {
        console.error(e)
        res.status(409).json(`Username '${username}' is already taken. Please choose another one`)
    }

}
