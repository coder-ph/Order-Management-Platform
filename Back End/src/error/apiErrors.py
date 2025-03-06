class ApiErrors(Exception):
    def __init__(self):
        message = "internal webhook error"
        super().__init__(message)