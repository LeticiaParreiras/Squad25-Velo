from fastapi import APIRouter, Depends, HTTPException, Response
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
def login(response: Response, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
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
    exp = auth.EXP_MINUTOS * 60  # Convertendo para segundos
    response.set_cookie(
        key="access_token",        
        value=token,
        httponly=True,
        max_age=exp,
        expires=exp,
        samesite='none',
        secure=True                # ativar em produção com https
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