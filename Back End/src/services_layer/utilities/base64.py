import base64

def base64_concat(payload: list) -> str:
    string = ":".join(payload)
    return base64.b64encode(string.encode()).decode()


def base64_concatx(payload: list) -> str:
    string = "".join(payload)
    return base64.b64encode(string.encode()).decode()