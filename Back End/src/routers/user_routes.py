from ...index import api
from flask_restful import Resource
from src.config.config_map import appConfig
from src.handlers.controllers.index import *

class UserTest(Resource):
    def get(self):
        return userTest()
api.add_resource(UserTest, f'{appConfig.app.BASE_URL}/users')