import { NextFunction, Request, Response } from "express";
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken'

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.sendStatus(403)
    }
    // TODO: move to .env
    const TOKEN_SECURITY = '123456';
    try {
        const user = jsonwebtoken.verify(token, TOKEN_SECURITY) as JwtPayload;
        res.locals.user = user;
        next()
    } catch (err) {
        res.sendStatus(403);
    }
}
