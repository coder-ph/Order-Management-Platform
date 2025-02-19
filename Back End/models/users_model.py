from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    phonemo = db.Column(db.Integer(50))
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
 def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)
   def __repr__(self):
        return f"User('{self.username}', '{self.email}')"
