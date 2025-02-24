import { Response } from "express"
import Post from "../models/post.model.js";
import { UserRequest } from "../types/userRequest.js";

class PostController {
    async create(req: UserRequest, res: Response): Promise<any> {
        const { title, content } = req.body;
        if (!title || !content) return res.status(400).json({ message: 'Thiếu tiêu đề hoặc nội dung' });
        const post = new Post({ title, content, author: req.user.id });
        await post.save();
        res.json({ message: 'Đăng bài thành công' });
    }

    async updateById(req: UserRequest, res: Response): Promise<any> {
        const { title, content } = req.body;
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
        if (post.author!.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Không có quyền cập nhật' });
        }
        post.title = title || post.title;
        post.content = content || post.content;
        await post.save();
        res.json({ message: 'Cập nhật bài viết thành công' });
    }

    async deleteById(req: UserRequest, res: Response): Promise<any> {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
        if (post.author!.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Không có quyền xóa' });
        }
        await Post.deleteOne({ _id: req.params.id });
        res.json({ message: 'Xóa bài viết thành công' });
    }

    async createComment(req: UserRequest, res: Response): Promise<any> {
        const { content } = req.body;
        if (!content) return res.status(400).json({ message: 'Nội dung comment không được trống' });
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
        post.comments.push({ content, author: req.user.id });
        await post.save();
        res.json({ message: 'Thêm comment thành công' });
    }

    async updateComment(req: UserRequest, res: Response): Promise<any> {
        const { content } = req.body;
        if (!content) return res.status(400).json({ message: 'Nội dung comment không được trống' });
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
        const comment = post.comments.id(req.params.commentId);
        if (!comment) return res.status(404).json({ message: 'Không tìm thấy comment' });
        if (comment.author!.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Không có quyền cập nhật comment' });
        }
        comment.content = content;
        await post.save();
        res.json({ message: 'Cập nhật comment thành công' });
    }

    async deleteComment(req: UserRequest, res: Response): Promise<any> {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
        const comment = post.comments.id(req.params.commentId);
        if (!comment) return res.status(404).json({ message: 'Không tìm thấy comment' });
        if (comment.author!.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Không có quyền xóa comment' });
        }
        post.comments.pull({ _id: req.params.commentId });
        await post.save();
        res.json({ message: 'Xóa comment thành công' });
    }

    async getAll(req: UserRequest, res: Response) {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 5;
        const skip = (page - 1) * limit;

        const totalPosts = await Post.countDocuments();
        const posts = await Post.find()
            .populate('author', 'email avatar description name')
            .populate('comments.author', 'email name avatar')
            .skip(skip)
            .limit(limit);

        res.json({
            posts,
            totalPages: Math.ceil(totalPosts / limit),
            currentPage: page
        });
    }

    async getById(req: UserRequest, res: Response): Promise<any> {
        const post = await Post.findById(req.params.id)
            .populate('author', 'email avatar description name')
            .populate('comments.author', 'email name avatar');
        if (!post) return res.status(404).json({ message: 'Không tìm thấy bài viết' });
        res.json(post);
    }
}

export default new PostController();
