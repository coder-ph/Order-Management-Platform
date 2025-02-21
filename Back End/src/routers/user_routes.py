from flask_restful import Resource
from src.config.config_map import appConfig
from src.handlers.controllers.index import *
from src.startup.logging import Logger
from src.handlers.controllers.index import authenticate_user

logger = Logger("user routes file")
class UserTest(Resource):
    def get(self):
        return userTest()

class AnotherUserTest(Resource):
    def get(self):
        return userTest2()

class Authenticate(Resource):
    def get(self):
        ##run a login function
        #check if payload has email, has password else return 400 error
        #check if user email is valid if not valid send 400 error
        
        #get unique user from db with the email and password
        #jwt sign the user from db
        
        #return the response to the client
        return authenticate_user()
        
def userRoutes(api):
    api.add_resource(UserTest, f'{appConfig.app.BASE_URL}/users')
    api.add_resource(AnotherUserTest, f'{appConfig.app.BASE_URL}/users/test2')
    api.add_resource(Authenticate, f"{appConfig.app.BASE_URL}/user/login")