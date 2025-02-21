import express from "express"
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

class UserController {
    async login(req: express.Request, res: express.Response) {
        try {
            const user = await UserModel.findOne({ email: req.body.email })
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed no such user"
                })
            }
            const fetchedUser = user;
            const result = bcrypt.compare(req.body.password, user.password);
            if (!result) {
                return res.status(401).json({
                    message: "Auth failed inccorect password"
                })
            }
            const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser._id },
                process.env.JWT_SECRET as string,
                { expiresIn: "1h" }
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: fetchedUser._id
            });

        } catch (error) {
            console.log(error)
        }
    }

    async signUp(req: express.Request, res: express.Response) {
        bcrypt.hash(req.body.password, 10).then(hash => {
            const user = new UserModel({
                email: req.body.email,
                password: hash
            });

            UserModel.findOne({ email: req.body.email }).then(user1 => {
                if (user1) {
                    return res.status(401).json({
                        message: "User Already Exist"
                    })
                }

                user.save().then(result => {
                    if (!result) {
                        return res.status(500).json({
                            message: "Error Creating USer"
                        })
                    }
                    res.status(201).json({
                        message: "User created!",
                        result: result
                    });
                })
            })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        })
    }

    async logout(req: express.Request, res: express.Response) {
        try {
            res.clearCookie("token");
            res.status(200).json({ success: true, message: "Logged out" });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: "Something went wrong" });
        }
    }
}

export default new UserController();
