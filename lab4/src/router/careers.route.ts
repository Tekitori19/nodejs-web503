import { Router } from 'express';
import { getCareers } from '../services/career.service.js';

const router = Router();


router.get('/', (_req, res) => {
    const data = getCareers()
    res.render('careers', { layout: 'main', data })
})


export default router;
