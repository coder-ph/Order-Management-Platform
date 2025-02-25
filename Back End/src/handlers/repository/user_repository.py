from models.client import  commit_session
from models.index import User, session, list_getter


class UserRepository():
    @commit_session("user")
    def testCreateUser(self,session):
        data = {
            'username':'Sheasdflasdfdddldtond',
            'email':'m.o.shdddasdfedasdflltodn@gmail.com',
            'phonemo':'1ddw443678903',
            'password_hash':'pdasasdfdfadddsswdord_hash'
        }
        newUser = User(username=data['username'], phonemo=data['phonemo'], email=data['email'], password=data['password_hash'])
        session.add(newUser)
        return newUser
    # @list_getter
    def get_all_users(self):
        raw_users = User.query.filter_by()

        letp = User.check_password('pdasasdfdfadddsswdord_hash')

        print(letp)

        return raw_users
    def authenticateUser(self, user:dict):
        password = user.get('password')
        email = user.get('email')
        user = session.query(User).filter_by(email=email).first()
        return user.to_dict()
        
        