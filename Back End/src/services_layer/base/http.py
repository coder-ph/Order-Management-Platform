import requests
from  src.startup.logging import Logger


class BaseHook:
    def __init__(self):
        self.logger = Logger('hooks requests')
    
    def get_request(self, url: str, data: dict = None, headers: dict = None):
        try:
            headers = {"Content-Type": "application/json", **(headers or {})}
            response = requests.get(url, params=data, headers=headers)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as err:
            self.logger.error(str(err))
            return str(err)

    def post_request(self, url: str, data: dict = None, headers: dict = None):
        try:
            headers = {"Content-Type": "application/json", **(headers or {})}
            response = requests.post(url, json=data, headers=headers)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as err:
            print('here is the error im looking for :::: ',err.response.text)
            self.logger.error(str(err))
            return str(err)
