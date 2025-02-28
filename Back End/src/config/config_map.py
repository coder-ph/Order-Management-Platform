from .config import config
class appEnvs:
    PY_ENV = config('PY_ENV')
    API_KEY = config('API_KEY')
    PORT = config('PORT')
    BASE_URL= config('BASE_URL')
    DATABASE_URL=config('DATABASE_URL')

class daraja:
    DARAJA_SECRET = config('DARAJA_SECRET')
    DARAJA_TOKEN = config('DARAJA_TOKEN')

class jwt:
    JWT_SECRET = config("JWT_SECRET")

class mail:
    MAIL_PASSWORD = config("MAIL_PASSWORD")
    MAIL_DEFAULT_SENDER = config("MAIL_DEFAULT_SENDER")
    MAIL_USERNAME = config("MAIL_USERNAME")
    MAIL_SERVER = config("MAIL_SERVER")
    MAIL_PORT = config("MAIL_PORT")
    
class appConfig: 
    app = appEnvs
    daraja = daraja
    jwt = jwt
    mail = mail
