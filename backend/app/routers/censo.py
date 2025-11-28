from fastapi import APIRouter, Depends, BackgroundTasks
from schemas.authSchema import UsuarioBase
from security.auth import autenticar
from typing import Annotated
from services import censo_serv
from utils.responses import AUTH_RESPONSES
from db.connection import SessionLocal
from db.models import Controle_censo

router = APIRouter(
    prefix="/censo",
    tags=["censo"],
)

@router.post("/baixar/{ano}", responses=AUTH_RESPONSES)
async def atualizar_simec(ano: str, background_tasks: BackgroundTasks): # sem auth
    # verificar se existe dados do simec em processamento no banco
    # se existir, cancelar a operação
    # se não, escrever no db a situação de "baixando"
    background_tasks.add_task(censo_serv.atualizar, ano)

    # verificar padrão de mensagens para as respostas de sucesso depois
    return {"message": "Download do Censo iniciado."}

@router.get('/anos')
def pegar_anos_disponiveis():
    with SessionLocal() as db:
        dados = db.query(Controle_censo).all()

        return {'anos': [censo.ano for censo in dados]}