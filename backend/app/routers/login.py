from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated

from schemas import authSchema, gerais
from security import auth, password

router = APIRouter(
    prefix='/login',
    tags=['login']
)

# responses com teste para documentação automatica
@router.post(
        '/',
        responses= {
            401: {
                'model': gerais.HTTPError,
                'description': 'Incorrect email or password'
            }
        },
        response_model= authSchema.Token
)
def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    # modificar o corpo do OAuth2PasswordRequestForm para
    # suportar email ao invez de username

    # consultar no banco e verificar senha...
    token = auth.gerar_jwt({'email': form_data.username})
    return{'access_token': token, 'token_type': 'bearer'}