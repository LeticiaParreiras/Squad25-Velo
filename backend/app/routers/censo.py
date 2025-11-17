from fastapi import APIRouter, Depends, BackgroundTasks
from schemas.authSchema import Usuario
from security.auth import autenticar
from typing import Annotated
from services import censo_serv
from utils.responses import AUTH_RESPONSES

router = APIRouter(
    prefix="/censo",
    tags=["censo"],
)

@router.post("/baixar/{ano}", responses=AUTH_RESPONSES)
async def atualizar_simec(ano: str, background_tasks: BackgroundTasks): # sem auth
    background_tasks.add_task(censo_serv.atualizar, ano)

    # verificar padrão de mensagens para as respostas de sucesso depois
    return {"message": "Download do Censo iniciado."}