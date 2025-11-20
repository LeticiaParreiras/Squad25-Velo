from fastapi import HTTPException, status, APIRouter
from typing import List, Optional
from datetime import datetime
from uuid import UUID, uuid4
from schemas.problemasEscolaresSchema import  problemasEscolares, problemasEscolaresUpdate

# Criar o router para problemasEscolares
router = APIRouter(
    prefix='/problemasEscolares',
    tags=['problemasEscolares']
)

# Banco de dados simulado (em memória)
problemas_db: dict[UUID, dict] = {}

# CREATE - Criar nova problema
@router.post("/", response_model=problemasEscolares, status_code=status.HTTP_201_CREATED)
async def criar_problema(problema: problemasEscolares):
    """Cria uma nova problema"""
    problema_id = uuid4()
    agora = datetime.now()
    
    novo_problema = {
    "id": str(problema_id),
    "titulo": problema.titulo,
    "descricao": problema.descricao,
    "prioridade": problema.prioridade,
    "status": problema.status,
    "nome_escola": problema.nome_escola,
    "local": problema.local,
    "categoria_administrativa": problema.categoria_administrativa,
    "nivel_ensino": problema.nivel_ensino,
    "responsavel": problema.responsavel,
    }
    
    problemas_db[problema_id] = novo_problema
    return novo_problema

# READ - Listar todas as problemasEscolares
@router.get("/", response_model=List[problemasEscolares])
async def listar_problemasEscolares(
    status: Optional[str] = None,
    prioridade: Optional[str] = None,
    skip: int = 0,
    limit: int = 100
):
    """Lista todas as problemasEscolares com filtros opcionais"""
    list_problemasEscolares = list(problemas_db.values())
    
    # Filtros
    if status:
        list_problemasEscolares = [d for d in list_problemasEscolares if d["status"] == status]
    if prioridade:
        list_problemasEscolares = [d for d in list_problemasEscolares if d["prioridade"] == prioridade]
    
    # Paginação
    return list_problemasEscolares[skip: skip + limit]

# READ - Buscar problema por ID
@router.get("/{problema_id}", response_model=problemasEscolares)
async def buscar_problema(problema_id: UUID):
    """Busca uma problema específica por ID"""
    if problema_id not in problemas_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"problema com ID {problema_id} não encontrada"
        )
    return problemas_db[problema_id]

# UPDATE - Atualizar problema
@router.patch("/{problema_id}", response_model=problemasEscolares)
async def atualizar_problema(problema_id: UUID, problema_update: problemasEscolaresUpdate):
    """Atualiza uma problema existente"""
    if problema_id not in problemas_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"problema com ID {problema_id} não encontrada"
        )
    
    problema_atual = problemas_db[problema_id]
    
    # Atualiza apenas os campos fornecidos
    update_data = problema_update.model_dump(exclude_unset=True)
    for campo, valor in update_data.items():
        problema_atual[campo] = valor
    
    problema_atual["data_atualizacao"] = datetime.now()
    
    return problema_atual

# DELETE - Deletar problema
@router.delete("/{problema_id}", status_code=status.HTTP_204_NO_CONTENT)
async def deletar_problema(problema_id: UUID):
    """Deleta uma problema"""
    if problema_id not in problemas_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"problema com ID {problema_id} não encontrada"
        )
    
    del problemas_db[problema_id]
    return None