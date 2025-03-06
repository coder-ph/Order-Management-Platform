from .env_error import *
from .db_session_error import *
from .internal_server_error import *
from .invalid_objects import *
from .invalid_access import *
from .apiErrors import *

def is_bad_request(e):
    return isinstance(e,DBSessionErrors) or isinstance(e,ApiErrors) or isinstance(e, NotFound) or isinstance(e, ObjectNotFound) or isinstance(e, InvalidObjectValue) or isinstance(e, AccessLevelError)

def compile_error(e):
    if is_bad_request(e):
        print(str(e))
        return {"error":str(e)}, 400
    elif isinstance(e, InternalServerErrors):
        return {"error": str(e)}, 500
    else:
        print(str(e))
        return {"error":'internal server error'}, 500