from src.config.config_map import appConfig
from flask_restful import Resource, Api
from src.handlers.controllers.index import get_invoicess, create_invoice, create_order, get_all_orders, get_merchant_orders, get_user_orders
from src.handlers.middlewares.index import acl_middleware, auth_middleware

from src.services_layer.daraja.index import daraja
class CreateOrder(Resource):
    @auth_middleware
    @acl_middleware
    def post(self):
        return create_order()
    @auth_middleware
    @acl_middleware
    def get(self):
        return get_all_orders()

class GetUsersOrders(Resource):
    @auth_middleware
    @acl_middleware
    def get(self):
        
        return get_user_orders()
    
class GetMerchantOrders(Resource):
    @auth_middleware
    @acl_middleware
    def get(self, store_id):
        return get_merchant_orders(store_id)

class CheckOut(Resource):
    @auth_middleware
    @acl_middleware
    def post(self):
        return create_invoice()
        
    def get(self):
        return 
    

class Invoices(Resource):
    @auth_middleware
    @acl_middleware
    def get(self):
        return get_invoicess()
    
def orderRoutes(api:Api):
    base = f"{appConfig.app.BASE_URL}/orders"
    api.add_resource(CreateOrder, f'{base}')
    api.add_resource(GetUsersOrders, f'{base}/my-orders')
    api.add_resource(CheckOut, f'{base}/checkout')
    api.add_resource(Invoices, f'{base}/invoices')
    api.add_resource(GetMerchantOrders, f'{base}/my-store/<store_id>')
    
    