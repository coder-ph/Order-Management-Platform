from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy import ForeignKey, DateTime, String, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from models.client import db
import uuid

class Category(db.Model):
    __tablename__ = 'categories'
    
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    
    products = relationship("Product", back_populates='category')
    
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
    description: Mapped[str] = mapped_column(String(15), nullable=True)
    
    created_at: Mapped[DateTime] = mapped_column(DateTime, default=func.now())
    updated_at: Mapped[DateTime] = mapped_column(DateTime, default=func.now(), onupdate=func.now())

    category_id:Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey('categories.id', ondelete="SET NULL"), nullable=True)
    store_id:Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey('stores.id', ondelete="SET NULL"), nullable=False)

    store = relationship("Store", back_populates="products")
    category = relationship("Category", back_populates='products')
    
    def to_dict(self):
        return {
            "id":str(self.id), 
            "name":self.name,
            "quantity":self.quantity,
            "description":self.description,
            "category":self.category.to_dict() if self.category else None,
            "store_id":self.store_id
        }

    def __repr__(self):
        return f"Product('{self.name}', Quantity: {self.quantity}, Category ID: {self.category_id})"
