from models import Store


class Storesservice():
    def get_all_stores(self):
        return Store.query.all()
    def get_stores_by_location(self, location):
        return Store.query.filterby(location).first()
    def get_stores_by_category(self, category):
        return Store.query.filterby(self,category).all()
    
