from models.index import bcrypt
def hash_string(string):
    return bcrypt.generate_password_hash(string).decode("utf-8")
def check_hash(hash,string):
    return bcrypt.check_password_hash(hash,string)