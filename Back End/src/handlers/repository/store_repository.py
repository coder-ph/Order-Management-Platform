from models.client import  commit_session, list_getter, update_session, commit_delete_session
from models.index import Store, session
from .location_repository import LocationRepository
import uuid

class StoreRepository():
    def __init__(self,location_repo:LocationRepository):
        self.location_repo = location_repo
    @commit_session("store")
    def create_store(self, store, location):
        newStore = Store(name=store['name'],description=store['description'], owner_id=store['owner'], location_id=uuid.UUID(location['id']))
        return newStore
    
    @list_getter
    def get_stores(self):
        return Store.query.all()
        
    def get_store_by_id(self, id):
        return session.query(Store).filter_by(id=uuid.UUID(id)).first()

    @update_session("store")
    def change_store_status(self, store:Store, status:bool)->Store:
        store.status = True if status == 'True' else False
        return store
