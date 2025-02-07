import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';

export interface AuthRequest extends Request {
    userId?: string;
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, config.JWT_SECRET) as { id: string };
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Please authenticate' });
    }
};
