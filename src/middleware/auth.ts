import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    role: string;
}

declare module 'express' {
    interface Request {
        user?: UserPayload;
    }
}

export default function (req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'No token' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ msg: 'Invalid token' });
    }
}
