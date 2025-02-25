from flask_restful import resource
from src.config.config_map import appConfig
from src.handlers.controllers.index import *
from src.startup.logging import Logger

logger = Logger("store routes file")





        
def StoreRoutes(api):
    api.add_resource(StoreTest, f'{appConfig.app.BASE_URL}/stores')
   
    api.add_resource(Stores, f"{appConfig.app.BASE_URL}/user/storesfetch")


