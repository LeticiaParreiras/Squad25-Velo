from jose import jwt, JWTError
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os

from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status, Cookie
from typing import Annotated

from schemas.authSchema import UsuarioBase
from db.connection import SessionLocal
from db.models import Usuario, Permissoes, Usuario_cargo, Cargo_permissao

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY_JWT")
ALGORITHM = os.getenv("ALGORITHM")
EXP_MINUTOS = 1440  # 1 dia

def gerar_jwt(dados: dict, exp_minutos: int | None = EXP_MINUTOS) -> str:
    exp_datetime = datetime.now() + timedelta(minutes=exp_minutos)
    dados.update({'exp': exp_datetime.timestamp()})

    return jwt.encode(dados, key=SECRET_KEY, algorithm=ALGORITHM)
    
def decodificar_jwt(cod_jwt: str):
    return jwt.decode(cod_jwt, key=SECRET_KEY, algorithms=[ALGORITHM])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="users/login", auto_error=False)

def obter_token(
    cookie_token: Annotated[str | None, Cookie(alias="access_token")] = None,
    header_token: Annotated[str | None, Depends(oauth2_scheme)] = None
):
    if cookie_token:
        return cookie_token
    
    if header_token:
        return header_token

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Não autenticado",
    )

# essa será a função que irá proteger as rotas
def autenticar(token: Annotated[str, Depends(obter_token)]) -> UsuarioBase:
    erro_de_verificacao = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciais inválidas",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = decodificar_jwt(token)
        # mover o try e except para o decodificar json
        # verificações deverão ser feitas aqui
        usuario = UsuarioBase(**payload)
        with SessionLocal() as db:
            usuario_db = db.query(Usuario).filter(Usuario.id == usuario.id).first()
            if not usuario_db:
                raise erro_de_verificacao
            
        return usuario
    except JWTError:
        raise erro_de_verificacao
    
def autenticar_adm(User: UsuarioBase = Depends(autenticar)):
    nao_adm_erro = HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Cargo não autorizado",
    )

    
    if User.cargo != 'admin':
        raise nao_adm_erro
    
    return User

def requisitar_permissao(permissao: str):
    def _check_permission(User: UsuarioBase = Depends(autenticar)):
        with SessionLocal() as db:
            permissoes = (
                db.query(Permissoes.nome)
                .join(Cargo_permissao, Permissoes.id == Cargo_permissao.permissao_FK)
                .join(Usuario_cargo, Cargo_permissao.cargo_FK == Usuario_cargo.cargo_FK)
                .filter(Permissoes.nome == permissao, Usuario_cargo.usuario_FK == User.id)
                .first()
            )
            if not permissoes:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Permissão negada",
                )
        return User

    # A fábrica retorna a função de checagem
    return _check_permission