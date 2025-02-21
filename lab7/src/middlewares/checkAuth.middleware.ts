import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRequest } from '../types/userRequest.js';
import { JwtPayload } from '../types/jwtPayload.js';

const authMiddleware = (req: UserRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ message: 'Authorization header is missing' });
        return
    }

    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.userData = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
        return
    }
};

export default authMiddleware;
