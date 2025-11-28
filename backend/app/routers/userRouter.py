from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime
from db.connection import get_db
from db.models.usuario import Usuario
from db.models.cargos import Cargos
from db.models.usuario_cargo import Usuario_cargo
from db.models.cargo_permissao import Cargo_permissao
from db.models.permissoes import Permissoes

from schemas.userSchema import (
    UserCreate,
    UserUpdate,
    UserResponse,
    UserSuspend
)

router = APIRouter(
    prefix="/usuarios",
    tags=["Gerenciamento de Usuários"]
)


# HELPERS

def get_cargo_by_name(db: Session, nome: str):
    cargo = db.query(Cargos).filter(Cargos.nome == nome).first()
    if not cargo:
        raise HTTPException(400, f"Cargo '{nome}' não existe")
    return cargo


def usuario_existe(db: Session, email: str = None, cpf: str = None):
    if email and db.query(Usuario).filter(Usuario.email == email).first():
        raise HTTPException(400, "Email já cadastrado")
    if cpf and db.query(Usuario).filter(Usuario.cpf == cpf).first():
        raise HTTPException(400, "CPF já cadastrado")


def get_user_or_404(db: Session, user_id: int):
    usuario = db.query(Usuario).filter(Usuario.id == user_id).first()
    if not usuario:
        raise HTTPException(404, "Usuário não encontrado")

    cargo = (
        db.query(Cargos)
        .join(Usuario_cargo, Usuario_cargo.cargo_FK == Cargos.id)
        .filter(Usuario_cargo.usuario_FK == user_id)
        .first()
    )

    return usuario, cargo


def get_permissoes_usuario(db: Session, user_id: int) -> list[str]:
    permissoes = (
        db.query(Permissoes.nome)
        .join(Cargo_permissao, Cargo_permissao.permissao_FK == Permissoes.id)
        .join(Usuario_cargo, Usuario_cargo.cargo_FK == Cargo_permissao.cargo_FK)
        .filter(Usuario_cargo.usuario_FK == user_id)
        .all()
    )
    return [p.nome for p in permissoes]


def checar_permissao(db: Session, usuario_id: int, permissao: str):
    permissoes = get_permissoes_usuario(db, usuario_id)
    if permissao not in permissoes:
        raise HTTPException(403, f"Você não tem permissão para: {permissao}")


# CRIAR USUÁRIO

@router.post(
    "/",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Criar novo usuário comum"
)
async def criar_usuario(
    payload: UserCreate,
    db: Session = Depends(get_db),
    current_admin_id: int = 1  # substituir quando tiver auth
):
    # valida permissão do admin atual
    checar_permissao(db, current_admin_id, "adicionar_usuario")

    usuario_existe(db, payload.email, payload.cpf)

    usuario = Usuario(
        nome=payload.nome,
        email=payload.email,
        cpf=payload.cpf,
        telefone=payload.telefone,
        senha=payload.senha,
        status="ativo"
    )

    db.add(usuario)
    db.commit()
    db.refresh(usuario)

    cargo_user = get_cargo_by_name(db, "user")
    db.add(Usuario_cargo(usuario_FK=usuario.id, cargo_FK=cargo_user.id))
    db.commit()

    permissoes = get_permissoes_usuario(db, usuario.id)

    return UserResponse(
        id=usuario.id,
        nome=usuario.nome,
        email=usuario.email,
        telefone=usuario.telefone,
        cpf=usuario.cpf,
        permissoes=permissoes
    )


# EDITAR USUÁRIO

@router.patch(
    "/{user_id}",
    response_model=UserResponse,
    summary="Editar usuário comum"
)
async def editar_usuario(
    user_id: int,
    payload: UserUpdate,
    db: Session = Depends(get_db),
    current_admin_id: int = 1
):
    checar_permissao(db, current_admin_id, "adicionar_usuario")

    usuario, cargo = get_user_or_404(db, user_id)

    if cargo.nome != "user":
        raise HTTPException(403, "Apenas usuários comuns podem ser editados por admin")

    update_data = payload.model_dump(exclude_unset=True)

    for campo, valor in update_data.items():
        setattr(usuario, campo, valor)

    usuario.data_atualizacao = datetime.now()

    db.commit()
    db.refresh(usuario)

    return UserResponse(
        id=usuario.id,
        nome=usuario.nome,
        email=usuario.email,
        telefone=usuario.telefone,
        cpf=usuario.cpf,
        permissoes=get_permissoes_usuario(db, usuario.id)
    )


# SUSPENDER USUÁRIO

@router.patch(
    "/{user_id}/suspender",
    response_model=UserResponse,
    summary="Suspender usuário comum"
)
async def suspender_usuario(
    user_id: int,
    payload: UserSuspend,
    db: Session = Depends(get_db),
    current_admin_id: int = 1
):
    checar_permissao(db, current_admin_id, "remover_usuario")

    usuario, cargo = get_user_or_404(db, user_id)

    if cargo.nome != "user":
        raise HTTPException(403, "Não é possível suspender administradores")

    usuario.status = "suspenso"
    usuario.data_atualizacao = datetime.now()

    db.commit()
    db.refresh(usuario)

    return UserResponse(
        id=usuario.id,
        nome=usuario.nome,
        email=usuario.email,
        telefone=usuario.telefone,
        cpf=usuario.cpf,
        permissoes=get_permissoes_usuario(db, usuario.id)
    )


# DELETAR USUÁRIO

@router.delete(
    "/{user_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Deletar usuário comum"
)
async def deletar_usuario(
    user_id: int,
    db: Session = Depends(get_db),
    current_admin_id: int = 1
):
    checar_permissao(db, current_admin_id, "remover_usuario")

    usuario, cargo = get_user_or_404(db, user_id)

    if cargo.nome != "user":
        raise HTTPException(403, "Admins não podem deletar outros admins")

    db.query(Usuario_cargo).filter(Usuario_cargo.usuario_FK == usuario.id).delete()

    db.delete(usuario)
    db.commit()

    return None