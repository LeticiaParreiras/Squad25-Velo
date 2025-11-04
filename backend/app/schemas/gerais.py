from pydantic import BaseModel

# classe de teste para a documentação automatica
class HTTPError(BaseModel):
    detail: str
