from .models import *
from .connection import Base, engine, SessionLocal
import requests
from bs4 import BeautifulSoup
from security.password import cript

def criar_tabelas():
    Base.metadata.create_all(bind=engine)
    print('tabelas criadas')

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
    response = requests.get('https://www.gov.br/inep/pt-br/acesso-a-informacao/dados-abertos/microdados/censo-escolar')
    soup = BeautifulSoup(response.content, 'html.parser')
    response.raise_for_status()

    tags_dos_links = soup.find_all('a', class_='external-link')

    # criando uma lista para armazenar os anos e links
    links = []
    for tag in tags_dos_links:
        link = tag['href']
        ano = link[-8:-4]
        links.append({'ano': ano, 'link': link})

    anos = [link['ano'] for link in links]
    
    with SessionLocal() as db:
        for ano in anos:
            db.add(Controle_censo(ano=int(ano), situacao='Não baixado'))

        db.commit()
    print('anos semeados')

def criar_usuario_teste(nome, email, cpf, telefone, senha, cargo):
    with SessionLocal() as db:
        user = Usuario(
            nome=nome,
            email=email,
            cpf=cpf,
            telefone=telefone,
        )

        user.senha = cript(senha)
        db.add(user)
        cargo_db = db.query(Cargos).filter(Cargos.nome == cargo).first()
        db.commit()
        db.refresh(user)
        db.add(Usuario_cargo(usuario_FK=user.id, cargo_FK=cargo_db.id))
        db.commit()

    print('\n\nusuario teste criado')
    print(f'Email: {email}, Senha: {senha}\n\n')

def criar_semear():
    criar_tabelas()
    semear_permissoes()
    semear_cargos()
    semear_relacionamentos()
    semear_anos_censo()