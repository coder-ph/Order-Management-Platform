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
class appConfig: 
    app = appEnvs
    daraja = daraja
