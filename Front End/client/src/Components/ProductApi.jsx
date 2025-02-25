import { mockProducts } from '../assets/MockData';

let products = [...mockProducts]
let nextId = products.length + 1

export const fetchProductsApi = async () => {
  // Simulate network delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([...products])
    }, 500);
  })
}

export const addProductApi = async (product) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const newProduct = {
        id: nextId++,
        ...product,
        price: parseFloat(product.price),
        stock: parseInt(product.stock),
        status: true,
        image: product.image ? URL.createObjectURL(product.image) : "/api/placeholder/48/48"
      };
      
      products.push(newProduct)
      resolve(newProduct)
    }, 500)
  })
}

export const updateProductStatusApi = async (productId, status) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const productIndex = products.findIndex(p => p.id === productId)
      
      if (productIndex === -1) {
        reject(new Error('Product not found'));
        return;
      }
      
      products[productIndex] = {...products[productIndex], status }
      resolve(products[productIndex])
    }, 300)
  })
}