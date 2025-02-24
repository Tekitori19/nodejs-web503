import { Response } from "express"
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import { UserRequest } from "../types/userRequest.js";
import bcrypt from "bcrypt";

class ProfileController {
    async update(req: UserRequest, res: Response): Promise<any> {
        const { avatar, description, name, oldPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ message: 'Không tìm thấy user' });

        // Cập nhật thông tin cơ bản
        user.avatar = avatar || user.avatar;
        user.description = description || user.description;
        user.name = name || user.name;

        // Kiểm tra và cập nhật mật khẩu
        if (newPassword) {
            if (!oldPassword) {
                return res.status(400).json({ message: 'Vui lòng nhập mật khẩu cũ để đổi mật khẩu mới' });
            }
            const isMatch = await bcrypt.compare(oldPassword, user.password); // So sánh mật khẩu cũ
            if (!isMatch) {
                return res.status(400).json({ message: 'Mật khẩu cũ không đúng' });
            }
            if (newPassword.length < 6) {
                return res.status(400).json({ message: 'Mật khẩu mới phải dài ít nhất 6 ký tự' });
            }
            user.password = await bcrypt.hash(newPassword, 10); // Hash mật khẩu mới
        }

        await user.save();
        res.json({ message: 'Cập nhật profile thành công', avatar: user.avatar, email: user.email, name: user.name });
    }

    async getById(req: UserRequest, res: Response): Promise<any> {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        const posts = await Post.find({ author: req.params.id })
            .populate('author', 'email avatar description name')
            .populate('comments.author', 'email name avatar');
        const commentedPosts = await Post.find({ 'comments.author': req.params.id })
            .populate('author', 'email avatar description name')
            .populate('comments.author', 'email name avatar');

        const comments = commentedPosts.flatMap(post =>
            post.comments
                .filter(cmt => cmt.author!._id.toString() === req.params.id)
                .map(cmt => ({ ...cmt.toObject(), postId: post._id, postTitle: post.title }))
        );

        res.json({
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            description: user.description,
            posts,
            comments
        });
    }

}

export default new ProfileController();
