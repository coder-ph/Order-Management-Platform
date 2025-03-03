from src.services_layer.validators.index import request_has_json, validate_object
from .artifacts import order_creation_art
from src.error.index import compile_error
from src.handlers.services.index import ordersService
from flask import g

@request_has_json(order_creation_art)
def create_order(payload):
    payload_is_valid, missing = validate_object(order_creation_art, payload)
    if not payload_is_valid: return {"error":"payload missing objects", "data":f"missing params : {missing}"}, 400
    order_items = payload['order_items']
    if not type(order_items) == list : return {"error":"order items must be of list type", "data":f"you provided : {type(payload['order_items'])}"}
    try:
        user = g.user
        order_items = payload.pop("order_items")
        order = ordersService.create_order(payload, order_items, user['id'])
        return {"message":"order created", "data":order}
        
    except Exception as e:
        return compile_error(e)

def get_all_orders():
    try:
        orders = ordersService.get_all_orders()
        return {"message":"orders","data":orders}
    except Exception as e:
        return compile_error(e)
        