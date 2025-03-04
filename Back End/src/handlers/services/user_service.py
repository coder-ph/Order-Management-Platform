from src.config.config_map import appConfig
from src.services_layer.auth.auth import *
from src.handlers.repository.index import user_repository
from models.index import User
from src.error.index import ObjectNotFound, InvalidObjectValue
from src.services_layer.pings.index import send_reset_password_mail
import json

class UserService():
    jwt_secret = appConfig.jwt.JWT_SECRET
    def create_user(self, user, location):
        user = user_repository.create_user(user, location)
        print(user)
        return user
    def authenticate_user(self,payload):
        user:User = user_repository.get_user_by_email(payload['email'])
        if not user: raise ObjectNotFound('user', payload['email'], 'email')
        user_dict = user.to_dict()
        password_is_valid = user.check_password(payload['password'])

        if not password_is_valid: raise InvalidObjectValue('authentication', 'password', user_dict['email'])
        return user_dict
    def get_all_users(self):
        return user_repository.get_all_users()
    
    def reset_password(self, payload, check_password=None):
        email = payload['email']
        
        user:User = user_repository.get_user_by_email(email)
        if not user: raise ObjectNotFound('user', email, 'email')

        if check_password:
            password_is_valid = user.check_password(payload['password'])
            if not password_is_valid: raise InvalidObjectValue('credentials reset', 'password', email)

        newUser = user_repository.update_user_password(user, payload['new_password'])
        return newUser

    def reset_password_with_otp(self, payload):
        email = payload['email']
        user:User = user_repository.get_user_by_email(email)
        if not user: raise ObjectNotFound('user', email, 'email')
        
    def verify_token(self, key,token_no):
        token = user_repository.get_token_by_key(key)
        user = user_repository.get_user_by_email(key)
        if not token: raise ObjectNotFound('token', key, 'key')
        if not str(token.token) == token_no: raise InvalidObjectValue('token validation', 'token', key)
        token_dict = token.to_dict()

        if user:
            user:dict = user.to_dict()
            user['token'] = token_dict
            user_repository.drop_token(token)

            return user
        
        print("went to ehre : ", user)
        user_repository.drop_token(token)
        user = {}
        user['token'] = token_dict
        return user
        
        
    
    def request_token(self, key):
        ex_token = user_repository.get_token_by_key(key)
        if ex_token:
            token = user_repository.update_token(ex_token)
            return send_reset_password_mail({'email':key, 'token':token['token']})
        token = user_repository.store_token(key)
        return send_reset_password_mail({'email':key, 'token':token['token']})

        
    
        

        
