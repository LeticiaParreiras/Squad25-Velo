from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from routers import demanda, simec, censo, usuarios, problema, adminRouter, userRouter

from typing import Annotated
from schemas import authSchema
from security import auth
from utils import responses

from db import criar_db

# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     # Startup
#     Base.metadata.create_all(bind=engine)
#     print("✅ Banco de dados inicializado!")

#     yield

#     # Shutdown
#     print("❌ Encerrando a aplicação...")
    
app = FastAPI()

# origins para CORS
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,    # Lista de URLs que podem acessar
    allow_credentials=True,   # Permite enviar Cookies/Auth
    allow_methods=["*"],      # Permite GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],      # Permite todos os cabeçalhos
)

app.include_router(demanda.router)
app.include_router(simec.router)
app.include_router(censo.router)
app.include_router(usuarios.router)
app.include_router(problema.router)
app.include_router(adminRouter.router)
app.include_router(userRouter.router)

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

def inicializador():
    criar_db.criar_semear()
    criar_db.criar_usuario_teste(
        nome='Usuario teste',
        email='emailteste@gmail.com',
        senha='12345678',
        cpf='12345678910',
        telefone='996436813',
        cargo='superadmin'
    )

if __name__ == '__main__':
    ## descomente aqui para criar as tabelas e inserir os dados estáticos ##
    # inicializador()

    ## comente o restante do código ao descomentar o inicializador para que
    ## somente ele rode
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)