from src.config.config_map import appConfig
from src.error.index import ApiErrors
from .utils import format_phone, get_formatted_timestamp
from src.services_layer.utilities.index import base64_concatx
from src.services_layer.base.index import BaseHook
from .token import AuthToken

class Daraja:
    def __init__(self):
        self.base_hook = BaseHook()
    
    def stk_push(self, amount: int, phone: str, transaction_id: str, merchant: str):
        url = f"{appConfig.daraja.BASE_API_ENDPOINT}stkpush/v1/processrequest"
        auth_token = AuthToken.get_auth_token()
        auth_header = {"Authorization": f"Bearer {auth_token}"}
        
        time_stamp = get_formatted_timestamp()
        password = base64_concatx([
            appConfig.daraja.SHORT_CODE,
            appConfig.daraja.PASSKEY , 
            time_stamp,
        ])
        
        data = {
            "BusinessShortCode": int(appConfig.daraja.SHORT_CODE),
            "Password": password,
            "Timestamp": time_stamp,
            "TransactionType": appConfig.daraja.TRANSACTION_TYPE,
            "Amount": amount,
            "PartyA": format_phone(phone),
            "PartyB": int(appConfig.daraja.SHORT_CODE),
            "PhoneNumber": format_phone(phone),
            "CallBackURL": "https://another-qhml.onrender.com/api/v1/transactions/confirm",
            "AccountReference": merchant,
            "TransactionDesc": transaction_id,
        }
        
        res = self.base_hook.post_request(url, data, auth_header)
        print(res)
        if res.get("ResponseCode") != "0":
            raise ApiErrors()
        return res
