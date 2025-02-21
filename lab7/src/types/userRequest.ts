import { Request } from 'express';
import { JwtPayload } from './jwtPayload.js';

export interface UserRequest extends Request {
    userData?: JwtPayload;
}
