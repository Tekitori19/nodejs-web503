import { Router } from 'express';
import productRouter from './post.route.js';
import userRouter from './user.route.js';

const router = Router();

router.use('/post', productRouter)
router.use('/user', userRouter)
router.use('/profile', userRouter)

export default router;
