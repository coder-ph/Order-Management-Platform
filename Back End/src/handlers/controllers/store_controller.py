from flask import jsonify, request
from services.store_service import create_store, get_store_by_id, get_all_stores, update_store, delete_store

def create_store_controller():
    data = request.get_json()
    storename = data.get('storename')
    user_id = data.get('user_id')
    location_id = data.get('location_id')

    if not storename or not user_id:
        return jsonify({'error': 'storename and user_id are required'}), 400

    store = create_store(storename, user_id, location_id)
    return jsonify({'message': 'Store created successfully', 'store': store.storename}), 201

def get_store_controller(store_id):
    store = get_store_by_id(store_id)
    if store:
        return jsonify({'storename': store.storename, 'user_id': store.user_id, 'location_id': store.location_id})
    return jsonify({'error': 'Store not found'}), 404

def get_all_stores_controller():
    stores = get_all_stores()
    return jsonify([{'id': store.id, 'storename': store.storename, 'user_id': store.user_id, 'location_id': store.location_id} for store in stores])

def update_store_controller(store_id):
    data = request.get_json()
    storename = data.get('storename')
    location_id = data.get('location_id')

    store = update_store(store_id, storename, location_id)
    if store:
        return jsonify({'message': 'Store updated successfully', 'storename': store.storename})
    return jsonify({'error': 'Store not found'}), 404

def delete_store_controller(store_id):
    if delete_store(store_id):
        return jsonify({'message': 'Store deleted successfully'}), 200
    return jsonify({'error': 'Store not found'}), 404
