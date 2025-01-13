import { Router } from 'express';
import { getCareers } from '../services/career.service.js';
import { getFeatures } from '../services/feature.service.js';
import { getProducts, getProduct } from '../services/product.service.js';

const router = Router();

router.get('/home', (_req, res) => {
    const data = getFeatures()
    res.render('home', { layout: 'main', data })
})

router.get('/products', (_req, res) => {
    const data = getProducts()
    res.render('products', { layout: 'main', data })
})

router.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id)
    console.log(id)
    const data = getProduct(id)
    console.log(data)
    res.render('product', { layout: 'main', data: data })
})

router.get('/careers', (_req, res) => {
    const data = getCareers()
    res.render('careers', { layout: 'main', data })
})

router.get('/about', (_req, res) => {
    res.render('about', { layout: 'main' })
})

export default router;
