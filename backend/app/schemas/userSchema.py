from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    id: int


class UserResponse(UserBase):
    nome: str
    email: EmailStr
    telefone: str
    cpf: str
    permissoes: list[str]

    class Config:
        orm_mode = True


class UserCreate(BaseModel):
    nome: str
    email: EmailStr
    telefone: str
    cpf: str
    senha: str


class UserUpdate(BaseModel):
    nome: str | None = None
    email: EmailStr | None = None
    telefone: str | None = None
    senha: str | None = None


class UserSuspend(BaseModel):
    motivo: str | None = "Suspensão administrativa"