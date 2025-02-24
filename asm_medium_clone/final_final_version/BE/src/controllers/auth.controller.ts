import { Request, Response } from "express";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class AuthController {
    async register(req: Request, res: Response): Promise<any> {
        const { email, password, name, avatar, description } = req.body;
        if (!email || !password || password.length < 6 || !email.includes('@')) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không hợp lệ' });
        }
        try {
            const hashedPassword = await bcrypt.hash(password, 10); // Hash mật khẩu
            const user = new User({
                email,
                password: hashedPassword,
                name: name || email,
                avatar: avatar || 'https://via.placeholder.com/150',
                description: description || 'Chưa có mô tả'
            });
            await user.save();
            res.status(201).json({ message: 'Đăng ký thành công' });
        } catch (err) {
            res.status(400).json({ message: 'Email đã tồn tại' });
        }
    }

    async login(req: Request, res: Response): Promise<any> {

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Sai email hoặc mật kh��u' });

        const isMatch = await bcrypt.compare(password, user.password); // So sánh mật khẩu
        if (!isMatch) return res.status(400).json({ message: 'Sai email hoặc mật khẩu' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
        res.json({ token, userId: user._id, avatar: user.avatar, email: user.email, name: user.name });

    }

    async logout(req: Request, res: Response) {
        try {
            res.clearCookie("token");
            res.status(200).json({ success: true, message: "Logged out" });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: "Something went wrong" });
        }
    }
}

export default new AuthController();
