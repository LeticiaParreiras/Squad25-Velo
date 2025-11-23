from typing import Optional
from pydantic import BaseModel, Field
from uuid import UUID

class createDemandas(BaseModel):
    titulo: str = Field(..., min_length=1, max_length=200)
    descricao: Optional[str] = None
    prioridade: str = Field(..., pattern="^(baixa|media|alta|crítica)$")
    status: str = Field(default="pendente", pattern="^(pendente|em_análise|aprovada|em_execução|concluida|rejeitada)$")
    categoria: Optional[str] = Field(..., pattern="^(infraestrutura|recursos_humanos|materiais_didáticos|transporte_escolar|outros)$")
    estimativa_custo: Optional[float] = Field(None, ge=0)
    responsavel: Optional[str] = None
    
class demandas(BaseModel):
    id: Optional[UUID] = None
    titulo: str = Field(..., min_length=1, max_length=200)
    descricao: Optional[str] = None
    prioridade: str = Field(..., pattern="^(baixa|media|alta|crítica)$")
    status: str = Field(default="pendente", pattern="^(pendente|em_análise|aprovada|em_execução|concluida|rejeitada)$")
    categoria: Optional[str] = Field(..., pattern="^(infraestrutura|recursos_humanos|materiais_didáticos|transporte_escolar|outros)$")
    estimativa_custo: Optional[float] = Field(None, ge=0)
    responsavel: Optional[str] = None
    
class DemandaUpdate(BaseModel):
    """Schema para atualizar demanda (todos os campos opcionais)"""
    titulo: Optional[str] = Field(None, min_length=1, max_length=200)
    descricao: Optional[str] = None
    prioridade: Optional[str] = Field(None, pattern="^(baixa|media|alta|crítica)$")
    status: Optional[str] = Field(None, pattern="^(pendente|em_análise|aprovada|em_execução|concluida|rejeitada)$")
    categoria: Optional[str] = Field(None, pattern="^(infraestrutura|recursos_humanos|materiais_didáticos|transporte_escolar|outros)$")
    estimativa_custo: Optional[float] = Field(None, ge=0)
    responsavel: Optional[str] = None