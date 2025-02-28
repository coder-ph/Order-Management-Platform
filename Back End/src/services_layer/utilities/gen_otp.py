import secrets

def generate_otp():
    return ''.join(str(secrets.randbelow(10)) for _ in range(6))