from fastapi import HTTPException, status, APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import and_
from typing import List, Optional
from datetime import datetime
from uuid import UUID

from schemas.problemasEscolaresSchema import (
    problemasEscolaresResponse,
    problemasEscolaresUpdate,
    problemasEscolaresCreate
)
from schemas.baseSchema import ItemCreate, ItemResponse
from db.models.problema import ProblemaEscolar
from db.models.campos_problema import categoria_administrativa, nivel_ensino, local
from db.connection import get_db
from utils.camposUtils import listar_todos, criar_unico as criar

# ==================== ROUTER ====================
router = APIRouter(
    prefix="/problemasEscolares",
    tags=["Problemas Escolares"]
)

# ==================== CRUD PRINCIPAL ====================

@router.post(
    "/",
    response_model=problemasEscolaresResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Criar novo problema escolar"
)
async def criar_problema(
    problema: problemasEscolaresCreate,
    db: Session = Depends(get_db)
):
    """
    Cria um novo problema escolar no sistema.
    
    - **titulo**: Título do problema
    - **descricao**: Descrição detalhada
    - **prioridade**: Nível de prioridade (baixa, media, alta, urgente)
    - **status**: Status do problema (pendente, em_andamento, resolvido, rejeitado)
    - **nome_escola**: Nome da escola afetada
    - **categoria_administrativa_id**: ID da categoria administrativa
    - **local_id**: ID do local/região
    - **nivel_ensino_id**: ID do nível de ensino
    - **responsavel**: Nome do responsável pelo acompanhamento
    """
    novo_problema = ProblemaEscolar(
        titulo=problema.titulo,
        descricao=problema.descricao,
        prioridade=problema.prioridade,
        status=problema.status,
        nome_escola=problema.nome_escola,
        categoria_administrativa_id=problema.categoria_administrativa_id,
        local_id=problema.local_id,
        nivel_ensino_id=problema.nivel_ensino_id,
        responsavel=problema.responsavel
    )

    db.add(novo_problema)
    db.commit()
    db.refresh(novo_problema)

    return novo_problema


@router.get(
    "/",
    response_model=List[problemasEscolaresResponse],
    summary="Listar problemas escolares"
)
async def listar_problemas(
    status_filter: Optional[str] = Query(None, description="Filtrar por status"),
    prioridade: Optional[str] = Query(None, description="Filtrar por prioridade"),
    categoria_administrativa: Optional[str] = Query(None, description="Filtrar por categoria administrativa"),
    nivel_ensino: Optional[str] = Query(None, description="Filtrar por nível de ensino"),
    nome_escola: Optional[str] = Query(None, description="Buscar por nome da escola"),
    skip: int = Query(0, ge=0, description="Número de registros a pular"),
    limit: int = Query(100, ge=1, le=500, description="Limite de registros (máx: 500)"),
    db: Session = Depends(get_db)
):
    """
    Lista todos os problemas escolares com filtros opcionais.
    
    Suporta paginação e múltiplos filtros simultâneos.
    """
    query = db.query(ProblemaEscolar)

    # Aplicar filtros dinamicamente
    filtros = []
    
    if status_filter:
        filtros.append(ProblemaEscolar.status == status_filter)
    if prioridade:
        filtros.append(ProblemaEscolar.prioridade == prioridade)
    if categoria_administrativa:
        filtros.append(ProblemaEscolar.categoria_administrativa == categoria_administrativa)
    if nivel_ensino:
        filtros.append(ProblemaEscolar.nivel_ensino == nivel_ensino)
    if nome_escola:
        filtros.append(ProblemaEscolar.nome_escola.ilike(f"%{nome_escola}%"))
    
    if filtros:
        query = query.filter(and_(*filtros))

    # Ordenar por data de criação (mais recentes primeiro)
    query = query.order_by(ProblemaEscolar.data_criacao.desc())

    return query.offset(skip).limit(limit).all()


@router.get(
    "/{problema_id}",
    response_model=problemasEscolaresResponse,
    summary="Buscar problema por ID"
)
async def buscar_problema(
    problema_id: UUID,
    db: Session = Depends(get_db)
):
    """Retorna um problema escolar específico pelo ID."""
    problema = db.query(ProblemaEscolar)\
        .filter(ProblemaEscolar.id == problema_id)\
        .first()

    if not problema:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Problema com ID {problema_id} não encontrado"
        )

    return problema


@router.patch(
    "/{problema_id}",
    response_model=problemasEscolaresResponse,
    summary="Atualizar problema"
)
async def atualizar_problema(
    problema_id: UUID,
    problema_update: problemasEscolaresUpdate,
    db: Session = Depends(get_db)
):
    """
    Atualiza parcialmente um problema escolar existente.
    
    Apenas os campos fornecidos serão atualizados.
    """
    problema = db.query(ProblemaEscolar)\
        .filter(ProblemaEscolar.id == problema_id)\
        .first()

    if not problema:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Problema com ID {problema_id} não encontrado"
        )

    # Atualizar apenas campos fornecidos
    update_data = problema_update.model_dump(exclude_unset=True)
    
    for campo, valor in update_data.items():
        setattr(problema, campo, valor)

    problema.data_atualizacao = datetime.now()

    db.commit()
    db.refresh(problema)

    return problema


@router.delete(
    "/{problema_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Deletar problema"
)
async def deletar_problema(
    problema_id: UUID,
    db: Session = Depends(get_db)
):
    """Remove permanentemente um problema escolar do sistema."""
    problema = db.query(ProblemaEscolar)\
        .filter(ProblemaEscolar.id == problema_id)\
        .first()

    if not problema:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Problema com ID {problema_id} não encontrado"
        )

    db.delete(problema)
    db.commit()

    return None


# ==================== CAMPOS DINÂMICOS ====================

@router.get(
    "/campos/categorias-administrativas",
    response_model=List[ItemResponse],
    summary="Listar categorias administrativas"
)
async def listar_categorias(db: Session = Depends(get_db)):
    """Lista todas as categorias administrativas disponíveis (ex: Federal, Estadual, Municipal)."""
    return listar_todos(db, categoria_administrativa)


@router.post(
    "/campos/categorias-administrativas",
    response_model=ItemResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Criar categoria administrativa"
)
async def criar_categoria(
    payload: ItemCreate,
    db: Session = Depends(get_db)
):
    """Adiciona uma nova categoria administrativa ao sistema."""
    return criar(db, categoria_administrativa, payload.model_dump())


@router.get(
    "/campos/niveis-ensino",
    response_model=List[ItemResponse],
    summary="Listar níveis de ensino"
)
async def listar_niveis(db: Session = Depends(get_db)):
    """Lista todos os níveis de ensino disponíveis (ex: Infantil, Fundamental, Médio)."""
    return listar_todos(db, nivel_ensino)


@router.post(
    "/campos/niveis-ensino",
    response_model=ItemResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Criar nível de ensino"
)
async def criar_nivel(
    payload: ItemCreate,
    db: Session = Depends(get_db)
):
    """Adiciona um novo nível de ensino ao sistema."""
    return criar(db, nivel_ensino, payload.model_dump())


@router.get(
    "/campos/locais",
    response_model=List[ItemResponse],
    summary="Listar locais"
)
async def listar_locais(db: Session = Depends(get_db)):
    """Lista todos os locais/regiões disponíveis."""
    return listar_todos(db, local)


@router.post(
    "/campos/locais",
    response_model=ItemResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Criar local"
)
async def criar_local(
    payload: ItemCreate,
    db: Session = Depends(get_db)
):
    """Adiciona um novo local/região ao sistema."""
    return criar(db, local, payload.model_dump())


# ==================== ESTATÍSTICAS (BONUS) ====================

@router.get(
    "/estatisticas/resumo",
    summary="Resumo estatístico"
)
async def obter_estatisticas(db: Session = Depends(get_db)):
    """
    Retorna estatísticas gerais dos problemas escolares.
    
    Inclui totais por status, prioridade e outras métricas úteis.
    """
    from sqlalchemy import func
    
    total = db.query(func.count(ProblemaEscolar.id)).scalar()
    
    por_status = db.query(
        ProblemaEscolar.status,
        func.count(ProblemaEscolar.id).label('total')
    ).group_by(ProblemaEscolar.status).all()
    
    por_prioridade = db.query(
        ProblemaEscolar.prioridade,
        func.count(ProblemaEscolar.id).label('total')
    ).group_by(ProblemaEscolar.prioridade).all()
    
    return {
        "total_problemas": total,
        "por_status": {item.status: item.total for item in por_status},
        "por_prioridade": {item.prioridade: item.total for item in por_prioridade}
    }