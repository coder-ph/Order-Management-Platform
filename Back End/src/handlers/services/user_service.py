from src.config.config_map import appConfig
from src.services_layer.auth.auth import *
from src.handlers.repository.index import user_repository
from models.index import User
from src.error.index import ObjectNotFound, InvalidObjectValue
import json

class UserService:
    jwt_secret = appConfig.jwt.JWT_SECRET
    def create_user(self, user, location):
        user = user_repository.create_user(user, location)
        print(user)
        return user
    def authenticate_user(self,payload):
        user:User = user_repository.get_user_by_email(payload['email'])
        user_dict = user.to_dict()
        if not user: raise ObjectNotFound('user', payload['email'], 'email')
        password_is_valid = user.check_password(payload['password'])

        if not password_is_valid: raise InvalidObjectValue('authentication', 'password', user_dict['email'])
        return user_dict
    def get_all_users(self):
        return user_repository.get_all_users()
    
    def reset_password(self, payload):
        email = payload['email']
        user:User = user_repository.get_user_by_email(email)
        if not user: raise ObjectNotFound('user', email, 'email')
        password_is_valid = user.check_password(payload['password'])
        
        if not password_is_valid: raise InvalidObjectValue('credentials reset', 'password', email)
        newUser = user_repository.update_user_password(user, payload['new_password'])
        return newUser
        

        
