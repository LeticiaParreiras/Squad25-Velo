# Sistema SIGED para a empresa VELO

Este repositório reúne **todo o ecossistema do projeto Siged**, desenvolvido para a empresa de transformação educacional **VELO**. O sistema contém:

* **Frontend (PWA em React + Vite)**
* **Backend (API em FastAPI)**
* **Banco de Dados (Scripts SQL/Migrations)**

O objetivo do projeto é construir uma solução leve, acessível e eficiente para gerenciamento e consulta de informações internas, com login, controle de usuários e integração entre camadas.

---

## Estrutura do Repositório

```
 ┣ 📁 frontend/         → Interface PWA em React + Vite
 ┣ 📁 backend/          → API em FastAPI
 ┣ 📁 Banco_de_dados/   → Scripts e modelagem do banco de dados
 ┗ README.md            → Documentação geral do projeto
```

---

## 🖥️ Frontend

O frontend foi desenvolvido em **React + Vite**, utilizando **JSX** e arquitetura PWA.

> **Obs.: A interface do sistema segue em desenvolvimento, assim como as integrções restantes.**

### Como executar o Frontend

1. Instale o **Node.js**, caso ainda não tenha.
2. Navegue até a pasta onde deseja clonar o projeto.
3. Abra um terminal (**Git Bash recomendado**).
4. Clone o repositório:

```sh
git clone https://github.com/LeticiaParreiras/Squad25-Velo.git
```

5. Acesse a pasta:

```sh
cd frontend
```

6. Instale as dependências:

```sh
npm install
```

7. Execute o projeto:

```sh
npm run dev
```

---

## ⚙️ Backend — API FastAPI

O backend foi desenvolvido em **FastAPI**, com endpoints rápidos, documentação integrada e ambiente isolado via virtualenv.

### Como executar o Backend

1. Acesse a pasta:

```sh
cd backend
```

2. (Opcional, mas recomendado) Crie e ative o ambiente virtual:

```sh
python -m venv venv
venv\Scripts\activate
```

3. Instale as dependências:

```sh
pip install -r requirements.txt
```

4. Acesse a pasta app:

```sh
cd app
```

5. Execute o servidor:

```sh
python main.py
```

ou caso queira acessar a documentação automática do fastapi

```sh
fastapi dev main.py
```

### 🌐 Acessar a API

* **API:** [http://localhost:8000](http://localhost:8000)
* **Swagger UI:** [http://localhost:8000/docs](http://localhost:8000/docs)
* **ReDoc:** [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 🗄️ Banco de Dados (DB)

A pasta **Banco_de_dados/** contém os arquivos necessários para criação, manutenção e evolução do banco de dados do projeto.

### 📌 Conteúdo da pasta `Banco_de_dados/`

* **dados/** → 
* **docker/** → 

### ▶️ Como configurar o Banco de Dados

1. Instale o **PostgreSQL** ou outro SGBD utilizado pelo projeto.
2. Navegue até a pasta `Banco_de_dados/`.
3. Execute o script principal de criação:

```sql
[comandos]
```

### ⚙️ Conectar com backend
Para conectar o banco de dados, na parta `/backend` crie um arquivo `.env` e preencha as seguintes variáveis com seus respectivos valores.:
```
SECRET_KEY_JWT= Chave secreta para a assinatura de tokens JWT.
ALGORITHM= Algoritmo de criptografia usado para os tokens JWT (ex: HS256).

DB_USER= Nome de usuário do banco de dados
DB_PASSWORD= Senha do banco de dados
DB_URL= Endereço do host do banco de dados + porta 
DB_NAME= Nome do banco de dados a ser conectado
```
### 📋 Criar tabelas dos usuarios
Após preencher as variaveis de ambiente no arquivo .env, vá até o arquivo `main` localizado em `backend\app\main.py` vá até `if __name__ == '__main__':` e retire 
o comentário da função `inicializador()` esta função irá criar as tabelas de cargos, permissões, usuarios e preenchê-los com dados ficticios

após descomentar a linha inicializadora, recomendamos comentar o restante das linhas dentro do if, para não ocorrer erros ao iniciar o servidor

com isso feito, rode o arquivo `main.py`, após finalizar, comente a linha inicializadora novamente, descomente o restante do código dentro do if e rode de novo
o arquivo `main.py`. Após estes passos, o servidor do backend em fastAPI deve estar rodando normalmente

---


# Integrantes

- Arthur de Sousa
- Letícia Ximenes
- Maria Eduarda Marques 
- Murilo Farias 
- Mateus Henrique
- Ramon Miguel Ataides 
- Tiago de Sousa
