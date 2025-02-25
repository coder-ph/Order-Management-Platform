from .env_error import *
from .db_session_error import *
from .internal_server_error import *

def is_bad_request(e):
    return isinstance(e,DBSessionErrors) or isinstance(e, NotFound)

def compile_error(e):
    if is_bad_request(e):
        print(str(e))
        return {"message":str(e)}, 400
    elif isinstance(e, InternalServerErrors):
        return {"message": str(e)}, 500
    else:
        print(str(e))
        return {"message":'internal server error'}, 500