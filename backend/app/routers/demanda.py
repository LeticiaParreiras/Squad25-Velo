from fastapi import HTTPException, status, APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from uuid import UUID
from schemas.demandaSchema import demandas, DemandaUpdate, createDemandas
from db.models.demanda import Demanda
from db.connection import get_db
from uuid import UUID, uuid4

# Criar o router para demandas
router = APIRouter(
    prefix='/demandas',
    tags=['demandas']
)

# CREATE - Criar nova demanda
@router.post("/", response_model=demandas, status_code=status.HTTP_201_CREATED)
async def criar_demanda(demanda: createDemandas, db: Session = Depends(get_db)):
    """Cria uma nova demanda"""

    nova_demanda = Demanda(
        
        titulo=demanda.titulo,
        descricao=demanda.descricao,
        prioridade=demanda.prioridade,
        status=demanda.status,
        categoria=demanda.categoria,
        estimativa_custo=demanda.estimativa_custo,
        responsavel=demanda.responsavel
    )
    
    db.add(nova_demanda)
    db.commit()
    db.refresh(nova_demanda)
    
    return nova_demanda

# READ - Listar todas as demandas
@router.get("/", response_model=List[demandas])
async def listar_demandas(
    status_filter: Optional[str] = None,
    prioridade: Optional[str] = None,
    categoria: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Lista todas as demandas com filtros opcionais"""
    query = db.query(Demanda)
    
    # Aplicar filtros
    if status_filter:
        query = query.filter(Demanda.status == status_filter)
    if prioridade:
        query = query.filter(Demanda.prioridade == prioridade)
    if categoria:
        query = query.filter(Demanda.categoria == categoria)
    
    # Paginação
    demandas_list = query.offset(skip).limit(limit).all()
    
    return demandas_list

# READ - Buscar demanda por ID
@router.get("/{demanda_id}", response_model=demandas)
async def buscar_demanda(demanda_id: UUID, db: Session = Depends(get_db)):
    """Busca uma demanda específica por ID"""
    demanda = db.query(Demanda).filter(Demanda.id == demanda_id).first()
    
    if not demanda:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Demanda com ID {demanda_id} não encontrada"
        )
    
    return demanda

# UPDATE - Atualizar demanda
@router.patch("/{demanda_id}", response_model=demandas)
async def atualizar_demanda(
    demanda_id: UUID, 
    demanda_update: DemandaUpdate, 
    db: Session = Depends(get_db)
):
    """Atualiza uma demanda existente"""
    demanda = db.query(Demanda).filter(Demanda.id == demanda_id).first()
    
    if not demanda:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Demanda com ID {demanda_id} não encontrada"
        )
    
    # Atualiza apenas os campos fornecidos
    update_data = demanda_update.model_dump(exclude_unset=True)
    for campo, valor in update_data.items():
        setattr(demanda, campo, valor)
    
    demanda.data_atualizacao = datetime.now()
    
    db.commit()
    db.refresh(demanda)
    
    return demanda

# DELETE - Deletar demanda
@router.delete("/{demanda_id}", status_code=status.HTTP_204_NO_CONTENT)
async def deletar_demanda(demanda_id: UUID, db: Session = Depends(get_db)):
    """Deleta uma demanda"""
    demanda = db.query(Demanda).filter(Demanda.id == demanda_id).first()
    
    if not demanda:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Demanda com ID {demanda_id} não encontrada"
        )
    
    db.delete(demanda)
    db.commit()
    
    return None
