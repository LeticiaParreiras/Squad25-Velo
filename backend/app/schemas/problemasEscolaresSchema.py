from typing import Optional
from pydantic import BaseModel, Field
from uuid import UUID

class problemasEscolares(BaseModel):
    id: Optional[UUID] = None
    titulo: str = Field(..., min_length=1, max_length=200)
    descricao: Optional[str] = None
    prioridade: str = Field(..., pattern="^(baixa|media|alta|crítica)$")
    status: str = Field(default="pendente", pattern="^(pendente|em_andamento|resolvido|rejeitado)$")
    nome_escola: str = Field(..., min_length=1, max_length=200)
    categoria_administrativa: str = Field(..., examples=(["municipal","estadual","militar","comunitaria"]))
    local:str= Field(..., examples=["urbana","rural","indígenas"," quilombolas"])
    nivel_ensino: str = Field(..., examples=["infantil","fundamental","medio","técnico","EJA"])
    responsavel: Optional[str] = None
    
class problemasEscolaresCreate(BaseModel):
    titulo: str = Field(..., min_length=1, max_length=200)
    descricao: Optional[str] = None
    prioridade: str = Field(..., pattern="^(baixa|media|alta|crítica)$")
    status: str = Field(default="pendente", pattern="^(pendente|em_andamento|resolvido|rejeitado)$")
    nome_escola: str = Field(..., min_length=1, max_length=200)
    categoria_administrativa: str = Field(..., examples=(["municipal","estadual","militar","comunitaria"]))
    local:str= Field(..., examples=["urbana","rural","indígenas"," quilombolas"])
    nivel_ensino: str = Field(..., examples=["infantil","fundamental","medio","técnico","EJA"])
    responsavel: Optional[str] = None
    
class problemasEscolaresUpdate(BaseModel):
    """Schema para atualizar problema (todos os campos opcionais)"""
    titulo: Optional[str] = Field(None, min_length=1, max_length=200)
    descricao: Optional[str] = None
    prioridade: Optional[str] = Field(None, pattern="^(baixa|media|alta|crítica)$")
    status: Optional[str] = Field(None, pattern="^(pendente|em_análise|aprovada|em_execução|concluida|rejeitada)$")
    nome_escola: Optional[str] = None
    local: Optional[str] = Field(None, examples=["urbana","rural","indígenas"," quilombolas"])
    categoria_administrativa: Optional[str] = None
    nivel_ensino: Optional[str] = Field(None, examples=["infantil","fundamental","medio","técnico","EJA"])
    responsavel: Optional[str] = None