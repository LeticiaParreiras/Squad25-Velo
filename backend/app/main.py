from fastapi import FastAPI, Depends
from routers import login
from routers import demanda

from typing import Annotated
from schemas import authSchema
from security import auth

app = FastAPI()

app.include_router(login.router)
app.include_router(demanda.router)

#  exemplo de uma rota protegida:
@app.get('/')
def teste(t: Annotated[authSchema.Usuario, Depends(auth.autenticar)]):
    return 'acesso autorizado'

#  exemplo de uma rota adm protegida:
@app.get('/admin')
def teste(t: Annotated[authSchema.Usuario, Depends(auth.autenticar_adm)]):
    return 'acesso do adm autorizado'