from src.config.config_map import appConfig
from src.services_layer.auth.auth import *
class UserService:
    jwt_secret = appConfig.jwt.JWT_SECRET
    def authenticate_user(self,payload):
        #run a function to get user
        user = {
            "email":"someemail@gmail.com"
        }
        token = authLayer.signToken(user)
        return token