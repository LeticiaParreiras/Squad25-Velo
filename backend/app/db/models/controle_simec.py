from db.connection import Base
from sqlalchemy import Column, String, Integer, DateTime

class Controle_simec(Base):
    __tablename__ = 'controle_simec'
    id = Column(Integer, primary_key=True, nullable=False)
    situacao = Column(String, nullable=False)
    progresso = Column(Integer, nullable=False)
    atualizado_em = Column(DateTime(timezone=True), nullable=False)
