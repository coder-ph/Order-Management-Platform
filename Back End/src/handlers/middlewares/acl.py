##levels based on routes
import os
import json
from functools import wraps 
from flask import request, g, jsonify
from pathlib import Path
from src.services_layer.utilities.constants import errorEnums
def acl_middleware(f):
    @wraps(f)
    def decorated_function(*args, **kwrags):
        request_url = request.url
        path_split = request_url.split('/api/v1/')
        path = path_split[len(path_split)-1]
        method = request.method
        user_role = g.user_role
        BASE_DIR = Path(__file__).resolve().parents[3]
        acl_file_path = BASE_DIR / "acl.json"
        with open(acl_file_path) as file:
            acl_data = json.load(file)
        
        access_controls = acl_data.get(user_role).get(method)
        print('acl data : ',acl_data[user_role])
        for role in acl_data[user_role]['inherit']:
            ac = acl_data[role][method]
            access_controls = access_controls + ac
        # access_controls = acl_data.get(user_role).get(method)
        print(access_controls)
        if(path not in access_controls):
            return  {"error":errorEnums['403-resource']}, 403
        return f(*args, **kwrags)
    return decorated_function
        


    