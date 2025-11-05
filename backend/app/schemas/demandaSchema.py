from typing import Optional
from pydantic import BaseModel, Field

class demandas(BaseModel):
    id: Optional[str] = None
    titulo: str = Field(..., min_length=1, max_length=200)
    descricao: Optional[str] = None
    prioridade: str = Field(..., pattern="^(baixa|media|alta|urgente)$")
    status: str = Field(default="aberta", pattern="^(aberta|em_andamento|concluida|cancelada)$")
    responsavel: Optional[str] = None
    
class DemandaUpdate(BaseModel):
    """Schema para atualizar demanda (todos os campos opcionais)"""
    titulo: Optional[str] = Field(None, min_length=1, max_length=200)
    descricao: Optional[str] = None
    prioridade: Optional[str] = Field(None, pattern="^(baixa|media|alta|urgente)$")
    status: Optional[str] = Field(None, pattern="^(aberta|em_andamento|concluida|cancelada)$")
    responsavel: Optional[str] = None