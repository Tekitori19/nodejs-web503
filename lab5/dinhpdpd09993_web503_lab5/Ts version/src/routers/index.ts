import { Router } from 'express';
import { getFeatures } from '../services/feature.service.js';
import productRouter from './post.route.js';
import userRouter from './user.route.js';

const router = Router();

router.get('/', (_req, res) => {
    res.send('Hello I am Phan Dương Định - PD09993')
})

router.get('/home', (_req, res) => {
    const data = getFeatures()
    res.render('home', { layout: 'main', data })
})

router.get('/about', (_req, res) => {
    res.render('about', { layout: 'main' })
})

router.use('/post', productRouter)
router.use('/user', userRouter)

export default router;
