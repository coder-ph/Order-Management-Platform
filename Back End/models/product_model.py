from sqlalchemy.orm import relationship
from client import db
from sqlalchemy import ForeignKey

class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    product_name = db.Column(db.String, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String)
    category_id = db.Column(db.Integer, ForeignKey('categories.id', ondelete="CASCADE"), nullable=False)
    
    category = relationship("Category", back_populates="products")
    order_items = relationship("OrderItem", back_populates="product")

class Category(db.Model):
    __tablename__ = 'categories'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False, unique=True)
    
    products = relationship("Product", back_populates="category")
