import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRequest } from '../types/userRequest.js';
import { JwtPayload } from '../types/jwtPayload.js';

const auth = (req: UserRequest, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization'] as string | undefined;
    if (!token) {
        res.status(401).json({ message: 'Chưa đăng nhập' })
        return;
    };
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token không hợp lệ' });
        return;
    }
};

export default auth;
