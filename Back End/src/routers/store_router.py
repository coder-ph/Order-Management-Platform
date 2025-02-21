from flask_restful import resource
from src.config.config_map import appConfig
from src.handlers.controllers.index import *
from src.startup.logging import Logger

logger = Logger("store routes file")

class StoreTest(Resource):
    def get(self):
        return userTest()

class Store(Resource):
    def get(self):

        ## run a store function
        # check if there is an existing store details
        # return the store details

        
        return Store()
    


        
def StoreRoutes(api):
    api.add_resource(StoreTest, f'{appConfig.app.BASE_URL}/stores')
   
    api.add_resource(Stores, f"{appConfig.app.BASE_URL}/user/storesfetch")


