from db.connection import Base
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
from uuid import uuid4

class categoria_administrativa(Base):
    __tablename__ = "categoria_administrativa"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    nome = Column(String, nullable=False)
    
class nivel_ensino(Base):
    __tablename__ = "nivel_ensino"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    nome = Column(String, nullable=False)
    
class local(Base):
    __tablename__ = "local"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    nome = Column(String, nullable=False)