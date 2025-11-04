from pydantic import BaseModel

class Usuario(BaseModel):
    email: str

class Token(BaseModel):
    access_token: str
    token_type: str