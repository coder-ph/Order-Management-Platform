from flask_restful import Resource
from src.config.config_map import appConfig
from src.handlers.controllers.index import *
from src.startup.logging import Logger
from src.handlers.controllers.index import authenticate_user, testCreation, get_all_users
from models.index import User
from models.client import  commit_session


logger = Logger("user routes file")
class SingUpUser(Resource):
    def post(self):
        return sign_up_user()
class GetAllUsers(Resource):
    def get(self):
        return get_all_users()
class AnotherUserTest(Resource):
    def get(self):
        # return userTest2()
        pass

class Authenticate(Resource):
    def get(self):
        return authenticate_user()


def userRoutes(api):
    ## init
    base = f"{appConfig.app.BASE_URL}/users"
    
    ## Authentication
    api.add_resource(SingUpUser, f'{base}/create')
    api.add_resource(Authenticate, f"{base}/sign-in")
    
    api.add_resource(GetAllUsers, f'{base}/users/all')
    api.add_resource(AnotherUserTest, f'{base}/users/test2')