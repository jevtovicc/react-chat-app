import { Request, Response } from "express";
import User from '../models/User'

const users: User[] = [
    {
        firstName: 'Filip',
        lastName: 'Jevtovic',
        username: 'jevtovic99',
        password: 'sifra123'
    },
    {
        firstName: 'Pera',
        lastName: 'Peric',
        username: 'pera123',
        password: 'pera123'
    }
]

export function login(req: Request<{}, {}, { username: string, password: string }>, res: Response) {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        res
            .status(401)
            .json({ message: "Invalid credentials" })
    } else {
        res
            .status(201)
            .json(user)
    }
}
