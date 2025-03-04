from .client import db
from .model_enums import OrderStatus
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, UUID, ForeignKey, Enum, Float, Integer
import uuid

class Order(db.Model):
    __tablename__ = "orders"
    
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    total_amount: Mapped[float] = mapped_column(Float, nullable=False)
    status: Mapped[str] = mapped_column(Enum(OrderStatus), nullable=True, default=OrderStatus.PENDING)

    destination_id: Mapped[uuid.UUID]= mapped_column(UUID(as_uuid=True), ForeignKey('locations.id', ondelete="SET NULL"), nullable=False)
    user_id:Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey('users.id', ondelete="SET NULL"), nullable=False)

    user = relationship("User", back_populates="orders")
    OrderItems = relationship("OrderItem", back_populates="Order", cascade="all, delete-orphan")
    destination = relationship("Location", back_populates="order")
    
    def to_dict(self):
        order_items =[]
        for item in self.OrderItems:
            item = item.to_dict()
            item.pop("order_id")
            order_items.append(item)
        return {
            'id':str(self.id),
            'total_amount':self.total_amount,
            'status':self.status.value,
            'user_id':str(self.user_id),
            'destination':self.destination.to_dict(),
            'order_items':order_items
        }
        
class OrderItem(db.Model):
    __tablename__ = "order_items"
    
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    quantity:Mapped[int] = mapped_column(Integer, nullable=False)
    product_id:Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("products.id", ondelete="SET NULL"), nullable=False)
    order_id:Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)

    Order = relationship("Order", back_populates="OrderItems")
    Product = relationship("Product", back_populates="OrderItems")
    
    def to_dict(self):
        product = self.Product.to_dict()
        product.pop('store')
        
        return {
            'product_id':str(self.product_id),
            'order_id':str(self.order_id),
            'quantity':self.quantity,
            'product':product
        }
    
class Invoice(db.Model):
    __tablename__ = "invoices"
    
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    invoice_no: Mapped[uuid.UUID] = mapped_column(String(8), unique=True, nullable=False)
    billed_phone: Mapped[uuid.UUID] = mapped_column(String(9), nullable=False)

    order_id:Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("orders.id", ondelete="SET NULL"), nullable=False)
