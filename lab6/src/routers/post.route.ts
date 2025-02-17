import { Router } from 'express';
import PostController from '../controllers/post.controller.js';

const router = Router();

router.get('/', (req, res) => { PostController.getAllPost(req, res) });

router.get('/:id', (req, res) => { PostController.getPost(req, res) });

router.post('/', (req, res) => { PostController.createPost(req, res) })

router.patch('/:id', (req, res) => { PostController.updatePost(req, res) })

router.delete('/:id', (req, res) => { PostController.deletePost(req, res) })

export default router;
