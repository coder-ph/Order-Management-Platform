from sqlalchemy.orm import relationship
from client import db
from sqlalchemy import ForeignKey, Numeric, DateTime

# orders, orderItems, invoice
class OrderAssignment(db.Model):
    __tablename__ = 'order_assignments'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_assigned = db.Column(db.Integer, ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    order_id = db.Column(db.Integer, ForeignKey('order_items.id', ondelete="CASCADE"), nullable=False)

    user = relationship("User", back_populates="order_assignments")
    