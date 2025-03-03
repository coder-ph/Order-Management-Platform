from .user_repository import UserRepository
from .location_repository import LocationRepository
from .products_repository import ProductRepository
from .store_repository import StoreRepository
from .orders_repository import OrdersRepository, OrderItemsRepository, InvoiceRepository

location_repository = LocationRepository()
user_repository = UserRepository(location_repository)
product_repository = ProductRepository()
store_repository = StoreRepository(location_repository)
order_repository = OrdersRepository(location_repository)
order_items_repository = OrderItemsRepository()
invoice_repository = InvoiceRepository()