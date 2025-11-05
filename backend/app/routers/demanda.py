from fastapi import HTTPException, status, APIRouter
from typing import List, Optional
from datetime import datetime
from uuid import UUID, uuid4
from schemas.demandaSchema import demandas, DemandaUpdate

# Criar o router para demandas
router = APIRouter(
    prefix='/demandas',
    tags=['demandas']
)

# Banco de dados simulado (em memória)
demandas_db: dict[UUID, dict] = {}

# CREATE - Criar nova demanda
@router.post("/", response_model=demandas, status_code=status.HTTP_201_CREATED)
async def criar_demanda(demanda: demandas):
    """Cria uma nova demanda"""
    demanda_id = uuid4()
    agora = datetime.now()
    
    nova_demanda = {
        "id": str(demanda_id),
        "titulo": demanda.titulo,
        "descricao": demanda.descricao,
        "prioridade": demanda.prioridade,
        "status": demanda.status,
        "responsavel": demanda.responsavel,
        "data_criacao": agora,
        "data_atualizacao": agora
    }
    
    demandas_db[demanda_id] = nova_demanda
    return nova_demanda

# READ - Listar todas as demandas
@router.get("/", response_model=List[demandas])
async def listar_demandas(
    status: Optional[str] = None,
    prioridade: Optional[str] = None,
    skip: int = 0,
    limit: int = 100
):
    """Lista todas as demandas com filtros opcionais"""
    list_demandas = list(demandas_db.values())
    
    # Filtros
    if status:
        list_demandas = [d for d in list_demandas if d["status"] == status]
    if prioridade:
        list_demandas = [d for d in list_demandas if d["prioridade"] == prioridade]
    
    # Paginação
    return list_demandas[skip: skip + limit]

# READ - Buscar demanda por ID
@router.get("/{demanda_id}", response_model=demandas)
async def buscar_demanda(demanda_id: UUID):
    """Busca uma demanda específica por ID"""
    if demanda_id not in demandas_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Demanda com ID {demanda_id} não encontrada"
        )
    return demandas_db[demanda_id]

# UPDATE - Atualizar demanda
@router.patch("/{demanda_id}", response_model=demandas)
async def atualizar_demanda(demanda_id: UUID, demanda_update: DemandaUpdate):
    """Atualiza uma demanda existente"""
    if demanda_id not in demandas_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Demanda com ID {demanda_id} não encontrada"
        )
    
    demanda_atual = demandas_db[demanda_id]
    
    # Atualiza apenas os campos fornecidos
    update_data = demanda_update.model_dump(exclude_unset=True)
    for campo, valor in update_data.items():
        demanda_atual[campo] = valor
    
    demanda_atual["data_atualizacao"] = datetime.now()
    
    return demanda_atual

# DELETE - Deletar demanda
@router.delete("/{demanda_id}", status_code=status.HTTP_204_NO_CONTENT)
async def deletar_demanda(demanda_id: UUID):
    """Deleta uma demanda"""
    if demanda_id not in demandas_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Demanda com ID {demanda_id} não encontrada"
        )
    
    del demandas_db[demanda_id]
    return None