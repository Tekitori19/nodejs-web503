import { Router } from 'express';
import { getProducts, getProduct } from '../services/product.service.js';

const router = Router();

router.get('/create', (_req, res) => {
    const data = getProducts()
    res.render('products', { layout: 'main', data })
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    // console.log(id)
    const data = getProduct(id)
    // console.log(data)
    res.render('product', { layout: 'main', data: data })
})

export default router;
