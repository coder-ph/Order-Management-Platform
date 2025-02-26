from functools import wraps
from flask import request

def validate_object(params: list, payload: dict, parent_key=""):
    missing = []
    print(params)
    for param in params:
        keys = param.split(".", 1)
        key = keys[0]
        
        if key in payload:
            if isinstance(payload[key], dict) and len(keys) > 1:
                is_valid, sub_missing = validate_object([keys[1]], payload[key], f"{parent_key}{key}.")
                if not is_valid:
                    missing.extend(sub_missing)
        else:
            missing.append(f"{parent_key}{param}")

    return (False, missing) if missing else (True, [])

def request_has_json(payload_objects=[]):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            payload = request.get_data()
            if not payload:
                return {'error': 'no payload was provided', 'data':f'required objects : {(payload_objects)}'}, 400 
            return func(*args, payload=request.get_json(), **kwargs)
        return wrapper
    return decorator

def request_has_params(payload_objects=[]):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            payload = {}
            for a in request.args:
                payload[a] = request.args.get(a)
            if not len(payload) > 0:
                return {'error': 'no payload was provided', 'data':f'required objects : {(payload_objects)}'}, 400 
            return func(*args, payload=payload, **kwargs)
        return wrapper
    return decorator
