const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        activeAddProduct: true
    });
};

exports.postAddProduct = (req, res, next) => {
    const file = req.file;
    let title = req.body.productName;
    let price = req.body.price;
    let description = req.body.description;
    let nameImage = file.filename;

    const product = {
        nameProduct: title,
        priceProduct: price,
        sortDescription: description,
        images: nameImage
    };

    Product.saveProduct(product);
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll();
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        activeShop: true
    });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    const product = Product.findById(prodId);
    res.render('product-detail', {
        product: product,
        pageTitle: product.nameProduct,
        path: '/products'
    });
};
