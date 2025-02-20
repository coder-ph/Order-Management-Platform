from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

db = SQLAlchemy()

class Location(db.Model):
    __tablename__ = 'locations'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    longitude = Column(String, nullable=False)
    latitude = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=True)
    store_id = Column(Integer, ForeignKey('stores.id'), nullable=True)
    order_id = Column(Integer, ForeignKey('order_items.id'), nullable=True)
    
    user = relationship("User", back_populates="location")
    store = relationship("Store", back_populates="location")
    order_item = relationship("OrderItem", back_populates="location")
  
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
