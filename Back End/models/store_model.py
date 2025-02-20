from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from client import db  

class Store(db.Model):
    __tablename__ = 'stores'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    storename = db.Column(db.String(100), nullable=False, unique=True) 
    user_id = db.Column(db.Integer, ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    location_id = db.Column(db.Integer, ForeignKey('locations.id', ondelete="SET NULL"), nullable=True)

    owner = relationship("User", back_populates="stores")
    location = relationship("Location", back_populates="store")

    def __repr__(self):
        return f"Store('{self.storename}', Owner ID: {self.user_id}, Location ID: {self.location_id})"
