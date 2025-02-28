from src.services_layer.utilities.constants import *
from src.services_layer.validators.index import *
from src.services_layer.utilities.constants import *
from src.startup.logging import Logger
from src.error.index import is_bad_request, InternalServerErrors, DBSessionErrors, compile_error
from src.services_layer.utilities.index import hash_string
from src.services_layer.validators.index import validate_object, request_has_json
from .artifacts import category_creation_art,product_creation_art
from src.services_layer.auth.index import authLayer
from src.handlers.services.index import productsService
from flask import g
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

@request_has_json(product_creation_art)
def create_product(payload):
    payload_is_valid, missing = validate_object(product_creation_art, payload)
    ids_are_valid, invalid_ids = validate_ids([payload['store']])
    if not payload_is_valid :return {"error":"payload missing objects", "data":f"missing params: {missing}"}, 400
    if not ids_are_valid :return {"error":"one or more ids provided invalid", "data":f"invalid ids: {invalid_ids}"}, 400
    try:
        user_id = g.user['id']
        category = productsService.create_product(payload, user_id)
        return {'message':'product created', 'data':category}
    except Exception as e:
        return compile_error(e)


def update_product(product_id):
    payload = request.get_json()
    if not payload:return {"error":"no payload was provided"}

    has_extra_fields, extra_fields = check_extra_fields(payload)
    ids_are_valid, invalid_ids = validate_ids([product_id])

    if has_extra_fields :return {"error":"payload has extra objects", "data":f"extra params: {extra_fields}"}, 400
    if not ids_are_valid :return {"error":"one or more ids provided invalid", "data":f"invalid ids: {invalid_ids}"}, 400
    try:
        user_id = g.user['id']
        payload['id'] = product_id
        product = productsService.update_product(payload, user_id)
        return {'message':'product updated', 'data':product}
    except Exception as e:
        return compile_error(e)


def delete_product(product_id):
    ids_are_valid, invalid_ids = validate_ids([product_id])
    if not ids_are_valid :return {"error":"one or more ids provided invalid", "data":f"invalid ids: {invalid_ids}"}, 400

    try:
        user_id = g.user['id']
        product = productsService.delete_product(product_id, user_id)
        return {'message':'product deleted', 'data':product}
    except Exception as e:
        return compile_error(e)

def get_all_products():
    try:
        products = productsService.get_all_products()
        return {'message':'all products', 'data':products}
    except Exception as e:
        return compile_error(e)
