import jwt
from src.config.config_map import appConfig
from src.startup.logging import Logger

logger = Logger('auth layer file ')
class AuthLayer:
    def signToken(self, payload):
        token = jwt.encode(payload, appConfig.jwt.JWT_SECRET)
        logger.info('token created', token)
        return token
    def decodeToken(self, token):
        result = jwt.decode(token, appConfig.jwt.JWT_SECRET, algorithms=["HS256"])
        print('here is the resutl : ',result)

authLayer = AuthLayer()