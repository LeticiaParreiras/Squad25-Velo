from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from uuid import UUID
from schemas.baseSchema import ItemResponse

class problemasEscolaresResponse(BaseModel):
    id: Optional[UUID] = None
    titulo: str = Field(..., min_length=1, max_length=200)
    descricao: Optional[str] = None
    prioridade: str 
    status: str 
    nome_escola: str = Field(..., min_length=1, max_length=200)
    categoria_administrativa: ItemResponse
    local: ItemResponse
    nivel_ensino: ItemResponse
    responsavel: Optional[str] = None
    data_criacao: datetime
    data_atualizacao: datetime
    
    class Config:
        from_attributes = True
    
class problemasEscolaresCreate(BaseModel):
    titulo: str = Field(..., min_length=1, max_length=200)
    descricao: Optional[str] = None
    prioridade: str = Field(..., pattern="^(baixa|media|alta|critica)$")
    status: str = Field(default="pendente", pattern="^(pendente|em_andamento|resolvido|rejeitado)$")
    nome_escola: str = Field(..., min_length=1, max_length=200)
    responsavel: Optional[str] = None

    categoria_administrativa_id: UUID
    local_id: UUID
    nivel_ensino_id: UUID
    
class problemasEscolaresUpdate(BaseModel):
    """Schema para atualizar problema (todos os campos opcionais)"""
    titulo: Optional[str] = Field(None, min_length=1, max_length=200)
    descricao: Optional[str] = None
    prioridade: Optional[str] = Field(None, pattern="^(baixa|media|alta|critica)$")
    status: Optional[str] = Field(None, pattern="^(pendente|em_análise|aprovada|em_execução|concluida|rejeitada)$")
    nome_escola: Optional[str] = None
    local: Optional[UUID] = None
    categoria_administrativa: Optional[UUID] = None
    nivel_ensino: Optional[UUID] = None
    responsavel: Optional[str] = None