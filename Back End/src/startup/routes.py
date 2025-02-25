from flask_restful import Resource, Api
from src.config.config_map import appConfig
from src.services_layer.utilities.constants import errorEnums
from src.handlers.middlewares.index import *
from src.routers.user_routes import userRoutes
from src.services_layer.auth.auth import *

class LiveProbe(Resource):
    @auth_middleware
    @acl_middleware
    def get(self):
        try:
            return {"messgae":f"server running on port : {appConfig.app.PORT}"}, 200
        except Exception as e:
            print(str(e))
            return {"error": errorEnums["500"]}, 500


def routerSetup(api):
    api.add_resource(LiveProbe, f'{appConfig.app.BASE_URL}/liveprobe')
    userRoutes(api)
    


# from src.config.config_map import appConfig
# from flask_bcrypt import Bcrypt
# from functools import wraps
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker, declarative_base, scoped_session
# from src.startup.logging import Logger
# from src.error.index import DBSessionErrors

# logger = Logger("db init file")

# sync_engine = create_engine(appConfig.app.DATABASE_URL, echo=True)

# SessionLocal = scoped_session(sessionmaker(bind=sync_engine, autoflush=False, autocommit=False))

# Base = declarative_base()
# bcrypt = Bcrypt()

# def create_tables():
#     Base.metadata.create_all(sync_engine)
#     logger.info("Database initialized successfully")

# def setup():
#     create_tables()
#     logger.info("Database setup completed")

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# def commit_session(func):
#     @wraps(func)
#     def wrapper(*args, **kwargs):
#         session = kwargs.get("session") or SessionLocal()
#         try:
#             result = func(*args, session=session, **kwargs)
#             session.commit()
#             logger.info("Transaction committed successfully")
#             return result
#         except Exception as e:
#             session.rollback()
#             logger.error(f"Transaction failed: {e}")
#             raise DBSessionErrors(e)
#         finally:
#             session.close()
#     return wrapper
