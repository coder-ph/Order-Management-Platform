from models.index import list_getter,commit_session,update_session, Order,User,Store,Invoice,Log, OrderItem, bulk_commit_insert_session, session
from .location_repository import LocationRepository
import uuid
class OrdersRepository():
    def __init__(self, location_repository:LocationRepository):
        self.location_repo = location_repository
    @list_getter
    def get_all_orders(self):
        orders =  Order.query.all()
        print("went here")
        return orders
    
    def get_order_by_id(self, id):
        return Order.query.filter_by(id=uuid.UUID(id)).first()
    
    @list_getter
    def get_user_orders(self, user_id):
        return Order.query.filter_by(user_id=uuid.UUID(user_id))
    
    @list_getter
    def get_merchant_orderes(self, store_id):
        user_orders = [order for order in (Order.query.all()) if len([item for item in order.OrderItems if item.Product.store == uuid.UUID(store_id) ]) > 0]
        if len(user_orders) < 1:
            user_orders == []
        return user_orders
        
    @commit_session("order")
    def create_order(self, order):
        new_order = Order(total_amount=order['total_amount'], user_id=uuid.UUID(order['user_id']), destination_id=uuid.UUID(order['destination_id']))
        return new_order
    
    @commit_session("invoice")
    def create_invoice(self, invoice):
        new_invoice = Invoice(invoice_no=invoice['invoice_no'], billed_phone=invoice['billed_phone'], order_id=uuid.UUID(invoice['order_id']))
        return new_invoice
    @list_getter
    def get_invoices(self):
        return Invoice.query.all()
    
    @update_session("order")
    def update_order_status(self, order:Order,status):
        order.status = status
        return order
    
    @commit_session("log")
    def create_log(self, log):
        log = Log(log=repr(log))
        return log
    @list_getter
    def get_logs(self):
        return Log.query.all()
        

class OrderItemsRepository():
    def __init__(self):
        pass
    @bulk_commit_insert_session(OrderItem)
    def create_order_items(self, items):
        return items
class InvoiceRepository():
    def __init__(self):
        pass
    
        