from functools import wraps
from flask import g, request
from src.services_layer.utilities.constants import errorEnums
from src.services_layer.auth.auth import authLayer

def auth_middleware(f):
    @wraps(f)
    def decorated_function(*args, **kwrags):
        headers = request.headers
        bearer = headers.get('authorization')
        if bearer:
            split_bearer = bearer.split(" ")
            if(len(split_bearer) > 1):
                token = split_bearer[1]
                try:
                    user = authLayer.decodeToken(token)
                    #TODO: verify model users has role for user_role
                    g.user_role = user['role']
                    g.user = user
                except Exception as e:
                    return {"error":errorEnums['403']}
            else:
                return {"error":errorEnums['403']}
        else:
            g.user_role = 'super_admin'
        return f(*args, **kwrags)
        
    return decorated_function
