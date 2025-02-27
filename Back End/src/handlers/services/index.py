from src.handlers.repository.index import *
from .user_service import *
from .product_service import *
from .store_service import *

userService = UserService()
productsService = ProductsService(product_repository)
storeService = StoreService(store_repository, user_repository,location_repository)





