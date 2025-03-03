from src.config.config_map import appConfig
from flask_restful import Resource, Api
from src.handlers.controllers.index import create_order, get_all_orders

class CreateOrder(Resource):
    def post(self):
        try:
            return create_order()
        except Exception as e:
            return {"error":"message"}
    def get(self):
        try:
            return get_all_orders()
        except Exception as e:
            return {"error":"message"}
    
def orderRoutes(api:Api):
    base = f"{appConfig.app.BASE_URL}/orders"
    api.add_resource(CreateOrder, f'{base}')
    