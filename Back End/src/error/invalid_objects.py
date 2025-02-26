class ObjectNotFound(Exception):
    def __init__(self, object, key, key_name=None):
        message = f"{object} of {key_name if key_name else 'key'} : {key} was not found"
        super().__init__(message)
class InvalidObjectValue(Exception):
    def __init__(self, query_type, key, key_id=None):
        super().__init__(f"{query_type} failed: the provided {key} for {key_id if key_id else 'value'} was invalid")