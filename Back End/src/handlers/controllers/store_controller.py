from src.services_layer.utilities.constants import *
from src.services_layer.validators.index import *
from src.services_layer.utilities.constants import *
from src.startup.logging import Logger
from src.error.index import is_bad_request, InternalServerErrors, DBSessionErrors, compile_error
from src.services_layer.utilities.index import hash_string
from src.services_layer.validators.index import validate_object, request_has_json
from .artifacts import category_creation_art
from src.services_layer.auth.index import authLayer
from src.handlers.services.index import storeService
from .artifacts import store_creation_art, change_store_status_art
from flask import g

logger = Logger('store controller file')

@request_has_json(store_creation_art)
def create_store(payload):
    payload_is_valid, missing = validate_object(store_creation_art, payload)
    if not payload_is_valid :return {"error":"payload missing objects", "data":f"missing params: {missing}"}, 400
    try:
        payload['owner'] = g.user['id']
        location = payload.pop("location")
        store = storeService.create_store(payload, location)
        return {'message':'store created', 'data':store}
    except Exception as e:
        return compile_error(e)
    
def get_stores():
    try:
        stores = storeService.get_stores()
        return {'message':'stores', 'data':stores}
    except Exception as e:
        return compile_error(e)
@request_has_json(change_store_status_art)
def change_store_status(payload):
    payload_is_valid, missing = validate_object(change_store_status_art, payload)
    if not payload_is_valid :return {"error":"payload missing objects", "data":f"missing params: {missing}"}, 400
    ids_are_valid, invalid_ids = validate_ids([payload['id']])
    if not ids_are_valid :return {"error":"one or more ids provided invalid", "data":f"invalid ids: {invalid_ids}"}, 400
    if not payload['status'] in ['True', 'False']: return {"error":"invalid status type"}
    try:
        store = storeService.change_store_status(payload, g.user['id'])
        return {'message':'store status updated', 'data':store}
    except Exception as e:
        return compile_error(e)
