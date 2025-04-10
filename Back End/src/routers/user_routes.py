from flask_restful import Resource
from src.config.config_map import appConfig
from src.handlers.controllers.index import *
from src.startup.logging import Logger
from src.handlers.controllers.index import authenticate_user, update_user_password, get_all_users
from models.index import User
from src.handlers.middlewares.index import auth_middleware, acl_middleware
from models.client import  commit_session


logger = Logger("user routes file")
class BaseUserMethods(Resource):
    def post(self):
        return sign_up_user()
    def get(self):
        return authenticate_user()
class GetAllUsers(Resource):
    def get(self):
        return get_all_users()
class AnotherUserTest(Resource):
    def get(self):
        pass
    
class ResetPassWord(Resource):
    @auth_middleware
    @acl_middleware
    def put(self):
        return update_user_password()
class RequestOTP(Resource):
    def get(self):
        return request_token()
    

class ResetPassWordWithToken(Resource):
    @auth_middleware
    def put(self):
        return update_user_password_with_token()
    
class RequestOTP(Resource):
    def get(self):
        return request_token()

class VerifyOTP(Resource):
    def get(self):
        return verify_token()

def userRoutes(api):
    ## init
    base = f"{appConfig.app.BASE_URL}/users"
    
    ## Authentication
    api.add_resource(BaseUserMethods, f'{base}')
    api.add_resource(ResetPassWord, f"{base}/update-password")
    api.add_resource(ResetPassWordWithToken, f"{base}/reset-password")
    api.add_resource(RequestOTP, f"{base}/otp")
    api.add_resource(VerifyOTP, f"{base}/otp/verify")
    
    api.add_resource(GetAllUsers, f'{base}/all')
    
    