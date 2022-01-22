import { NextFunction, Request, Response } from "express";
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.sendStatus(403)
    }
    const SECURITY_TOKEN = process.env.SECURITY_TOKEN;
    if (!SECURITY_TOKEN) {
        console.error('Security token not found in .env')
        return res.status(500).json('Error on server side occurred')
    }
    try {
        const user = jsonwebtoken.verify(token, SECURITY_TOKEN) as JwtPayload;
        res.locals.user = user;
        next()
    } catch (err) {
        res.sendStatus(403);
    }
}
