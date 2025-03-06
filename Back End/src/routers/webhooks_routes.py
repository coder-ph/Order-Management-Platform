from src.config.config_map import appConfig
from flask_restful import Resource, Api
from src.handlers.controllers.index import confirm_transaction

class MpesaDaraja(Resource):
    def post(self):
        return confirm_transaction()
    def get(self):
        pass
    
def webhooksRoutes(api:Api):
    base = f"{appConfig.app.BASE_URL}/transactions"
    api.add_resource(MpesaDaraja, f"{base}/confirm")