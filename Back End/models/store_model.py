from sqlalchemy.orm import relationship
from client import db
from sqlalchemy import ForeignKey

class Store(db.Model):
    __tablename__ = 'stores'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    storename = db.Column(db.String, nullable=False, unique=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    location_id = db.Column(db.Integer, ForeignKey('locations.id', ondelete="SET NULL"))

    owner = relationship("User", back_populates="stores")
    location = relationship("Location", back_populates="store")
