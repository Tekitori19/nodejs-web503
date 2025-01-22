import express from 'express';
import * as postController from '../controllers/post.controllers';
import { auth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', auth, postController.createPost);
router.put('/:id', auth, postController.updatePost);
router.get('/', postController.getAllPosts);
router.get('/search', postController.searchPosts);
router.get('/:id', postController.getPostById);

export default router;
