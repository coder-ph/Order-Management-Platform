from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey, Numeric, DateTime
from datetime import datetime

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

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


class Store(db.Model):
    __tablename__ = 'stores'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    storename = db.Column(db.String, nullable=False, unique=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    location_id = db.Column(db.Integer, ForeignKey('locations.id', ondelete="SET NULL"))

    owner = relationship("User", back_populates="stores")
    location = relationship("Location", back_populates="store")


class OrderAssignment(db.Model):
    __tablename__ = 'order_assignments'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_assigned = db.Column(db.Integer, ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    order_id = db.Column(db.Integer, ForeignKey('order_items.id', ondelete="CASCADE"), nullable=False)

    user = relationship("User", back_populates="order_assignments")


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
