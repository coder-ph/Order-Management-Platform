from src.handlers.repository.index import OrdersRepository, LocationRepository, OrderItemsRepository, ProductRepository, StoreRepository
from src.error.index import ObjectNotFound, AccessLevelError
import uuid
class OrderService():
    def __init__(self, order_repository:OrdersRepository,order_items_repo:OrderItemsRepository, location_repository:LocationRepository, product_repository:ProductRepository, store_repository:StoreRepository):
        self.order_repo = order_repository
        self.location_repo = location_repository
        self.order_items_repo = order_items_repo
        self.product_repo = product_repository
        self.store_repo = store_repository
        

    def create_order(self, order, order_items:list, destination,user_id):
        destination = self.location_repo.create_location(destination)
        order['destination_id'] = destination['id']
        order['user_id'] = user_id
        print("here is order k;lj;lkj;lkj", order)

        order = self.order_repo.create_order(order)
        print("reachere k;lj;lkj;lkj")
        for item in order_items:
            product = self.product_repo.get_product_by_id(item['product_id'])
            if not product: raise ObjectNotFound('product', 'id', id)
            item['order_id'] = uuid.UUID(order['id'])
        order_items = self.order_items_repo.create_order_items(order_items)
        order =  self.order_repo.get_order_by_id(order['id']).to_dict()
        print(order)
        return order

    def get_all_orders(self):
        return self.order_repo.get_all_orders()

    def get_user_orders(self, user_id):
        return self.order_repo.get_user_orders(user_id)
    
    def get_merchant_orders(self, store_id, user_id):
        store = self.store_repo.get_store_by_id(store_id)
        if not store: raise ObjectNotFound('store', 'id', store_id)
        print(str(store.owner_id), user_id)
        if not str(store.owner_id) == user_id: raise AccessLevelError("getting orders", 'store')
        return self.order_repo.get_merchant_orderes(store_id)    