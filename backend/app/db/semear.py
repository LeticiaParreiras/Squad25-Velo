from .models import Cargos, Permissoes, Cargo_permissao
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
            print('adicionado permissao:', permissao)
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

def semear_relacionamentos():
    relacionamentos = {
        'superadmin': [
            'adicionar_admin',
            'remover_admin',
            'adicionar_usuario',
            'remover_usuario'
        ],
        'admin': [
            'adicionar_usuario',
            'remover_usuario'
        ],
    }

    with SessionLocal() as db:
        for cargo_nome, permissoes in relacionamentos.items():
            cargo = db.query(Cargos).filter(Cargos.nome == cargo_nome).first()
            for permissao_nome in permissoes:
                permissao = db.query(Permissoes).filter(Permissoes.nome == permissao_nome).first()
                if cargo and permissao:
                    relacionamento = Cargo_permissao(cargo_FK=cargo.id, permissao_FK=permissao.id)
                    db.add(relacionamento)
        db.commit()
    print("Relacionamentos entre cargos e permissões semeados com sucesso.")

def semear_anos_censo():
    ...