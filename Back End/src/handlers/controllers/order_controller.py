from src.services_layer.validators.index import request_has_json, validate_object, validate_ids
from .artifacts import order_creation_art,order_status_check, invoice_artifacts, change_order_status_arts
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

@request_has_json(invoice_artifacts)
def create_invoice(payload):
    payload_is_valid, missing = validate_object(invoice_artifacts, payload)
    if not payload_is_valid: return {"error":"payload missing objects", "data":f"missing params : {missing}"}, 400
    ids_are_valid, invalid_ids = validate_ids([payload['order_id']])
    if not ids_are_valid :return {"error":"one or more ids provided invalid", "data":f"invalid ids: {invalid_ids}"}, 400
    try:
        invoice = ordersService.create_invoice(payload)
        return {"message":"invoice created, and order billed. Please enter your mpesa pin","data":invoice}
    except Exception as e:
        return compile_error(e)

@request_has_json(change_order_status_arts)
def change_order_status(payload):
    payload_is_valid, missing = validate_object(invoice_artifacts, payload)
    if not payload_is_valid: return {"error":"payload missing objects", "data":f"missing params : {missing}"}, 400
    if not payload['status'] in order_status_check: return {"error":"invalid order status","data":f"valid status: {order_status_check}"}
    user = g.user
    try:
        order = ordersService.update_order_status(payload['order_id'],payload['status'], user['id'])
        return {"message":"order status changed","data":order}
    except Exception as e:
        return compile_error(e)


def get_logs():
    try:
        logs = ordersService.get_logs()
        return {"message":"logs","data":logs}
    except Exception as e:
        return compile_error(e)

def test_money():
    try:
        logs = ordersService.test_trans()
        return {"message":"test","data":logs}
    except Exception as e:
        return compile_error(e)  
def get_invoicess():
    try:
        invoices = ordersService.get_invoices()
        return {"message":"invoices","data":invoices}
    except Exception as e:
        return compile_error(e)