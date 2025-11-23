from pydantic import BaseModel, EmailStr

class UsuarioBase(BaseModel):
    id: int
    # permissoes: list[str]

class UsuarioResponse(UsuarioBase):
    nome: str
    email: EmailStr
    telefone: str
    cpf: str
    permissoes: list[str]

class loginResponse(BaseModel):
    access_token: str
    token_type: str
    user: UsuarioResponse