import { Router } from 'express';
import UserController from '../controllers/user.controller.js';

const router = Router();

router.get('/', (req, res) => { UserController.getAllUser(req, res) });

router.get('/:id', (req, res) => { UserController.getUser(req, res) });

router.post('/', (req, res) => { UserController.createUser(req, res) })

router.patch('/:id', (req, res) => { UserController.updateUser(req, res) })

router.delete('/:id', (req, res) => { UserController.deleteUser(req, res) })

export default router;

