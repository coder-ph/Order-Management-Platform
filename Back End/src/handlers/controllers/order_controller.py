from src.services_layer.validators.index import request_has_json, validate_object, validate_ids
from .artifacts import order_creation_art
from src.error.index import compile_error
from src.handlers.services.index import ordersService
from flask import g

@request_has_json(order_creation_art)
def create_order(payload):
    payload_is_valid, missing = validate_object(order_creation_art, payload)
    if not payload_is_valid: return {"error":"payload missing objects", "data":f"missing params : {missing}"}, 400
    order_items = payload['order_items']
    if not type(order_items) == list : return {"error":"order items must be of list type", "data":f"you provided : {type(payload['order_items']).__name__}"}
    for item in order_items:
        if not type(item) == dict: return {"error":"individual order item must be of object type", "data":f"one or more items is : {type(item).__name__}"}
        params_valid, missing_params = validate_object(['product_id', 'quantity'], item)
        if not params_valid: return {"error":"one of your payloads have missing objects", "data":f"missing params : {missing_params}"}, 400
    ids_are_valid, invalid_ids = validate_ids(list(map(lambda x: x['product_id'], order_items)))
    if not ids_are_valid :return {"error":"one or more ids provided invalid", "data":f"invalid ids: {invalid_ids}"}, 400
    try:
        user = g.user
        order_items = payload.pop("order_items")
        destination = payload.pop("location")
        order = ordersService.create_order(payload, order_items,destination, user['id'])
        return {"message":"order created", "data":order}
        
    except Exception as e:
        return compile_error(e)

def get_all_orders():
    try:
        orders = ordersService.get_all_orders()
        return {"message":"orders","data":orders}
    except Exception as e:
        return compile_error(e)

def get_merchant_orders(store_id):
    ids_are_valid, invalid_ids = validate_ids([store_id])
    if not ids_are_valid :return {"error":"one or more ids provided invalid", "data":f"invalid ids: {invalid_ids}"}, 400
    user = g.user
    try:
        orders = ordersService.get_merchant_orders(store_id, user['id'])
        return {"message":"merchant orders","data":orders}
    except Exception as e:
        return compile_error(e)

def get_user_orders():
    user = g.user
    try:
        
        orders = ordersService.get_user_orders(user['id'])
        return {"message":"user orders","data":orders}
    except Exception as e:
        return compile_error(e)
