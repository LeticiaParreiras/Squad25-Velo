from fastapi import FastAPI, Depends
from routers import login, demanda, simec, censo, problema

from typing import Annotated
from schemas import authSchema
from security import auth
from utils import responses

app = FastAPI()

app.include_router(login.router)
app.include_router(demanda.router)
app.include_router(simec.router)
app.include_router(censo.router)
app.include_router(problema.router)

#  exemplo de uma rota protegida:
@app.get(
        '/',
        responses=responses.AUTH_RESPONSES
    )
def teste(t: Annotated[authSchema.Usuario, Depends(auth.autenticar)]):
    return 'acesso autorizado'

#  exemplo de uma rota adm protegida:
@app.get('/admin')
def teste(t: Annotated[authSchema.Usuario, Depends(auth.autenticar_adm)]):
    return 'acesso do adm autorizado'