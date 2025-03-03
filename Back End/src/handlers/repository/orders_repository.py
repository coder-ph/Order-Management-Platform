from models.index import list_getter,commit_session, Order, OrderItem, bulk_commit_insert_session, session
from .location_repository import LocationRepository
import uuid
class OrdersRepository():
    def __init__(self, location_repository:LocationRepository):
        self.location_repo = location_repository
    @list_getter
    def get_all_orders(self):
        orders =  session.query(Order).all()
        print("went here")
        return orders
    
    def get_order_by_id(self, id):
        return Order.query.filter_by(id=id).first()
    
    @list_getter
    def get_user_orders(self, user_id):
        return Order.query.filter_by(user_id=user_id)
    
    @commit_session("order")
    def create_order(self, order):
        new_order = Order(total_amount=order['total_amount'], user_id=uuid.UUID(order['user_id']), destination_id=uuid.UUID(order['destination_id']))
        return new_order
    

class OrderItemsRepository():
    def __init__(self):
        pass
    @bulk_commit_insert_session(OrderItem)
    def create_order_items(self, items):
        return items
class InvoiceRepository():
    def __init__(self):
        pass
    
        