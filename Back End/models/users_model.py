from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer
from models.client import db, bcrypt  # Import Base from your async db setup
from src.services_layer.utilities.index import hash_string, check_hash

class User(db.Model):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    phonemo: Mapped[str] = mapped_column(String(15), nullable=True)
    email: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    _password: Mapped[str] = mapped_column("password", String(255), nullable=False)

    @property
    def password(self):
        raise AttributeError("Password is not readable")

    @password.setter
    def password(self, raw_password: str):
        self._password = hash_string(raw_password)
        
    def check_password(self, password):
        print('############### reached here')

        return check_hash(self._password, password)


    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "phonemo": self.phonemo
        }

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"
