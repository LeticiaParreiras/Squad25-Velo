from db.connection import Base
from sqlalchemy import Column, Integer, ForeignKey

class Cargo_permissao(Base):
    __tablename__ = 'Cargo_permissao'
    id = Column(Integer, primary_key=True, nullable=False)

    cargo_FK = Column(Integer, ForeignKey('Cargos.id'), nullable=False)
    permissao_FK = Column(Integer, ForeignKey('Permissoes.id'), nullable=False)