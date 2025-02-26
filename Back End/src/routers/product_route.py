from src.config.config_map import appConfig
from flask_restful import Resource, Api
from src.services_layer.utilities.constants import errorEnums

class CreateProduct(Resource):
    def post(self):
        try:
            return {'message':"products"}
        except Exception as e:
            return {"error":errorEnums['500']}
        
def productsRoutes(api:Api):
    base = f"{appConfig.app.BASE_URL}/products"

    api.add_resource(CreateProduct, f"{base}")