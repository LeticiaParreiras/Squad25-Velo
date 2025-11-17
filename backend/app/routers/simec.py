from fastapi import APIRouter, Depends, BackgroundTasks
from schemas.authSchema import Usuario
from security.auth import autenticar
from typing import Annotated
from services import simec_serv
from utils.responses import AUTH_RESPONSES

router = APIRouter(
    prefix="/simec",
    tags=["simec"],
)

@router.post("/atualizar", responses=AUTH_RESPONSES)
async def atualizar_simec(background_tasks: BackgroundTasks): # sem auth
    background_tasks.add_task(simec_serv.atualizar)

    # verificar padrão de mensagens para as respostas de sucesso depois
    return {"message": "Atualização do Simec iniciada."}