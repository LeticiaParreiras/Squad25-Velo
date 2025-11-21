from db.connection import Base
from sqlalchemy import Column, Integer, ForeignKey

class Usuario_cargo(Base):
    __tablename__ = 'Usuario_cargo'
    id = Column(Integer, primary_key=True, nullable=False)

    usuario_FK = Column(Integer, ForeignKey('Usuarios.id'), nullable=False)
    cargo_FK = Column(Integer, ForeignKey('Cargos.id'), nullable=False)