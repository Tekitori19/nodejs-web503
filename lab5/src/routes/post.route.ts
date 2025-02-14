import { Router } from 'express';
import { Post } from '../models/post';

const router = Router();

// Lấy tất cả bài post
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Tạo bài post mới
router.post('/', async (req, res) => {
    const { title, content } = req.body;
    try {
        const newPost = await Post.createPost(title, content);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
});

export default router;
