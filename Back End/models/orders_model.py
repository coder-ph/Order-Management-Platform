from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey, Numeric, DateTime
from datetime import datetime
from client import db 

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    total_amount = db.Column(Numeric(10, 2), nullable=False)
    order_date = db.Column(DateTime, default=datetime.utcnow)
    status = db.Column(db.String(50), nullable=False, default="Pending")

    user = relationship("User", back_populates="orders")
    order_items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")
    invoices = relationship("Invoice", back_populates="order", cascade="all, delete-orphan")

    def __repr__(self):
        return f"Order(ID: {self.id}, User: {self.user_id}, Status: {self.status}, Total: {self.total_amount})"

class OrderItem(db.Model):
    __tablename__ = 'order_items'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    order_id = db.Column(db.Integer, ForeignKey('orders.id', ondelete="CASCADE"), nullable=False)
    product_id = db.Column(db.Integer, ForeignKey('products.id', ondelete="CASCADE"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(Numeric(10, 2), nullable=False)

    order = relationship("Order", back_populates="order_items")
    product = relationship("Product", back_populates="order_items")

    def __repr__(self):
        return f"OrderItem(Order: {self.order_id}, Product: {self.product_id}, Quantity: {self.quantity})"

class OrderAssignment(db.Model):
    __tablename__ = 'order_assignments'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_assigned = db.Column(db.Integer, ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    order_id = db.Column(db.Integer, ForeignKey('orders.id', ondelete="CASCADE"), nullable=False)

    user = relationship("User", back_populates="order_assignments")
    order = relationship("Order")

    def __repr__(self):
        return f"OrderAssignment(User Assigned: {self.user_assigned}, Order ID: {self.order_id})"

class Invoice(db.Model):
    __tablename__ = 'invoices'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    order_id = db.Column(db.Integer, ForeignKey('orders.id', ondelete="CASCADE"), nullable=False)
    amount_due = db.Column(Numeric(10, 2), nullable=False)
    due_date = db.Column(DateTime, nullable=False)
    status = db.Column(db.String(50), nullable=False, default="Unpaid")

    order = relationship("Order", back_populates="invoices")

    def __repr__(self):
        return f"Invoice(Order: {self.order_id}, Amount Due: {self.amount_due}, Status: {self.status})"
