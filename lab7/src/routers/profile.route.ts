import { Router } from 'express';
import authMiddleware from '../middlewares/checkAuth.middleware.js';
import multer from 'multer';
import { storage } from '../utils/storage.js';
import ProfileController from '../controllers/profile.controller.js';

const router = Router();

router.get('/', (req, res) => { ProfileController.getAllProfile(req, res) });

router.get('/:id', (req, res) => { ProfileController.getProfile(req, res) });

router.get('/viewprofile',
    authMiddleware,
    (req, res) => { ProfileController.viewProfile(req, res) }
);

router.get('/:id/mypost', (req, res) => { ProfileController.getMyPost(req, res) });

router.post('/create',
    authMiddleware,
    multer({ storage: storage }).single("image"),
    (req, res) => { ProfileController.createProfile(req, res) }
)

router.get('/bycreator/:id', (req, res) => { ProfileController.byCreator(req, res) })

router.put('/edit/:id',
    authMiddleware,
    multer({ storage: storage }).single("image"),
    (req, res) => { ProfileController.updateProfile(req, res) }
)

export default router;
