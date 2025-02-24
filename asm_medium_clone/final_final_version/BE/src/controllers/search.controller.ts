import { Response } from "express"
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { UserRequest } from "../types/userRequest.js";

class SearchController {
    async index(req: UserRequest, res: Response): Promise<any> {
        const { q, page = '1', limit = '5' } = req.query;
        const parsedPage = parseInt(page as string, 10);
        const parsedLimit = parseInt(limit as string, 10);
        const skip = (parsedPage - 1) * parsedLimit;

        let posts;
        let totalPosts;

        if (!q) {
            totalPosts = await Post.countDocuments();
            posts = await Post.find()
                .populate('author', 'email avatar description name')
                .populate('comments.author', 'email name avatar')
                .skip(skip)
                .limit(parsedLimit);
        } else {
            const users = await User.find({
                $or: [
                    { name: new RegExp(q as string, 'i') },
                    { email: new RegExp(q as string, 'i') }
                ]
            });
            const userIds = users.map(user => user._id);

            posts = await Post.find({
                $or: [
                    { title: new RegExp(q as string, 'i') },
                    { content: new RegExp(q as string, 'i') },
                    { author: { $in: userIds } }
                ]
            }).populate('author', 'email avatar description name')
                .populate('comments.author', 'email name avatar');

            totalPosts = posts.length;
            posts = posts.slice(skip, skip + parsedLimit);
        }

        res.json({
            posts,
            totalPages: Math.ceil(totalPosts / parsedLimit),
            currentPage: parsedPage
        });
    }
}

export default new SearchController();
