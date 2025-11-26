from fastapi import APIRouter, Depends, HTTPException
from schemas.authSchema import UsuarioBase
from security.auth import autenticar
from typing import Annotated
from db.connection import SessionLocal
from db.models import Usuario, Permissoes, Usuario_cargo, Cargo_permissao
from utils.responses import AUTH_RESPONSES

router = APIRouter(
    prefix="/users",
    tags=["usuarios"],
)

@router.get("/me", responses=AUTH_RESPONSES)
async def atualizar_simec(usuario: Annotated[UsuarioBase, Depends(autenticar)]):
    with SessionLocal() as db:
        usuario = db.query(Usuario).filter(Usuario.id == usuario.id).first()
        permissoes: list[Permissoes] = (
            db.query(Permissoes)
            .join(Cargo_permissao, Permissoes.id == Cargo_permissao.permissao_FK)
            .join(Usuario_cargo, Cargo_permissao.cargo_FK == Usuario_cargo.cargo_FK)
            .filter(Usuario_cargo.usuario_FK == usuario.id)
            .all()
        )

    return {
        'user': {
            'id': usuario.id,
            'nome': usuario.nome,
            'email': usuario.email,
            'telefone': usuario.telefone,
            'cpf': usuario.cpf,
            'permissoes': [permissao.nome for permissao in permissoes]
        }
    }