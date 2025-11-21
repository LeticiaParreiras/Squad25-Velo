from typing import Optional
from pydantic import BaseModel, Field

class problemasEscolares(BaseModel):
    id: Optional[str] = None
    titulo: str = Field(..., min_length=1, max_length=200)
    descricao: Optional[str] = None
    prioridade: str = Field(..., pattern="^(baixa|media|alta|crítica)$")
    status: str = Field(default="pendente", pattern="^(pendente|em_análise|em_execução|resolvido|rejeitada)$")
    nome_escola: str = Field(..., min_length=1, max_length=200)
    categoria_administrativa: str = Field(..., pattern="^(municipal|estadual|militar|comunitaria)$")
    local:str= Field(..., pattern="^(urbana|rural|indígenas| quilombolas)$")
    nivel_ensino: str = Field(..., pattern="^(infantil|fundamental|medio|técnico|EJA)$")
    responsavel: Optional[str] = None
    
class problemasEscolaresUpdate(BaseModel):
    """Schema para atualizar problema (todos os campos opcionais)"""
    titulo: Optional[str] = Field(None, min_length=1, max_length=200)
    descricao: Optional[str] = None
    prioridade: Optional[str] = Field(None, pattern="^(baixa|media|alta|crítica)$")
    status: Optional[str] = Field(None, pattern="^(pendente|em_análise|aprovada|em_execução|concluida|rejeitada)$")
    nome_escola: Optional[str] = None
    local: Optional[str] = Field(None, pattern="^(urbana|rural|indígenas| quilombolas)$")
    categoria_administrativa: Optional[str] = None
    nivel_ensino: Optional[str] = Field (None , pattern="^(infantil|fundamental|medio|técnico|EJA)$")
    responsavel: Optional[str] = None