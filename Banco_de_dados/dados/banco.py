import pandas as pd
import psycopg2
from psycopg2 import Error
from psycopg2 import sql
import psycopg2.extras


# -------------------------------------------
# 1. Criar banco de dados (caso não exista)
# -------------------------------------------
def criar_database(db_name, user, password, host, port='5432'):
    """
    Cria um banco de dados no PostgreSQL caso ele ainda não exista.
    Não pode usar um BD que não existe para conectar, por isso conecta no BD 'postgres'.
    """

    try:
        # Conectar ao banco padrão para criar o novo banco
        conn = psycopg2.connect(
            dbname="postgres",
            user=user,
            password=password,
            host=host,
            port=port
        )
        conn.autocommit = True
        cur = conn.cursor()

        # Verificar se já existe
        cur.execute("SELECT 1 FROM pg_database WHERE datname = %s", (db_name,))
        existe = cur.fetchone()

        if not existe:
            cur.execute(sql.SQL("CREATE DATABASE {}").format(
                sql.Identifier(db_name)
            ))
            print(f"✔ Banco de dados '{db_name}' criado com sucesso!")
        else:
            print(f"ℹ Banco '{db_name}' já existe.")

        cur.close()
        conn.close()

    except Exception as e:
        print(f"Erro ao criar database: {e}")


# -------------------------------------------
def mapear_tipos_postgres(df: pd.DataFrame):
    mapa = {}

    for coluna, tipo in df.dtypes.items():
        if pd.api.types.is_integer_dtype(tipo):
            mapa[coluna] = "BIGINT"
        elif pd.api.types.is_float_dtype(tipo):
            mapa[coluna] = "DOUBLE PRECISION"
        elif pd.api.types.is_datetime64_any_dtype(tipo):
            mapa[coluna] = "TIMESTAMP"
        else:
            mapa[coluna] = "TEXT"
    
    return mapa


# -------------------------------------------
def criar_tabela_ano(conn):
    sql = """
    CREATE TABLE IF NOT EXISTS ano (
        ano INTEGER PRIMARY KEY
    );
    """
    cur = conn.cursor()
    cur.execute(sql)
    conn.commit()
    cur.close()


# -------------------------------------------
def criar_tabela_postgres(df: pd.DataFrame, conn, tabela: str):
    tipos = mapear_tipos_postgres(df)

    colunas_sql = []
    for coluna, tipo_postgres in tipos.items():
        col_esc = coluna.replace('"', '""')
        colunas_sql.append(f'"{col_esc}" {tipo_postgres}')

    tabela_esc = tabela.replace('"', '""')

    # Garantir que exista coluna "ano" na tabela
    if "ano" not in df.columns:
        colunas_sql.append('"ano" INTEGER')

    sql_cmd = f"""
    CREATE TABLE IF NOT EXISTS "{tabela_esc}" (
        {", ".join(colunas_sql)},
        FOREIGN KEY ("ano") REFERENCES ano(ano)
    );
    """

    cur = conn.cursor()
    cur.execute(sql_cmd)
    conn.commit()
    cur.close()


# -------------------------------------------
def insert_ano(conn, ano):
    sql_cmd = """
    INSERT INTO ano (ano)
    VALUES (%s)
    ON CONFLICT DO NOTHING;
    """
    cur = conn.cursor()
    cur.execute(sql_cmd, (ano,))
    conn.commit()
    cur.close()


# -------------------------------------------
def inserir_dados(df: pd.DataFrame, conn, tabela: str, chunk_size=1000):
    cursor = conn.cursor()
    df = df.where(pd.notnull(df), None)

    colunas = list(df.columns)
    colunas_sql = ", ".join(f'"{c}"' for c in colunas)
    placeholders = ", ".join(["%s"] * len(colunas))

    tabela_esc = tabela.replace('"', '""')

    sql_cmd = f"""
    INSERT INTO "{tabela_esc}" ({colunas_sql})
    VALUES ({placeholders})
    ON CONFLICT DO NOTHING
    """

    linhas = [tuple(x) for x in df.to_numpy()]

    psycopg2.extras.execute_batch(cursor, sql_cmd, linhas, page_size=chunk_size)
    conn.commit()

    print(f"✔ Inseridos {len(linhas)} registros para tabela {tabela_esc}.")
    cursor.close()


# -------------------------------------------
def conectar_bd(db_name, user, password, host, port='5432'):
    try:
        conn = psycopg2.connect(
            dbname=db_name,
            user=user,
            password=password,
            host=host,
            port=port
        )
        print("✔ Conexão concluída com sucesso!")
        return conn
    except Error as e:
        print(f"Erro ao conectar com o bd: {e}")
        return None
