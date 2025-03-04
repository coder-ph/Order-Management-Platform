from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy import ForeignKey, DateTime, String, Integer, Float
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from models.client import db
import uuid

class Category(db.Model):
    __tablename__ = 'categories'
    
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    
    Products = relationship("Product", back_populates='Category')
    
    def to_dict(self):
        return {
            "id":str(self.id),
            "name":self.name
        }
    def __repr__(self):
        return f"Category('{self.name}')"

class Product(db.Model):
    __tablename__ = 'products'
    
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, default=0)
    # price:Mapped[float] = mapped_column(Float, default=0.0, nullabe=True)
    description: Mapped[str] = mapped_column(String(15), nullable=True)
    price: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    
    created_at: Mapped[DateTime] = mapped_column(DateTime, default=func.now())
    updated_at: Mapped[DateTime] = mapped_column(DateTime, default=func.now(), onupdate=func.now())

    category:Mapped[String] = mapped_column(String[50], ForeignKey('categories.name', ondelete="SET NULL"), nullable=False)
    store:Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey('stores.id', ondelete="SET NULL"), nullable=False)

    Store = relationship("Store", back_populates="Products")
    Category = relationship("Category", back_populates='Products')
    OrderItems = relationship("OrderItem", back_populates='Product')
    
    def to_dict(self):
        return {
            "id":str(self.id), 
            "name":self.name,
            "price":self.price,
            "quantity":self.quantity,
            "description":self.description,
            "category":self.category,
            "store":str(self.store)
        }

    def __repr__(self):
        return f"Product('{self.name}', Quantity: {self.quantity}, Category ID: {self.category})"
