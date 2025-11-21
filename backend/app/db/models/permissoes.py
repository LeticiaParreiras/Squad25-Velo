from db.connection import Base
from sqlalchemy import Column, String, Integer, DateTime

class Permissoes(Base):
    __tablename__ = 'Permissoes'
    id = Column(Integer, primary_key=True, nullable=False)
    nome = Column(String, nullable=False)