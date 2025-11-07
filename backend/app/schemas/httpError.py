from pydantic import BaseModel

class HTTPError(BaseModel):
    detail: str

    class Config:
        json_schema_extra = {
            "example": {"detail": "Mensagem de erro aqui"}
        }