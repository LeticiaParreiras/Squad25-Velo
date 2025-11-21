from db.connection import Base
from sqlalchemy import Column, String, Integer, DateTime

class Cargos(Base):
    __tablename__ = 'Cargos'
    id = Column(Integer, primary_key=True, nullable=False)
    nome = Column(String, nullable=False)