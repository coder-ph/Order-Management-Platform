from src.handlers.repository.index import *
from .user_service import *
from .product_service import *
from .store_service import *
from .order_service import *

userService = UserService()
productsService = ProductsService(product_repository, store_repository, user_repository)
storeService = StoreService(store_repository, user_repository,location_repository)
ordersService = OrderService(order_repository, order_items_repository, location_repository,product_repository, store_repository)






