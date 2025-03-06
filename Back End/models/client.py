from flask_sqlalchemy import SQLAlchemy
from src.startup.init import app
from src.config.config_map import appConfig
from flask_bcrypt import Bcrypt
from functools import wraps
from src.error.index import DBSessionErrors, handle_sqlalchemy_error
from src.startup.logging import Logger
from flask_migrate import Migrate
logger = Logger("db init file")
app.config['SQLALCHEMY_DATABASE_URI'] = appConfig.app.DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
session = db.session
migrate = Migrate(app, db)

def create_tables():
    with app.app_context():
        db.create_all()
        logger.info("Database tables created successfully!")

def setup_db():
    logger.info("Setting up the database...")
    create_tables()
    logger.info("Database setup completed!")

def commit_session(model_name=None):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            session = db.session 
            try:
                result = func(*args,**kwargs) 
                session.add(result)
                session.commit()
                
                if isinstance(result, db.Model):  
                    session.refresh(result) 
                
                print("Transaction complete")
                return result.to_dict()
            except Exception as e:
                # print(e)
                session.rollback() 
                is_handled = handle_sqlalchemy_error(model_name,e, 'create')
                if is_handled:
                    raise DBSessionErrors(is_handled)
            finally:
                session.close()
        return wrapper
    return decorator

def bulk_commit_insert_session(model=None):
    model_name = model.__tablename__
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            session = db.session

            try:
                data = func(*args, **kwargs)

                if not data:
                    return [] 
                
                session.bulk_insert_mappings(model, data)
                session.commit()
                
                print("Transaction complete")
                print(data)

                return data 

            except Exception as e:

                session.rollback()
                is_handled = handle_sqlalchemy_error(model_name, e, 'create')
                if is_handled:
                    raise DBSessionErrors(is_handled)
            finally:
                session.close()
        
        return wrapper
    return decorator

def commit_delete_session(model_name=None):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            session = db.session 
            try:
                result = func(*args,**kwargs) 
                session.delete(result)
                session.commit()
                
                print("Transaction complete")
                return result.to_dict()
            except Exception as e:
                session.rollback() 
                is_handled = handle_sqlalchemy_error(model_name,e, 'delete')
                if is_handled:
                    raise DBSessionErrors(is_handled)
            finally:
                session.close()
        return wrapper
    return decorator

def update_session(model_name=None):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            session = db.session 
            try:
                result = func(*args,**kwargs) 
                session.commit()
                
                if isinstance(result, db.Model):  
                    session.refresh(result) 
                
                logger.info("Transaction complete 2")
                return result.to_dict()
            except Exception as e:
                session.rollback() 
                is_handled = handle_sqlalchemy_error(model_name,e, 'update')
                if is_handled:
                    raise DBSessionErrors(is_handled)
            finally:
                session.close()
        return wrapper
    return decorator

def list_getter(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        list = func(*args, **kwargs)
        return [item.to_dict() for item in list]
    return wrapper
