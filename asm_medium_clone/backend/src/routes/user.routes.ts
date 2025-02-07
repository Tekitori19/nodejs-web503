import express from 'express';
import * as postController from '../controllers/post.controllers';
import { auth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', auth, (req, res) => {
})
router.put('/:id', auth, (req, res) => {
})
router.get('/', (req, res) => {
})
router.get('/search', (req, res) => {
})
router.get('/:id', (req, res) => {
})

export default router;
