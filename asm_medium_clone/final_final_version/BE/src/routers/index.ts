import { Router } from 'express';
import auth from '../middlewares/auth.middleware.js';
import authController from '../controllers/auth.controller.js';
import postController from '../controllers/post.controller.js';
import profileController from '../controllers/profile.controller.js';
import searchController from '../controllers/search.controller.js';
import userController from '../controllers/user.controller.js';

const router = Router();


router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/post', postController.getAll);

router.post('/post', auth, postController.create);

router.put('/post/:id', auth, postController.updateById);

router.delete('/post/:id', auth, postController.deleteById);

router.post('/post/:id/comment', auth, postController.createComment);

router.put('/post/:postId/comment/:commentId', auth, postController.updateComment);

router.delete('/post/:postId/comment/:commentId', auth, postController.deleteComment);

router.put('/profile', auth, profileController.update);

router.get('/post/:id', postController.getById);

router.get('/search', searchController.index);

router.get('/profile/:id', profileController.getById);

router.get('/users', userController.index);


export default router;
