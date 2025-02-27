from models.client import commit_session, list_getter
from models.index import Category, Product
import uuid

class ProductRepository():
    def __init__(self):
        pass
    @commit_session("category")
    def create_category(self, category):
        newCategory = Category(name=category['name'])
        print("gone till here ")
        return newCategory
    
    @list_getter
    def get_categoires(self):
        return Category.query.all()
    
    @commit_session('product')
    def create_product(self, product, store):
        newProduct = Product(name=product['name'],quantity=product['quantity'] if 'quantity' in product else 0, description=product['description'], store=store.id, category=product['category'] )
        return newProduct
