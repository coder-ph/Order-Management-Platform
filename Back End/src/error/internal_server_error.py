import sys, os
from  ..startup.logging import Logger
logger = Logger("internal server exeption file")
class InternalServerErrors(Exception):
    def __init__(self, error):
        message = f"internal server error, {error}"
        super().__init__(message)

class NotFound(Exception):
    def __init__(self, m, t, d):
        message = f"{m} of {t} {d} not found"
        super().__init__(message)