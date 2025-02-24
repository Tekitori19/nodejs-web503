import { Request, Response } from "express"
import User from "../models/user.model.js";

class UserController {
    async index(req: Request, res: Response) {
        const users = await User.find({}, 'email avatar description name');
        res.json(users);
    }
}

export default new UserController();
