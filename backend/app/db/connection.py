from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv
from models import *

load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_URL = os.getenv("DB_URL")
DB_NAME = os.getenv("DB_NAME")

# Validar se as variáveis estão definidas
if not all([DB_USER, DB_PASSWORD, DB_URL, DB_NAME]):
    raise ValueError("Variáveis de ambiente do banco de dados não configuradas. Verifique o arquivo .env")

SQLALCHEMY_DATABASE_URL = f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_URL}/{DB_NAME}"

try:
    engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=False)
    # Testar conexão
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
    print("✅ Conexão com banco de dados estabelecida")
except Exception as e:
    print(f"❌ Erro ao conectar ao banco: {e}")
    raise

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    """Cria uma sessão, entrega pra rota, e fecha depois que a rota termina."""
    db = SessionLocal() 
    try:
        yield db
    finally:
        db.close()