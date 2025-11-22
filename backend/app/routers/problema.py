from fastapi import HTTPException, status, APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from uuid import UUID
from schemas.problemasEscolaresSchema import problemasEscolares, problemasEscolaresUpdate, problemasEscolaresCreate
from db.models.problema import ProblemaEscolar
from db.connection import get_db
from uuid import UUID, uuid4

# Router
router = APIRouter(
    prefix="/problemasEscolares",
    tags=["problemasEscolares"]
)

# CREATE - Criar novo problema
@router.post("/", response_model=problemasEscolares, status_code=status.HTTP_201_CREATED)
async def criar_problema(problema: problemasEscolaresCreate, db: Session = Depends(get_db)):
    """Cria um novo problema escolar"""

    novo_problema = ProblemaEscolar(
        titulo=problema.titulo,
        descricao=problema.descricao,
        prioridade=problema.prioridade,
        status=problema.status,
        nome_escola=problema.nome_escola,
        local=problema.local,
        categoria_administrativa=problema.categoria_administrativa,
        nivel_ensino=problema.nivel_ensino,
        responsavel=problema.responsavel,
    )

    db.add(novo_problema)
    db.commit()
    db.refresh(novo_problema)

    return novo_problema


# READ - Listar problemas
@router.get("/", response_model=List[problemasEscolares])
async def listar_problemasEscolares(
    status_filter: Optional[str] = None,
    prioridade: Optional[str] = None,
    categoria_administrativa: Optional[str] = None,
    nivel_ensino: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Lista problemas escolares com filtros opcionais"""

    query = db.query(ProblemaEscolar)

    if status_filter:
        query = query.filter(ProblemaEscolar.status == status_filter)
    if prioridade:
        query = query.filter(ProblemaEscolar.prioridade == prioridade)
    if categoria_administrativa:
        query = query.filter(ProblemaEscolar.categoria_administrativa == categoria_administrativa)
    if nivel_ensino:
        query = query.filter(ProblemaEscolar.nivel_ensino == nivel_ensino)

    return query.offset(skip).limit(limit).all()


# READ - Buscar problema por ID
@router.get("/{problema_id}", response_model=problemasEscolares)
async def buscar_problema(problema_id: UUID, db: Session = Depends(get_db)):
    problema = db.query(ProblemaEscolar).filter(ProblemaEscolar.id == problema_id).first()

    if not problema:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Problema com ID {problema_id} não encontrado"
        )

    return problema


# UPDATE - Atualizar problema
@router.patch("/{problema_id}", response_model=problemasEscolares)
async def atualizar_problema(
    problema_id: UUID,
    problema_update: problemasEscolaresUpdate,
    db: Session = Depends(get_db)
):
    problema = db.query(ProblemaEscolar).filter(ProblemaEscolar.id == problema_id).first()

    if not problema:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Problema com ID {problema_id} não encontrado"
        )

    update_data = problema_update.model_dump(exclude_unset=True)
    for campo, valor in update_data.items():
        setattr(problema, campo, valor)

    problema.data_atualizacao = datetime.now()

    db.commit()
    db.refresh(problema)

    return problema


# DELETE - Remover problema
@router.delete("/{problema_id}", status_code=status.HTTP_204_NO_CONTENT)
async def deletar_problema(problema_id: UUID, db: Session = Depends(get_db)):
    problema = db.query(ProblemaEscolar).filter(ProblemaEscolar.id == problema_id).first()

    if not problema:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Problema com ID {problema_id} não encontrado"
        )

    db.delete(problema)
    db.commit()

    return None
