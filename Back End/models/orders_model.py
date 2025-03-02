from .client import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, UUID, ForeignKey
import uuid

class Order(db.Model):
    __tablename__ = "orders"
    
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    total_amount: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    status: Mapped[str] = mapped_column(String(15), nullable=True)

    destination_id: Mapped[uuid.UUID]= mapped_column(UUID(as_uuid=True), ForeignKey('locations.id', ondelete="SET NULL"), nullable=False)
    user_id:Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey('users.id', ondelete="SET NULL"), nullable=False)

    user = relationship("User", back_populates="orders")
    order_items = relationship("OrderItem", back_populates="Order", cascade="all, delete-orphan")
    destination = relationship("Location", back_populates="order")
    
class OrderItem(db.Model):
    __tablename__ = "order_items"
    
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)

    product_id:Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("products.id", ondelete="SET NULL"), nullable=False)
    order_id:Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)

    order = relationship("Order", back_populates="order_items")
    
class Invoice(db.Model):
    __tablename__ = "invoices"
    
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    invoice_no: Mapped[uuid.UUID] = mapped_column(String(8), unique=True, nullable=False)
    billed_phone: Mapped[uuid.UUID] = mapped_column(String(9), nullable=False)

    order_id:Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("orders.id", ondelete="SET NULL"), nullable=False)
