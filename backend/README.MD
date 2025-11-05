# Como executar o backend
Para executar o backend da aplicação, siga os passos abaixo:
1. **Certique-se que esta na pasta correta**
```
cd backend
```
2.**Crie um ambiente virtual (recomendado)**
```
python -m venv venv
venv\Scripts\activate
```
3.**Instale as dependências**
```
pip install -r requirements.txt
```
4.**Executar**
```
fastapi dev app/main.py
```
5.**Acessar API**
Após executar, a API estará disponível em:

API: http://localhost:8000
Documentação Interativa (Swagger): http://localhost:8000/docs
Documentação Alternativa (ReDoc): http://localhost:8000/redoc