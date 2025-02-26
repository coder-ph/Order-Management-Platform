from flask_restful import Resource
from flask import request
from src.services_layer.utilities.constants import *
from src.services_layer.validators.index import *
from src.handlers.services.index import userService
from src.services_layer.utilities.constants import *
from src.handlers.repository.index import user_repository
from src.startup.logging import Logger
from src.error.index import is_bad_request, InternalServerErrors, DBSessionErrors, compile_error
from src.services_layer.utilities.index import hash_string
from src.services_layer.validators.index import validate_object, request_has_json
from .artifacts import user_creation_art, user_login_art, user_password_update_art
from src.services_layer.auth.index import authLayer

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
        token = authLayer.signToken(user)
        return {"message":"user created", "data":{"token":token}}, 200
    except Exception as e:
        return compile_error(e)

@request_has_json(user_password_update_art)
def update_user_password(payload):
    payload_is_valid, missing = validate_object(user_password_update_art, payload)
    if not payload_is_valid :return {"error":"payload missing objects", "data":f"missing params: {missing}"}, 400
    email_is_valid = validate_email(payload['email'])
    if not email_is_valid: return {"error":"email provided is invalid"}, 400
    try:
        user = userService.reset_password(payload)
        
        print("returned user : : : ", user)
        token = authLayer.signToken(user)
        return {"message":"user password reset", "data":{"token":token}}, 200
    except Exception as e:
        return compile_error(e)
    
    
def get_all_users():
    try:
        
        users = userService.get_all_users()
        print("hashing passwrod ##################")
        return {"message":'all users', "data":users}
    except Exception as e:
       
        return compile_error(e)
    
