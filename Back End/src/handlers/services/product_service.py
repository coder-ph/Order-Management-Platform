from src.handlers.repository.index import ProductRepository
class ProductsService():
    def __init__(self, products_repo:ProductRepository):
        self.products_repo = products_repo
        
    def create_category(self, category):
        category = self.products_repo.create_category(category)
        return category
    def get_categories(self):
        return self.products_repo.get_categoires()