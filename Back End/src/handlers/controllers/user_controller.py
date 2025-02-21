from flask_restful import Resource
from flask import request
from src.services_layer.utilities.constants import *
from src.services_layer.validators.index import *
from src.handlers.services.index import userService
from src.services_layer.utilities.constants import *

def userTest():
    try:
        return {'message':'you reached the test user endpoint'}
    except:
        return {'message': errorEnums.get('400')}
def authenticate_user():
    payload = request.get_json()
    if(not payload['email'] or not payload['password']):return {"error":"payload missing email or password"}, 400
    #validate email
    email_is_valid = validate_email(payload['email'])
    if not email_is_valid: return {"error":"email provided is invalid"}, 400
    try:
        token = userService.authenticate_user(payload)
        return {"message":"user authenticated", "data":{"token":token}}, 200
    except Exception as e:
        return {"error":errorEnums['500']}
    
