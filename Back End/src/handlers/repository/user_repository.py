from models.client import  commit_session, update_session
from models.index import User, session, list_getter
from .location_repository import LocationRepository
import uuid
class UserRepository():
    def __init__(self,location_repo:LocationRepository):
        self.location_repo = location_repo
    @commit_session("user")
    def create_user(self, user, location):
        location = self.location_repo.create_location(location)
        print(location)
        newUser = User(first_name=user['first_name'],last_name=user['last_name'], phone_no=user['phone_no'], email=user['email'], password=user['password'], location_id=uuid.UUID(location['id']))
        return newUser
    @list_getter
    def get_all_users(self):
        raw_users = User.query.filter_by()

        letp = User.check_password('pdasasdfdfadddsswdord_hash')

        print(letp)

        return raw_users
    def get_user_by_email(self, email):
        user = session.query(User).filter_by(email=email).first()
        return user
    @update_session('user')
    def update_user_password(self, user:User, password:str)->User:
        user.password = password
        return user

        
        
        