from models.store import Store
from client import db

def create_store(storename, user_id, location_id=None):
    new_store = Store(storename=storename, user_id=user_id, location_id=location_id)
    db.session.add(new_store)
    db.session.commit()
    return new_store

def get_store_by_id(store_id):
    return Store.query.get(store_id)

def get_all_stores():
    return Store.query.all()

def update_store(store_id, storename=None, location_id=None):
    store = Store.query.get(store_id)
    if store:
        if storename:
            store.storename = storename
        if location_id:
            store.location_id = location_id
        db.session.commit()
        return store
    return None

def delete_store(store_id):
    store = Store.query.get(store_id)
    if store:
        db.session.delete(store)
        db.session.commit()
        return True
    return False
