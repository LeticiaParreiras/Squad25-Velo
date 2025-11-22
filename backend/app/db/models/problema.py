from sqlalchemy import Column, String, DateTime, Enum
from sqlalchemy.dialects.postgresql import UUID
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
    categoria_administrativa = Column(String, nullable=False)
    local = Column(String, nullable=False)
    nivel_ensino = Column(String, nullable=False)
    responsavel = Column(String, nullable=True)

    data_criacao = Column(DateTime, default=datetime.now)
    data_atualizacao = Column(DateTime, default=datetime.now, onupdate=datetime.now)
