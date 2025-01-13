import { product } from '../models/product.js';

const Data = [
    { id: 1, imgPath: 'product-1.jpg', title: 'Product 1', desc: 'when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries' },
    { id: 2, imgPath: 'product-2.jpg', title: 'Product 2', desc: 'when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries' },
    { id: 3, imgPath: 'product-3.jpg', title: 'Product 3', desc: 'when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries' },
    { id: 4, imgPath: 'product-4.jpg', title: 'Product 4', desc: 'when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries' },
    { id: 5, imgPath: 'product-5.jpg', title: 'Product 5', desc: 'when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries' },
]

export const getProducts = (): product[] => {
    return Data;
}

export const getProduct = (id: number): product[] => {
    return Data.filter((product) => product.id === id)
}
