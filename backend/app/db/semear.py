from .models import Cargos, Permissoes
from .connection import SessionLocal

def semear_permissoes():
    # adicionar mais permissões conforme necessário
    permissoes = [
        'adicionar_admin',
        'remover_admin',
        'adicionar_usuario',
        'remover_usuario',
    ]
    with SessionLocal() as db:
        for permissao in permissoes:
            nova_permissao = Permissoes(nome=permissao)
            db.add(nova_permissao)
        db.commit()
    print("Permissões semeadas com sucesso.")

def semear_cargos():
    cargos = [
        'superadmin',
        'admin',
        'user',
    ]
    with SessionLocal() as db:
        for cargo in cargos:
            novo_cargo = Cargos(nome=cargo)
            db.add(novo_cargo)
        db.commit()
    print("Cargos semeados com sucesso.")