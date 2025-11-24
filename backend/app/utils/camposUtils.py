from sqlalchemy.orm import Session
from fastapi import HTTPException, status

"""Utilitários genéricos para manipulação de campos em modelos SQLAlchemy."""

def listar_todos(db: Session, model):
    """Lista todos os registros de um determinado model."""
    return db.query(model).all()

def criar_unico(db: Session, model, data: dict, unique_field: str = "nome"):
    """Cria um novo registro somente se o valor ainda não existir."""

    # 1. Verificar se já existe o registro
    valor = data.get(unique_field)

    existente = db.query(model).filter(
        getattr(model, unique_field) == valor
    ).first()

    if existente:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"{model.__tablename__}: '{valor}' já existe."
        )

    # 2. Criar o registro
    obj = model(**data)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj