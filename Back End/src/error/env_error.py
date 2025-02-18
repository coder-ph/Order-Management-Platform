import sys, os
from  ..startup.logging import Logger
logger = Logger("env exeption file")
class EnvErrors(Exception):
    def __init__(self, env):
        message = f"env : {env} not found, killing process..."
        super().__init__(message)
        