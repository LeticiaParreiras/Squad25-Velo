from fastapi import FastAPI, Depends
from routers import login

from typing import Annotated
from schemas import authSchema
from security import auth

app = FastAPI()

app.include_router(login.router)

#  exemplo de uma rota protegida:
@app.get('/')
def teste(t: Annotated[authSchema.Usuario, Depends(auth.verificar_autenticacao)]):
    return 'acesso autorizado'