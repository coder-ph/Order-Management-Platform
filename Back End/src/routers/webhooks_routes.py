from src.config.config_map import appConfig
from flask_restful import Resource

class MpesaDaraja(Resource):
    def post(self):
        pass
    
def webhooksRoutes(api):
    base = f"{appConfig.app.BASE_URL}/transactions"
    api.add_resource(MpesaDaraja, f"{base}/confirm")