from flask_restful import Resource
from flask import request, g
from src.services_layer.utilities.constants import *
from src.services_layer.validators.index import *
from src.handlers.services.index import userService
from src.services_layer.utilities.constants import *
from src.handlers.repository.index import user_repository
from src.startup.logging import Logger
from src.error.index import is_bad_request, InternalServerErrors, DBSessionErrors, compile_error
from src.services_layer.utilities.index import hash_string
from src.services_layer.validators.index import validate_object, request_has_json
from .artifacts import user_creation_art, user_login_art, user_password_update_art, user_token_request_art, user_token_verification_art
from src.services_layer.auth.index import authLayer
from src.services_layer.pings.index import send_welcome_mail

logger = Logger('user controller file')

def testCreation():
    try:
        user = userService.create_user()
        return {'message':'you reached the test user endpoint', 'data':user}
    except Exception as e:
        print(isinstance(e, DBSessionErrors))
        return compile_error(e)
        
@request_has_params(user_login_art)
def authenticate_user(payload):
    payload_is_valid, missing = validate_object(user_login_art, payload)
    if not payload_is_valid :return {"error":"payload missing objects", "data":f"missing params: {missing}"}, 400
    try:
        user = userService.authenticate_user(payload)
        token = authLayer.signToken(user)
        return {"message":"user authenticated", "data":{"token":token}}
    except Exception as e:
        return compile_error(e)

@request_has_json(user_creation_art)
def sign_up_user(payload):
    payload_is_valid, missing = validate_object(user_creation_art, payload)
    if not payload_is_valid :return {"error":"payload missing objects", "data":f"missing params: {missing}"}, 400
    email_is_valid = validate_email(payload['email'])
    if not email_is_valid: return {"error":"email provided is invalid"}, 400
    try:
        location = payload.pop('location')
        user = userService.create_user(payload, location)
        send_welcome_mail({'email':user['email'], 'name':user['first_name']})
        token = authLayer.signToken(user)
        return {"message":"user created", "data":{"token":token}}, 200
    except Exception as e:
        return compile_error(e)

@request_has_json(user_password_update_art)
def update_user_password(payload):
    payload_is_valid, missing = validate_object(user_password_update_art, payload)
    if not payload_is_valid :return {"error":"payload missing objects", "data":f"missing params: {missing}"}, 400
    # email_is_valid = validate_email(payload['email'])
    print('here is user : : ',g.user)
    if not g.user.get('token'): return {"error":"reset password failed, invalid authentication"}, 403
    try:
        payload['email'] = g.user['email']
        user = userService.reset_password(payload, check_password=True)
        
        token = authLayer.signToken(user)
        return {"message":"user password reset", "data":{"token":token}}, 200
    except Exception as e:
        return compile_error(e)
    


@request_has_json(['new_password'])
def update_user_password_with_token(payload):
    payload_is_valid, missing = validate_object(['new_password'], payload)
    if not payload_is_valid :return {"error":"payload missing objects", "data":f"missing params: {missing}"}, 400
    if not hasattr(g, 'user'): return {"error":"reset password failed, invalid authentication"}, 403
    try:

        payload['email'] = g.user['token']['key']
        user = userService.reset_password(payload)
        
        token = authLayer.signToken(user)
        return {"message":"user password reset", "data":{"token":token}}, 200
    except Exception as e:
        return compile_error(e)
    
    
def get_all_users():
    try:
        users = userService.get_all_users()
        return {"message":'all users', "data":users}
    except Exception as e:
       
        return compile_error(e)
    
@request_has_params(user_token_request_art)
def request_token(payload):
    payload_is_valid, missing = validate_object(user_token_request_art, payload)
    if not payload_is_valid :return {"error":"payload missing objects", "data":f"missing params: {missing}"}, 400
    key_is_valid = validate_email(payload['key'])
    if not key_is_valid: return {"error":"key provided is invalid"}, 400
    
    try:
        userService.request_token(payload['key'])
        return {"message":'token sent to email', "data":{
            "key":payload['key']
        }}
    except Exception as e:
       
        return compile_error(e)
    

@request_has_params(user_token_verification_art)
def verify_token(payload):
    payload_is_valid, missing = validate_object(user_token_verification_art, payload)
    if not payload_is_valid :return {"error":"payload missing objects", "data":f"missing params: {missing}"}, 400
    key_is_valid = validate_email(payload['key'])
    if not key_is_valid: return {"error":"key provided is invalid"}, 400
    
    try:
        res = userService.verify_token(payload['key'], payload['token'])
        token = authLayer.signToken(res)
        
        return {"message":'token verified', "data":{
            "temp_token":token
        }}
    except Exception as e:
       
        return compile_error(e)
    
