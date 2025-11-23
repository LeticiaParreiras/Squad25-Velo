from sqlalchemy import Column, String, Float, DateTime, Enum
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid
from db.connection import Base
import enum

class PrioridadeEnum(str, enum.Enum):
    BAIXA = "baixa"
    MEDIA = "media"
    ALTA = "alta"
    URGENTE = "urgente"

class StatusEnum(str, enum.Enum):
    PENDENTE = "pendente"
    EM_ANDAMENTO = "em_andamento"
    CONCLUIDA = "concluida"
    CANCELADA = "cancelada"
    
class categoriaEnum(str, enum.Enum):
    INFRAESTRUTURA ="infraestrutura"
    RECURSOS_HUMANOS = "recursos_humanos"
    MATERIAIS_DIDATICOS = "materiais_didáticos"
    TRANSPORTE_ESCOLAR= "transporte_escolar"
    OUTROS = "outros"
    
    
class Demanda(Base):
    __tablename__ = "demandas"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    titulo = Column(String(200), nullable=False)
    descricao = Column(String(1000))
    prioridade = Column(Enum(PrioridadeEnum), nullable=False)
    status = Column(Enum(StatusEnum), default=StatusEnum.PENDENTE)
    categoria = Column(Enum(categoriaEnum), nullable=False)
    estimativa_custo = Column(Float)
    responsavel = Column(String(100))
    data_criacao = Column(DateTime, default=datetime.now)
    data_atualizacao = Column(DateTime, default=datetime.now, onupdate=datetime.now)