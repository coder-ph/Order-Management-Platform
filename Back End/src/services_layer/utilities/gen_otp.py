import secrets
import hashlib
import time

def generate_otp():
    return ''.join(str(secrets.randbelow(10)) for _ in range(6))

def generate_unique_code():
    current_time_millis = int(time.time() * 1000)
    current_time_str = str(current_time_millis)  
    hashed_code = hashlib.sha256(current_time_str.encode()).hexdigest()  
    code = hashed_code[:10]  
    return f'INV_{code.upper()}'

