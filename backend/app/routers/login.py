from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated

from schemas import authSchema, httpError
from security import auth, password
from db.connection import SessionLocal
from db.models import Usuario, Permissoes, Usuario_cargo, Cargo_permissao

router = APIRouter(
    prefix='/login',
    tags=['login']
)

# responses com teste para documentação automatica
@router.post(
        '/',
        responses= {
            401: {
                'model': httpError.HTTPError,
                'description': 'Email ou senha incorretos'
            }
        },
        response_model= authSchema.loginResponse
)
def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    # consultar no banco e verificar senha e retornar o id dele...
    ERRO_401 = HTTPException(
        status_code=401,
        detail='Email ou senha incorretos',
        headers={'WWW-Authenticate': 'Bearer'}
    )

    with SessionLocal() as db:
        usuario = db.query(Usuario).filter(Usuario.email == form_data.username).first()
        if not usuario or not password.comp(form_data.password, usuario.senha):
            raise ERRO_401
        permissoes: list[Permissoes] = (
            db.query(Permissoes)
            .join(Cargo_permissao, Permissoes.id == Cargo_permissao.permissao_FK)
            .join(Usuario_cargo, Cargo_permissao.cargo_FK == Usuario_cargo.cargo_FK)
            .filter(Usuario_cargo.usuario_FK == usuario.id)
            .all()
        )

    token = auth.gerar_jwt({'id': usuario.id})
    # retornar o usuário completo abaixo
    return {
        'access_token': token,
        'token_type': 'bearer',
        'user': {
            'id': usuario.id,
            'nome': usuario.nome,
            'email': usuario.email,
            'telefone': usuario.telefone,
            'cpf': usuario.cpf,
            'permissoes': [permissao.nome for permissao in permissoes]
        }
    }