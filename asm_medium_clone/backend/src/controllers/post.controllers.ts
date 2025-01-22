import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import Post from '../models/post.model';

export const createPost = async (req: AuthRequest, res: Response) => {
    try {
        const post = new Post({
            ...req.body,
            author: req.userId
        });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updatePost = async (req: AuthRequest, res: Response) => {
    try {
        const post = await Post.findOne({ _id: req.params.id, author: req.userId });

        if (!post) {
            return res.status(404).json({ message: 'Post not found or unauthorized' });
        }

        Object.assign(post, req.body);
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getAllPosts = async (req: AuthRequest, res: Response) => {
    try {
        const posts = await Post.find().populate('author', 'name email');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getPostById = async (req: AuthRequest, res: Response) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'name email');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const searchPosts = async (req: AuthRequest, res: Response) => {
    try {
        const { title, content, author, date } = req.query;
        let query: any = {};

        if (title) query.title = new RegExp(title as string, 'i');
        if (content) query.content = new RegExp(content as string, 'i');
        if (author) query.author = author;
        if (date) {
            const searchDate = new Date(date as string);
            query.createdAt = {
                $gte: searchDate,
                $lt: new Date(searchDate.getTime() + 24 * 60 * 60 * 1000)
            };
        }

        const posts = await Post.find(query).populate('author', 'name email');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
