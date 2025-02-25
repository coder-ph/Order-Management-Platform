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
logger = Logger('user controller file')

def testCreation():
    try:
        user = userService.create_user()
        return {'message':'you reached the test user endpoint', 'data':user}
    except Exception as e:
        print(isinstance(e, DBSessionErrors))
        return compile_error(e)
        
        
def authenticate_user():
    # payload = request.get_json()
    payload = {
        'username':'Sheasdflasdfdddldtond',
        'email':'m.o.shdddasdfedasdflltodn@gmail.com',
    }

    # if(not payload.get("email") or not payload.get('password')):return {"error":"payload missing email or password"}, 400
    email_is_valid = validate_email(payload['email'])
    if not email_is_valid: return {"error":"email provided is invalid"}, 400
    try:
        token = userService.authenticate_user(payload)
        return {"message":"user authenticated", "data":{"token":token}}, 200
    except Exception as e:
        return compile_error(e)
def get_all_users():
    try:
        
        users = userService.get_all_users()
        print("hashing passwrod ##################")
        return {"message":'all users', "data":users}
    except Exception as e:
       
        return compile_error(e)
    
