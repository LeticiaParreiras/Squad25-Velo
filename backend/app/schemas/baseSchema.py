from pydantic import BaseModel, BeforeValidator
from typing import Annotated
from uuid import UUID

"""Schemas base para reutilização em outros schemas"""

# Definir um tipo que sempre converte strings para minúsculas
LowerStr = Annotated[str, BeforeValidator(lambda v: v.lower() if isinstance(v, str) else v)]


class ItemBase(BaseModel):
    id: UUID
    nome: LowerStr

class ItemCreate(BaseModel):
    nome: LowerStr
    
class ItemResponse(BaseModel):
    id: UUID
    nome: LowerStr