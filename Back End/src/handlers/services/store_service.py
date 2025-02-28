from src.services_layer.auth.auth import *
from src.handlers.repository.index import UserRepository, LocationRepository, StoreRepository
from src.error.index import ObjectNotFound, AccessLevelError
from models.client import commit_session
import uuid
class StoreService():
    def __init__(self, store_repository:StoreRepository,  user_repository:UserRepository, location_repository:LocationRepository):
        self.user_repo = user_repository
        self.location_repo = location_repository
        self.store_repo = store_repository
        
    def create_store(self, store, location):
        owner_id = store['owner']
        owner = self.user_repo.get_user_by_id(owner_id)
        if not owner: raise ObjectNotFound('user', owner_id, 'id')
        location = self.location_repo.create_location(location)
        newStore = self.store_repo.create_store(store, location)
        return newStore
    
    def get_stores(self):
        return self.store_repo.get_stores()
    
    def change_store_status(self, payload, user_id):
        store = self.store_repo.get_store_by_id(payload['id'])
        if not store: raise ObjectNotFound('store', payload['id'], 'id')
        if not user_id == str(store.owner.id): raise AccessLevelError('status update', 'store')
        store = self.store_repo.change_store_status(store, payload['status'])
        return store


        
        
