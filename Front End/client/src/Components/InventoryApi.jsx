import { mockCategories , mockProducts} from "../assets/UserMockData";

// Initial state
let products = [...mockProducts];
let nextId = products.length + 1;

//Product Service API - Provides methods to interact with the backend
export class ProductServiceAPI {
  static async fetchProducts() {
    // Simulate network delay
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([...products])
      }, 500)
    })
  }

  static async fetchProductById(productId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = products.find(p => p.id === productId)
        
        if (!product) {
          reject(new Error(`Product with ID ${productId} not found`))
          return
        }
        
        resolve({...product})
      }, 300)
    })
  }

  static async addProduct(product) {
    return new Promise(resolve => {
      setTimeout(() => {
        const newProduct = {
          id: nextId++,
          ...product,
          price: parseFloat(product.price),
          stock: parseInt(product.stock),
          status: true,
          image: product.image ? URL.createObjectURL(product.image) : "/api/placeholder/48/48"
        }
        
        products.push(newProduct)
        resolve(newProduct)
      }, 500)
    })
  }

  static async updateProductStatus(productId, status) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const productIndex = products.findIndex(p => p.id === productId);
        
        if (productIndex === -1) {
          reject(new Error('Product not found'));
          return;
        }
        
        products[productIndex] = {...products[productIndex], status};
        resolve(products[productIndex])
      }, 300)
    })
  }

  static async updateProduct(productId, productData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const productIndex = products.findIndex(p => p.id === productId)
        
        if (productIndex === -1) {
          reject(new Error('Product not found'))
          return
        }
        
        // Process numeric fields
        const processedData = {
          ...productData,
          price: parseFloat(productData.price),
          stock: parseInt(productData.stock),
          image: productData.image && typeof productData.image !== 'string' 
            ? URL.createObjectURL(productData.image) 
            : productData.image || products[productIndex].image
        }
        
        // Update the product
        products[productIndex] = {...products[productIndex], ...processedData }
        resolve(products[productIndex]);
      }, 500)
    })
  }

  static async deleteProduct(productId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const productIndex = products.findIndex(p => p.id === productId);
        
        if (productIndex === -1) {
          reject(new Error('Product not found'));
          return;
        }
        // Remove the product
        products.splice(productIndex, 1)
        resolve(true)
      }, 300)
    })
  }

  static async searchProducts(query) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (!query || query.trim() === '') {
          resolve([...products])
          return
        }
        
        const searchTerm = query.toLowerCase().trim();
        const filteredProducts = products.filter(product => 
          product.name.toLowerCase().includes(searchTerm) || 
          (product.description && product.description.toLowerCase().includes(searchTerm))
        );
        
        resolve(filteredProducts)
      }, 300)
    })
  }

  static async filterByCategory(category) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (!category || category === 'all') {
          resolve([...products])
          return
        }
        
        const filteredProducts = products.filter(product => 
          product.category === category
        )
        
        resolve(filteredProducts)
      }, 300)
    })
  }
}

// Export methods for backward compatibility
export const fetchProductsApi = ProductServiceAPI.fetchProducts;
export const addProductApi = ProductServiceAPI.addProduct;
export const updateProductStatusApi = ProductServiceAPI.updateProductStatus;