import os
from dotenv import load_dotenv
from src.startup.logging import Logger
from ..error.env_error import EnvErrors
logger = Logger('config file')
load_dotenv()
def config(env):
    if os.getenv(env):
        return os.getenv(env)
    else:
        raise EnvErrors(env)
        
    