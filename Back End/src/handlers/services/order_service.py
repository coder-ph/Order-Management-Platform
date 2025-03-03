from src.handlers.repository.index import OrdersRepository, LocationRepository, OrderItemsRepository
import uuid
class OrderService():
    def __init__(self, order_repository:OrdersRepository,order_items_repo:OrderItemsRepository, location_repository:LocationRepository):
        self.order_repo = order_repository
        self.location_repo = location_repository
        self.order_items_repo = order_items_repo

    def create_order(self, order, order_items:list, user_id):
        destination = self.location_repo.create_location(destination)
        order['destination_id'] = destination['id']
        order = self.order_repo.create_order(order)
        for item in order_items:
            item['user_id'] = uuid.UUID(user_id)
            item['order_id'] = uuid.UUID(order['id'])
        order_items = self.order_items_repo.create_order_items(order_items)

    def get_all_orders(self):
        
        return self.order_repo.get_all_orders()
    
        

        
        