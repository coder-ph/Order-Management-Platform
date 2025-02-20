from flask_restful import Resource
from src.config.config_map import appConfig
from src.handlers.controllers.index import *
from src.startup.logging import Logger

logger = Logger("user routes file")
class UserTest(Resource):
    def get(self):
        return userTest()

class AnotherUserTest(Resource):
    def get(self):
        return userTest2()
def userRoutes(api):
    api.add_resource(UserTest, f'{appConfig.app.BASE_URL}/users')
    api.add_resource(AnotherUserTest, f'{appConfig.app.BASE_URL}/users/test2')