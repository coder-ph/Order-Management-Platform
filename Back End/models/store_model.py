from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy import ForeignKey, DateTime, String, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from models.client import db
import uuid

class Store(db.Model):
    __tablename__ = 'stores'
    
    location_id = db.Column(db.Integer, ForeignKey('locations.id', ondelete="SET NULL"), nullable=True)


    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, default=0)
    description: Mapped[str] = mapped_column(String(15), nullable=True)
    
    owner_id:Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey('users.id', ondelete="SET NULL"), nullable=False)
    location_id:Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey('locations.id', ondelete="SET NULL"), nullable=False)

    owner = relationship("User", back_populates="stores")
    location = relationship("Location", back_populates="stores")
    
    def to_dict(self):
        return {
            'id':self.id,
            'name': self.name,
            'quantity':self.quantity,
            "description":self.description,
            "location":self.location.to_dict() if self.location else None,
            "owner":self.owner.to_dict() if self.owner else None
        }

    def __repr__(self):
        return f"Store('{self.owner}', Owner ID: {self.owner_id}, Location ID: {self.location_id})"
