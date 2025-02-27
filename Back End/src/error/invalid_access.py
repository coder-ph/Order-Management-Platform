class AccessLevelError(Exception):
    def __init__(self, rights,  object):
        message = f"illegal operation : you don't have {rights} rights to this {object}"
        super().__init__(message)