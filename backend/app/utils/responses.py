from schemas.httpError import HTTPError

NOT_AUTHENTICATED_401 = {
    401: {
        "model": HTTPError,
        "description": "Usuário não autenticado, Token inválido ou não fornecido.",
        "content": {
            "application/json": {
                "example": {"detail": "Mensagem de erro aqui"}
            }
        }
    }
}

FORBIDDEN_403 = {
    403: {
        "model": HTTPError,
        "description": "O usuário está autenticado, mas não tem permissão para acessar",
        "content": {
            "application/json": {
                "example": {"detail": "Permissão negada"}
            }
        }
    }
}

AUTH_RESPONSES = {
    **NOT_AUTHENTICATED_401,
    **FORBIDDEN_403
}