from sqlalchemy import Column, String, DateTime, Enum, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from uuid import uuid4
from datetime import datetime
from db.connection import Base
import enum

class statusEnum(str, enum.Enum):
    PENDENTE = "pendente"
    EM_ANDAMENTO = "em_andamento"
    RESOLVIDO = "resolvido"
    REJEITADO = "rejeitado"
    
class prioridadeEnum(str, enum.Enum):
    BAIXA = "baixa"
    MEDIA = "media"
    ALTA = "alta"
    CRITICA = "critica"

class ProblemaEscolar(Base):
    __tablename__ = "problemas_escolares"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4)
    titulo = Column(String, nullable=False)
    descricao = Column(String, nullable=True)
    prioridade = Column(Enum(prioridadeEnum), nullable=False)
    status = Column(Enum(statusEnum), default=statusEnum.PENDENTE)
    nome_escola = Column(String, nullable=False)
    responsavel = Column(String, nullable=True)
    categoria_administrativa_id = Column(
        UUID(as_uuid=True),
        ForeignKey("categoria_administrativa.id"),
        nullable=False
    )
    nivel_ensino_id = Column(
        UUID(as_uuid=True),
        ForeignKey("nivel_ensino.id"),
        nullable=False
    )
    local_id = Column(
        UUID(as_uuid=True),
        ForeignKey("local.id"),
        nullable=False
    )
    data_criacao = Column(DateTime, default=datetime.now)
    data_atualizacao = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    
    categoria_administrativa = relationship("categoria_administrativa")
    nivel_ensino = relationship("nivel_ensino")
    local = relationship("local")