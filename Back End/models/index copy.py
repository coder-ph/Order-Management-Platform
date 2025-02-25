from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey, Numeric, DateTime
from datetime import datetime


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'  
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app) 

class Category(db.Model):
    __tablename__ = 'categories'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False, unique=True)
    
    products = relationship("Product", back_populates="category")

class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    product_name = db.Column(db.String, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String)
    category_id = db.Column(db.Integer, ForeignKey('categories.id', ondelete="CASCADE"), nullable=False)
    
    category = relationship("Category", back_populates="products")
    order_items = relationship("OrderItem", back_populates="product")

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    role = db.Column(db.String, nullable=False)
    phone_no = db.Column(db.String, unique=True)
    address = db.Column(db.String)
    location_id = db.Column(db.Integer, ForeignKey('locations.id', ondelete="SET NULL"))

    stores = relationship("Store", back_populates="owner")
    orders = relationship("OrderItem", back_populates="user")
    order_assignments = relationship("OrderAssignment", back_populates="user")

class Store(db.Model):
    __tablename__ = 'stores'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    storename = db.Column(db.String, nullable=False, unique=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    location_id = db.Column(db.Integer, ForeignKey('locations.id', ondelete="SET NULL"))

    owner = relationship("User", back_populates="stores")
    location = relationship("Location", back_populates="store")

class Location(db.Model):
    __tablename__ = 'locations'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    longitude = db.Column(db.String, nullable=False)
    latitude = db.Column(db.String, nullable=False)
    
    store = relationship("Store", back_populates="location", uselist=False)

class OrderItem(db.Model):
    __tablename__ = 'order_items'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    price = db.Column(Numeric, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    product_id = db.Column(db.Integer, ForeignKey('products.id', ondelete="CASCADE"), nullable=False)
    
    user = relationship("User", back_populates="orders")
    product = relationship("Product", back_populates="order_items")

class OrderAssignment(db.Model):
    __tablename__ = 'order_assignments'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_assigned = db.Column(db.Integer, ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    order_id = db.Column(db.Integer, ForeignKey('order_items.id', ondelete="CASCADE"), nullable=False)

    user = relationship("User", back_populates="order_assignments")

class Invoice(db.Model):
    __tablename__ = 'invoices'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    payment_method = db.Column(db.String, nullable=False)
    invoice_no = db.Column(db.String, unique=True, nullable=False)
    status = db.Column(db.String, nullable=False)
    created_at = db.Column(DateTime, default=datetime.utcnow, nullable=False)
    order_id = db.Column(db.Integer, ForeignKey('order_items.id', ondelete="CASCADE"), nullable=False)

    order = relationship("OrderItem", back_populates="invoices")

OrderItem.invoices = relationship("Invoice", back_populates="order")


if __name__ == '__main__':
    with app.app_context():
        db.create_all()

