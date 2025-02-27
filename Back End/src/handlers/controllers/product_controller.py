from src.services_layer.utilities.constants import *
from src.services_layer.validators.index import *
from src.services_layer.utilities.constants import *
from src.startup.logging import Logger
from src.error.index import is_bad_request, InternalServerErrors, DBSessionErrors, compile_error
from src.services_layer.utilities.index import hash_string
from src.services_layer.validators.index import validate_object, request_has_json
from .artifacts import category_creation_art
from src.services_layer.auth.index import authLayer
from src.handlers.services.index import productsService

logger = Logger('products controller file')

@request_has_json(category_creation_art)
def create_category(payload):
    payload_is_valid, missing = validate_object(category_creation_art, payload)
    if not payload_is_valid :return {"error":"payload missing objects", "data":f"missing params: {missing}"}, 400
    try:
        category = productsService.create_category(payload)
        return {'message':'category created', 'data':category}
    except Exception as e:
        return compile_error(e)

@request_has_json(category_creation_art)
def create_category(payload):
    payload_is_valid, missing = validate_object(category_creation_art, payload)
    if not payload_is_valid :return {"error":"payload missing objects", "data":f"missing params: {missing}"}, 400
    try:
        category = productsService.create_category(payload)
        return {'message':'category created', 'data':category}
    except Exception as e:
        return compile_error(e)
def get_categories():
    try:
        categories = productsService.get_categories()
        return {'message':'categories', 'data':categories}
    except Exception as e:
        return compile_error(e)
    
