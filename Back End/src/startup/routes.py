from flask_restful import Resource, Api
from src.config.config_map import appConfig
from src.services_layer.utilities.constants import errorEnums
from src.handlers.middlewares.index import *
from src.routers.index import *
from src.services_layer.auth.auth import *

class LiveProbe(Resource):
    def get(self):
        try:
            return {"messgae":f"server running on port : {appConfig.app.PORT}"}, 200
        except Exception as e:
            print(str(e))
            return {"error": errorEnums["500"]}, 500


def routerSetup(api:Api):
    api.add_resource(LiveProbe, f'{appConfig.app.BASE_URL}/liveprobe')
    userRoutes(api)
    productsRoutes(api)
    
