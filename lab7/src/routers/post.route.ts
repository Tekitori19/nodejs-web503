import { Router } from 'express';
import PostController from '../controllers/post.controller.js';
import authMiddleware from '../middlewares/checkAuth.middleware.js';
import multer from 'multer';
import { storage } from '../utils/storage.js';

const router = Router();

router.get('/',
    authMiddleware,
    (req, res) => {
        PostController.getAllPost(req, res)
    }
);

router.get('/:id',
    (req, res) => {
        PostController.getPost(req, res)
    }
);

router.post('/',
    authMiddleware,
    multer({ storage: storage }).single("image"),
    (req, res) => {
        PostController.createPost(req, res)
    }
)

router.get('/mypost',
    authMiddleware,
    (req, res) => {
        PostController.createPost(req, res)
    }
)

router.put('/:id', (req, res) => { PostController.updatePost(req, res) })

router.delete('/:id',
    (req, res) => {
        PostController.deletePost(req, res)
    }
)

export default router;
