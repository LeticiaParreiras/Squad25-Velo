from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends
from routers import login, demanda, simec, censo, problema
from db import semear
from db.connection import get_db, Base, engine

from typing import Annotated
from schemas import authSchema
from security import auth
from utils import responses

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    Base.metadata.create_all(bind=engine)
    print("✅ Banco de dados inicializado!")

    yield

    # Shutdown
    print("❌ Encerrando a aplicação...")
    
app = FastAPI(lifespan=lifespan)

app.include_router(login.router)
app.include_router(demanda.router)
app.include_router(simec.router)
app.include_router(censo.router)
app.include_router(problema.router)

# semear.semear_cargos()
# semear.semear_permissoes()
# semear.semear_relacionamentos()

#  exemplo de uma rota protegida:
@app.get(
        '/',
        responses=responses.AUTH_RESPONSES
    )
def teste(t: Annotated[authSchema.UsuarioBase, Depends(auth.autenticar)]):
    return 'acesso autorizado'

#  exemplo de uma rota adm protegida:
@app.get('/admin', dependencies=[Depends(auth.requisitar_permissao('adicionar_admin'))])
def teste():
    return 'acesso para adicionar admin autorizado'


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
