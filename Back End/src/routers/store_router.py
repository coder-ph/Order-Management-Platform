from flask_restful import Resource
from src.config.config_map import appConfig
from src.handlers.controllers.index import *
from src.startup.logging import Logger
from src.handlers.middlewares.index import auth_middleware, acl_middleware

logger = Logger("store routes file")

class BaseStoreMethods(Resource):
    @auth_middleware
    @acl_middleware
    def post(self):
        try:
            return create_store()
        except Exception as e:
            return {"error":errorEnums['500']}
    def get(self):
        try:
            return get_stores()
        except Exception as e:
            return {"error":errorEnums['500']}
        
class ChangeStoreStatus(Resource):
    @auth_middleware
    @acl_middleware
    def put(self):
        try:
            return change_store_status()
        except Exception as e:
            return {"error":errorEnums['500']}


def storeRoutes(api):
    base = f"{appConfig.app.BASE_URL}/store"
    api.add_resource(BaseStoreMethods, f"{base}")
    api.add_resource(ChangeStoreStatus, f"{base}/status")


