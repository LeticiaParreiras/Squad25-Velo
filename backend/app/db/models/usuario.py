from db.connection import Base
from sqlalchemy import Column, String, Integer

class Usuario(Base):
    __tablename__ = 'Usuarios'
    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    nome = Column(String, nullable=False)
    cpf = Column(String, unique=True,nullable=False)
    email = Column(String, unique=True, nullable=False)
    telefone = Column(String, unique=True, nullable=False)
    senha = Column(String, nullable=False)