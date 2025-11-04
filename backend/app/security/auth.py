from jose import jwt, JWTError
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os

from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
from typing import Annotated

from schemas.authSchema import Usuario

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY_JWT")
ALGORITHM = os.getenv("ALGORITHM")
EXP_MINUTOS = 1440  # 1 dia

def gerar_jwt(dados: dict, exp_minutos: int | None = EXP_MINUTOS) -> str:
    exp_datetime = datetime.now() + timedelta(minutes=exp_minutos)
    dados.update({'exp': exp_datetime.timestamp()})

    return jwt.encode(dados, key=SECRET_KEY, algorithm=ALGORITHM)
    
def decodificar_jwt(cod_jwt: str):
    # erro_de_verificacao = HTTPException(
    #     status_code=status.HTTP_401_UNAUTHORIZED,
    #     detail="Could not validate credentials",
    #     headers={"WWW-Authenticate": "Bearer"},
    # )
    # ↑↑ aqui poderá ser adicionado mais verificações
    # futuras com base nas regras de negócios
    return jwt.decode(cod_jwt, key=SECRET_KEY, algorithms=[ALGORITHM])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
# essa será a função que irá proteger as rotas
def verificar_autenticacao(token: Annotated[str, Depends(oauth2_scheme)]) -> Usuario:
    erro_de_verificacao = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = decodificar_jwt(token)
        return Usuario(email=payload.get('email'))
    except JWTError:
        raise erro_de_verificacao