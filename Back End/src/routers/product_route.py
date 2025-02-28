from src.config.config_map import appConfig
from flask_restful import Resource, Api
from src.services_layer.utilities.constants import errorEnums
from src.handlers.controllers.index import *
from src.handlers.middlewares.index import auth_middleware, acl_middleware


class BaseProductsMethods(Resource):
    @auth_middleware
    @acl_middleware
    def post(self):
        try:
            return create_product()
        except Exception as e:
            return {"error":errorEnums['500']}
    def get(self):
        try:
            return get_all_products()
        except Exception as e:
            return {"error":errorEnums['500']}
    
class UpdateProductMethod(Resource):
    @auth_middleware
    @acl_middleware
    def put(self, product_id):
        try:
            return update_product(product_id=product_id)
        except Exception as e:
            return {"error":errorEnums['500']}
    @auth_middleware
    @acl_middleware
    def delete(self, product_id):
        try:
            return delete_product(product_id)
            return {"message":"something"}
        except Exception as e:
            print('exeption here :A: ',e)
            return {"error":errorEnums['500']}

class BaseCategoryMethods(Resource):
    @auth_middleware
    @acl_middleware
    def post(self):
        try:
            return create_category()
        except Exception as e:
            return {"error":errorEnums['500']}
    def get(self):
        try:
            return get_categories()
        except Exception as e:
            return {"error":errorEnums['500']}

def productsRoutes(api:Api):
    base = f"{appConfig.app.BASE_URL}/products"

    api.add_resource(BaseProductsMethods, f"{base}")
    api.add_resource(UpdateProductMethod, f"{base}/<product_id>")
    api.add_resource(BaseCategoryMethods, f'{base}/categories')