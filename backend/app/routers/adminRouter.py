from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime
from db.connection import get_db
from db.models.usuario import Usuario
from db.models.cargos import Cargos
from db.models.usuario_cargo import Usuario_cargo
from security import password 
from db.models.usuario import StatusUsuarioEnum

from schemas.adminSchema import (
    AdminCreate,
    AdminUpdate,
    AdminResponse,
    AdminSuspend
)

router = APIRouter(
    prefix="/admin",
    tags=["Administração de Usuários"]
)

# Helpers

def get_cargo_by_name(db: Session, nome: str):
    cargo = db.query(Cargos).filter(Cargos.nome == nome).first()
    if not cargo:
        raise HTTPException(
            status_code=400,
            detail=f"Cargo '{nome}' não existe"
        )
    return cargo


def get_admin_or_404(db: Session, admin_id: int):
    usuario = db.query(Usuario).filter(Usuario.id == admin_id).first()
    if not usuario:
        raise HTTPException(404, "Usuário não encontrado")

    cargo = (
        db.query(Cargos)
        .join(Usuario_cargo, Usuario_cargo.cargo_FK == Cargos.id)
        .filter(Usuario_cargo.usuario_FK == admin_id)
        .first()
    )

    if not cargo or cargo.nome not in ["Admin", "Superadmin"]:
        raise HTTPException(403, "Usuário não é administrador")

    return usuario, cargo


# Criar Administrador

@router.post(
    "/",
    response_model=AdminResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Criar novo administrador"
)
async def criar_admin(
    payload: AdminCreate,
    db: Session = Depends(get_db)
):
    # verificação de duplicados
    if db.query(Usuario).filter(Usuario.email == payload.email).first():
        raise HTTPException(400, "Email já cadastrado")

    if db.query(Usuario).filter(Usuario.cpf == payload.cpf).first():
        raise HTTPException(400, "CPF já cadastrado")
    
    senha_hash = password.cript(payload.senha)
    # cria usuário
    usuario = Usuario(
        nome=payload.nome,
        email=payload.email,
        cpf=payload.cpf,
        telefone=payload.telefone,
        senha=senha_hash,
        status= StatusUsuarioEnum.ATIVO
    )

    db.add(usuario)
    db.commit()
    db.refresh(usuario)

    # cargo
    cargo = get_cargo_by_name(db, payload.cargo)

    db.add(Usuario_cargo(usuario_FK=usuario.id, cargo_FK=cargo.id))
    db.commit()

    return AdminResponse(
        id=usuario.id,
        nome=usuario.nome,
        email=usuario.email,
        cargo=cargo.nome,
    )

#Listar Administradores
@router.get(
    "/",
    response_model=List[AdminResponse],
    summary="Listar todos os administradores"
)
async def listar_administradores(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    # Busca usuários que tenham cargo Admin ou Superadmin
    query = (
        db.query(Usuario, Cargos)
        .join(Usuario_cargo, Usuario_cargo.usuario_FK == Usuario.id)
        .join(Cargos, Cargos.id == Usuario_cargo.cargo_FK)
        .filter(Cargos.nome.in_(["Admin", "Superadmin"]))
        .order_by(Cargos.nome.desc(), Usuario.nome)  # Superadmin primeiro, depois por nome
    )
    
    # Aplica paginação
    admins = query.offset(skip).limit(limit).all()
    
    # Formata resposta
    resultado = []
    for usuario, cargo in admins:
        resultado.append(
            AdminResponse(
                id=usuario.id,
                nome=usuario.nome,
                email=usuario.email,
                cargo=cargo.nome,
                status=usuario.status
            )
        )
    
    return resultado

# Editar Administrador

@router.patch(
    "/{admin_id}",
    response_model=AdminResponse,
    summary="Editar administrador"
)
async def editar_admin(
    admin_id: int,
    payload: AdminUpdate,
    db: Session = Depends(get_db)
):

    usuario, cargo_atual = get_admin_or_404(db, admin_id)

    update_data = payload.model_dump(exclude_unset=True)

    # campos básicos
    for campo, valor in update_data.items():
        if campo != "cargo":   # cargo é alterado separado
            setattr(usuario, campo, valor)

    # alterar cargo
    if payload.cargo:
        novo_cargo = get_cargo_by_name(db, payload.cargo)

        relacao = (
            db.query(Usuario_cargo)
            .filter(Usuario_cargo.usuario_FK == admin_id)
            .first()
        )

        relacao.cargo_FK = novo_cargo.id

    usuario.data_atualizacao = datetime.now()

    db.commit()
    db.refresh(usuario)

    return AdminResponse(
        id=usuario.id,
        nome=usuario.nome,
        email=usuario.email,
        cargo=payload.cargo or cargo_atual.nome,
        status=usuario.status
    )


# Suspender Administrador

@router.patch(
    "/{admin_id}/suspender",
    response_model=AdminResponse,
    summary="Suspender administrador"
)
async def suspender_admin(
    admin_id: int,
    payload: AdminSuspend,
    db: Session = Depends(get_db)
):
    usuario, cargo = get_admin_or_404(db, admin_id)

    usuario.status = "suspenso"
    usuario.data_atualizacao = datetime.now()

    db.commit()
    db.refresh(usuario)

    return AdminResponse(
        id=usuario.id,
        nome=usuario.nome,
        email=usuario.email,
        cargo=cargo.nome,
        status=usuario.status
    )


# Deletar Administrador

@router.delete(
    "/{admin_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Deletar administrador"
)
async def deletar_admin(
    admin_id: int,
    db: Session = Depends(get_db)
):
    usuario, cargo = get_admin_or_404(db, admin_id)

    # regra: admin não pode deletar superadmin
    if cargo.nome == "Superadmin":
        raise HTTPException(
            status_code=403,
            detail="Superadmin não pode ser deletado"
        )

    # remove cargos ligados
    db.query(Usuario_cargo).filter(
        Usuario_cargo.usuario_FK == usuario.id
    ).delete()

    db.delete(usuario)
    db.commit()

    return None