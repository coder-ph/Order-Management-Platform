from flask_restful import Resource, Api
from src.config.config_map import appConfig
from src.services_layer.utilities.constants import errorEnums

class LiveProbe(Resource):
    def get(self):
        try:
            return {"messgae":f"server running on port : {appConfig.app.PORT}"}, 200
        except:
            return {"message": "string"}, 500


def routerSetup(api):
    api.add_resource(LiveProbe, f'{appConfig.app.BASE_URL}/liveprobe')
    