from src.config.config_map import appConfig
from flask_restful import Resource, Api

class CreateOrder(Resource):
    def get(self):
        try:
            return {"message":"create orders"}
        except Exception as e:
            return {"error":"message"}
    
def orderRoutes(api:Api):
    base = f"{appConfig.app.BASE_URL}/orders"

    api.add_resource(CreateOrder, f'{base}')
    