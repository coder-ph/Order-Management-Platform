from models.client import commit_session, list_getter
from models.index import Category
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
        