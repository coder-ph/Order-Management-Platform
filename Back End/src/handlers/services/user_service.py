from src.config.config_map import appConfig
from src.services_layer.auth.auth import *
from src.handlers.repository.index import user_repository
from models.index import User
import json

class UserService:
    jwt_secret = appConfig.jwt.JWT_SECRET
    def create_user(self):
        user = user_repository.testCreateUser()
        print(user)
        return user
    def authenticate_user(self,payload):

        user = user_repository.authenticateUser(payload)
        print("her eis the suer")
        print(user)
        token = authLayer.signToken(user)
        return token
    def get_all_users(self):
        return user_repository.get_all_users()