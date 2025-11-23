from fastapi import APIRouter, Depends, BackgroundTasks
from schemas.authSchema import UsuarioBase
from security.auth import autenticar
from typing import Annotated
from services import simec_serv
from utils.responses import AUTH_RESPONSES
from db.models import Controle_simec
from db.connection import SessionLocal

router = APIRouter(
    prefix="/simec",
    tags=["simec"],
)

@router.post("/atualizar", responses=AUTH_RESPONSES)
async def atualizar_simec(background_tasks: BackgroundTasks): # sem auth
    with SessionLocal() as db:
        status = db.query(Controle_simec).first()
        if not status or status.situacao == 'Cancelado':
            background_tasks.add_task(simec_serv.atualizar)
            return {"message": "Atualização do Simec iniciada."}
        return {"message": "Uma atualização do Simec já está em progresso."}

    # verificar padrão de mensagens para as respostas de sucesso depois

@router.get("/", responses=AUTH_RESPONSES)
def obter_status_simec():
    with SessionLocal() as db:
        status = db.query(Controle_simec).first()
        if not status:
            return {"message": "Nenhum dado do Simec encontrado."}
        return {
            "situacao": status.situacao,
            "progresso": status.progresso,
            "atualizado_em": status.atualizado_em,
        }