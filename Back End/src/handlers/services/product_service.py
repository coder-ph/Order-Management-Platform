from src.handlers.repository.index import ProductRepository, StoreRepository, UserRepository
from src.error.index import ObjectNotFound, AccessLevelError
import uuid
class ProductsService():
    def __init__(self, products_repo:ProductRepository, store_repo:StoreRepository, user_repo:UserRepository):
        self.products_repo = products_repo
        self.store_repo = store_repo
        self.user_repo = user_repo

    def create_category(self, category):
        category = self.products_repo.create_category(category)
        return category

    def get_categories(self):
        return self.products_repo.get_categoires()

    def create_product(self, product, user_id):
        store = self.store_repo.get_store_by_id(product['store'])
        if not store: raise ObjectNotFound('store', product['store'], 'id')
        owner_id = str(store.owner.id)
        if not owner_id == user_id: raise AccessLevelError('product creation', 'store')
        newProduct = self.products_repo.create_product(product, store)
        return newProduct
    
    def update_product(self, product, user_id):
        old_product = self.products_repo.get_product_by_id(product['id'])
        if not old_product: raise ObjectNotFound('product', product['id'], 'id')
        owner_id = str(old_product.Store.owner.id)
        if not owner_id == user_id: raise AccessLevelError('product update', 'product')
        newProduct = self.products_repo.update_product(product, old_product)
        return newProduct
    
    def get_all_products(self):
        return self.products_repo.get_all_products()
    
    def delete_product(self, product_id, user_id):
        product = self.products_repo.get_product_by_id(product_id)
        if not product: raise ObjectNotFound('product', product_id, 'id')
        owner_id = str(product.Store.owner.id)
        if not owner_id == user_id: raise AccessLevelError('product update', 'product')
        product = self.products_repo.delete_product(product)
        return product
        