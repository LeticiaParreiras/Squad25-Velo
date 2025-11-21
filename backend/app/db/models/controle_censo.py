from db.connection import Base
from sqlalchemy import Column, String, Integer

class Controle_censo(Base):
    __tablename__ = 'Controle_censo'
    id = Column(Integer, primary_key=True, nullable=False)
    ano = Column(String, nullable=False)
    situacao = Column(String, nullable=False)
    progresso = Column(Integer, nullable=False)