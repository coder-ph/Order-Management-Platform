from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from models.client import db
import uuid

class Location(db.Model):
    __tablename__ = 'locations'
    
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    longitude: Mapped[str] = mapped_column(String(50),  nullable=False)
    lattitude: Mapped[str] = mapped_column(String(50), nullable=False)
   
    user = relationship("User", back_populates="location", uselist=False)
  
    created_at: Mapped[DateTime] = mapped_column(DateTime, default=func.now())
    updated_at: Mapped[DateTime] = mapped_column(DateTime, default=func.now(), onupdate=func.now())

    def to_dict(self):
        return {
            "id": str(self.id),
            "longitude": self.longitude,
            "lattitude": self.lattitude,
        }