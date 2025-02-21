from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from client import db  

class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    product_name = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(255), nullable=True)
    category_id = db.Column(db.Integer, ForeignKey('categories.id', ondelete="CASCADE"), nullable=False)
    
    category = relationship("Category", back_populates="products")
    order_items = relationship("OrderItem", back_populates="product") 

    def __repr__(self):
        return f"Product('{self.product_name}', Quantity: {self.quantity}, Category ID: {self.category_id})"

class Category(db.Model):
    __tablename__ = 'categories'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    
    products = relationship("Product", back_populates="category")

    def __repr__(self):
        return f"Category('{self.name}')"
