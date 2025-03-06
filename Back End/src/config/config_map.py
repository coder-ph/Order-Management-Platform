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
    
class daraja:
    BASE_API_ENDPOINT = config("DARAJA_BASE_API_ENDPOINT")
    CLIENTKEY = config('DARAJA_CLIENTKEY')
    CLIENTSECRET = config("DARAJA_CLIENTSECRET")
    DARAJA_WORKING_TEST_TOKEN = config("DARAJA_WORKING_TEST_TOKEN")
    SHORT_CODE = config("DARAJA_SHORT_CODE")
    PASSKEY = config("DARAJA_PASSKEY")
    TRANSACTION_TYPE = config("DARAJA_TRANSACTION_TYPE")
    BASE_AUTH_ENDPOINT = config("DARAJA_BASE_AUTH_ENDPOINT")
    
class appConfig: 
    app = appEnvs
    daraja = daraja
    jwt = jwt
    mail = mail
    daraja = daraja
