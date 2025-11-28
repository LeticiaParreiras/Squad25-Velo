import pandas as pd
import psycopg2
from psycopg2 import Error


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


def criar_tabela_postgres(df: pd.DataFrame, conn, tabela: str):
    tipos = mapear_tipos_postgres(df)

    colunas_sql = []
    for coluna, tipo_postgres in tipos.items():
        col_esc = coluna.replace('"', '""')
        colunas_sql.append(f'"{col_esc}" {tipo_postgres}')

    tabela_esc = tabela.replace('"', '""')

    sql = f"""
    CREATE TABLE IF NOT EXISTS "{tabela_esc}" (
        {", ".join(colunas_sql)},
        FOREIGN KEY ("ano") REFERENCES ano(ano)
    );
    """

    cur = conn.cursor()
    cur.execute(sql)
    conn.commit()
    cur.close()


def insert_ano(conn, ano):
    sql = """
    INSERT INTO ano (ano)
    VALUES (%s)
    ON CONFLICT DO NOTHING;
    """
    cur = conn.cursor()
    cur.execute(sql, (ano,))
    conn.commit()
    cur.close()


def inserir_dados(df: pd.DataFrame, conn, tabela: str, chunk_size=1000):
    cursor = conn.cursor()

    df = df.where(pd.notnull(df), None)

    colunas = list(df.columns)
    colunas_sql = ", ".join(f'"{c}"' for c in colunas)
    placeholders = ", ".join(["%s"] * len(colunas))

    tabela_esc = tabela.replace('"', '""')
    print(placeholders)
    sql = f"""
    INSERT INTO "{tabela_esc}" ({colunas_sql})
    VALUES ({placeholders})
    """

    linhas = [tuple(x) for x in df.to_numpy()]

    for i in range(0, len(linhas), chunk_size):
        batch = linhas[i:i+chunk_size]
        cursor.executemany(sql, batch)
        print(f"Inseridos {i + len(batch)} registros...")
    conn.commit()

    cursor.close()



def conectar_bd(db_name, user, password, host, port='5432'):
    try:
        conn = psycopg2.connect(
            dbname=db_name,
            user=user,
            password=password,
            host=host,
            port=port
        )
        print("Conexão concluída com sucesso!")
        return conn
    except Error as e:
        print(f"Erro ao conectar com o bd: {e}")
        return None
