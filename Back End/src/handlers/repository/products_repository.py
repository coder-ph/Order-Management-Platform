from models.client import commit_session, list_getter, update_session, commit_delete_session
from models.index import Category, Product, session
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
        newProduct = Product(name=product['name'],price=product['price'], quantity=product['quantity'] if 'quantity' in product else 0, description=product['description'], store=store.id, category=product['category'] )
        return newProduct
    def get_product_by_id(self,id):
        return session.query(Product).filter_by(id=uuid.UUID(id)).first()
    
    @update_session('product')
    def update_product(self,product:dict, old_product:Product):
        for key, val in product.items():
            setattr(old_product, key, val)
        return old_product
    @list_getter
    def get_all_products(self):
        return Product.query.all()
    @commit_delete_session('product')
    def delete_product(self, product):
        print("we entered here : : : ")
        return product
        
