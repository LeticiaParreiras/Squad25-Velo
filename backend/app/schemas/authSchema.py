from pydantic import BaseModel

class Usuario(BaseModel):
    email: str
    cargo: str

class Token(BaseModel):
    access_token: str
    token_type: str