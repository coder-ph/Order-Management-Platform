from flask_restful import Resource
from src.config.config_map import appConfig
from src.handlers.controllers.index import *
from src.startup.logging import Logger
from src.handlers.controllers.index import authenticate_user, testCreation, get_all_users
from models.index import User
from models.client import  commit_session


logger = Logger("user routes file")
class UserTest(Resource):
    def get(self):
        nr = testCreation()
        return nr
class GetAllUsers(Resource):
    def get(self):
        return get_all_users()
class AnotherUserTest(Resource):
    def get(self):
        return userTest2()

class Authenticate(Resource):
    def get(self):
        return authenticate_user()


def userRoutes(api):
    api.add_resource(UserTest, f'{appConfig.app.BASE_URL}/users')
    api.add_resource(GetAllUsers, f'{appConfig.app.BASE_URL}/users/all')
    api.add_resource(AnotherUserTest, f'{appConfig.app.BASE_URL}/users/test2')
    api.add_resource(Authenticate, f"{appConfig.app.BASE_URL}/user/login")