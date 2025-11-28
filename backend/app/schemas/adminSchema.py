from pydantic import BaseModel, EmailStr
from typing import Optional

class AdminBase(BaseModel):
    nome: str
    email: EmailStr
    cargo: str

class AdminCreate(AdminBase):
    cpf: str
    telefone: str
    senha: str

class AdminUpdate(BaseModel):
    nome: Optional[str] = None
    email: Optional[EmailStr] = None
    telefone: Optional[str] = None
    senha: Optional[str] = None
    cargo: Optional[str] = None

class AdminSuspend(BaseModel):
    motivo: Optional[str] = None

class AdminResponse(AdminBase):
    id: int
    status: str

    class Config:
        from_attributes = True