import { Router } from 'express';
import UserController from '../controllers/user.controller.js';

const router = Router();

router.post('/signup', (req, res) => { UserController.signUp(req, res) })

router.post('/login', (req, res) => { UserController.login(req, res) })

router.post('/logout', (req, res) => { UserController.logout(req, res) })

export default router;

