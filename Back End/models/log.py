from models.client import db
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, UUID
import uuid
class Log(db.Model):
    __tablename__ = 'logs'
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    log: Mapped[str] = mapped_column(String)