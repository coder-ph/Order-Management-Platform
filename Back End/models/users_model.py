from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer, ForeignKey, DateTime, Enum
from models.client import db, bcrypt
from src.services_layer.utilities.index import hash_string, check_hash, generate_otp
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from .model_enums import UserRoles
import datetime
import uuid

class User(db.Model):
    __tablename__ = "users"
    
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    first_name: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    last_name: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    phone_no: Mapped[str] = mapped_column(String(15), nullable=True)
    email: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    role: Mapped[str] = mapped_column(Enum(UserRoles),default=UserRoles.user)
    created_at: Mapped[DateTime] = mapped_column(DateTime, default=func.now())
    updated_at: Mapped[DateTime] = mapped_column(DateTime, default=func.now(), onupdate=func.now())

    _password: Mapped[str] = mapped_column("password", String(255), nullable=False)
    
    location_id:Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey('locations.id', ondelete="SET NULL"),unique=True, nullable=True)
    location = relationship("Location", back_populates="user", uselist=False)

    stores = relationship("Store", back_populates="owner")
    orders = relationship("Order", back_populates="user")

    @property
    def password(self):
        raise AttributeError("Password is not readable")

    @password.setter
    def password(self, raw_password: str):
        self._password = hash_string(raw_password)
        
    def check_password(self, password):
        return check_hash(self._password, password)


    def to_dict(self):
        return {
            "id": str(self.id),
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "phone_no": self.phone_no,
            "role":self.role.value,
            "location":self.location.to_dict() if self.location else None
        }

    def __repr__(self):
        return f"User('{self.first_name}', '{self.email}')"

class Token(db.Model):
    __tablename__ = 'tokens'
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    key: Mapped[str] = mapped_column(String(50),unique=True,nullable=False)
    _token: Mapped[str] = mapped_column(String(50), unique=True,  nullable=False)

    @property
    def token(self):
        return self._token
    
    @token.setter
    def token(self, token):
        token_exists = self.query.filter_by(token=token).first()
        if token_exists:
            self.token = token
        self._token = generate_otp()
    def to_dict(self):
        return {
            'key':self.key,
            'token':self.token
        }
        

    

    
    