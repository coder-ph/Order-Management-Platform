import sys, os
from  ..startup.logging import Logger
import logging
import traceback
from sqlalchemy.exc import (
    IntegrityError, OperationalError, ProgrammingError, DataError,
    InterfaceError, InternalError, StatementError, DisconnectionError,
    CompileError, TimeoutError
)
from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound
from .internal_server_error import InternalServerErrors

logger = Logger("db session exeption file")
class DBSessionErrors(Exception):
    def __init__(self,e):
        super().__init__(e)

def handle_sqlalchemy_error(model,e,type='create'):
    error_message = str(e.orig) if hasattr(e, "orig") else str(e)

    if isinstance(e, IntegrityError):
        if "duplicate" in error_message or "UNIQUE constraint failed" in error_message:
            return f"could not {type} {model}, record already exist"
        elif "FOREIGN KEY constraint" in error_message or "violates foreign key constraint" in error_message:
            return f"could not {type} {model}, foreign key contraint"
        else:
            return f"could not {type} {model}, database integrity error"

    elif isinstance(e, OperationalError):
        return f"could not {type} {model}, connection or migration error"

    elif isinstance(e, ProgrammingError):
        return f"could not {type} {model}, syntax error"

    elif isinstance(e, DataError):
        return f"could not {type} {model}, invalid data type"

    elif isinstance(e, InterfaceError):
        return f"could not {type} {model}, drive issue"

    elif isinstance(e, InternalError):
        message = f"could not {type} {model}, database error"
        raise InternalServerErrors(message)

    elif isinstance(e, StatementError):
        return f"could not {type} {model}, statement error"

    elif isinstance(e, DisconnectionError):
        message =  f"could not {type} {model}, database connection lost"
        raise InternalServerErrors(message)

    elif isinstance(e, CompileError):
        return f"could not {type} {model}, compilation error"

    elif isinstance(e, TimeoutError):
        return f"could not {type} {model}, request timeout"

    elif isinstance(e, NoResultFound):
        return f"could not {type} {model}, record not found"

    else:
        message = f"could not {type} {model}"
        print(e)
        raise InternalServerErrors(message)