import time
from src.config.config_map import appConfig
from src.error.index import ApiErrors
from src.services_layer.utilities.index import base64_concat
from src.services_layer.base.index import BaseHook



class AuthToken:
    _token: str = None
    _expiry_time: float = 0

    @classmethod
    def get_auth_token(cls) -> str:
        if cls._token and time.time() < cls._expiry_time:
            return cls._token

        url = f"{appConfig.daraja.BASE_AUTH_ENDPOINT}generate?grant_type=client_credentials"
        auth_header = {
            "Authorization": f"Basic {base64_concat([appConfig.daraja.CLIENTKEY, appConfig.daraja.CLIENTSECRET])}"
        }

        base_hook = BaseHook()
        res = base_hook.get_request(url, {}, auth_header)
        if "access_token" not in res:
            raise ApiErrors()
        
        cls._token = res["access_token"]
        cls._expiry_time = time.time() + 3 
        
        return cls._token
