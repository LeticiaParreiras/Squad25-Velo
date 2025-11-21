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

def criar_tabela_postgres(df: pd.DataFrame, conn, tabela: str):
    tipos = mapear_tipos_postgres(df)

    colunas_sql = []
    for coluna, tipo_postgres in tipos.items():
        # escapar possíveis aspas no nome da coluna
        col_esc = coluna.replace('"', '""')
        colunas_sql.append(f'"{col_esc}" {tipo_postgres}')

    # sempre usar table name entre aspas para preservar case (caller passa o nome desejado)
    tabela_esc = tabela.replace('"', '""')
    sql = f"""
    CREATE TABLE IF NOT EXISTS "{tabela_esc}" (
        {", ".join(colunas_sql)}
    );
    """

    try:
        cursor = conn.cursor()
        cursor.execute(sql)
        conn.commit()
        cursor.close()
        print(f"Tabela '{tabela}' criada ou já existe.")
    except Exception as e:
        print(f"Erro ao criar tabela: {e}")
        # não re-raise para não quebrar pipeline automaticamente; log apenas


def inserir_dados(df: pd.DataFrame, conn, tabela: str, chunk_size=1000):
    cursor = conn.cursor()

    # Substituir NaN por None (POSTGRES entende como NULL)
    df = df.where(pd.notnull(df), None)

    colunas = list(df.columns)
    # escapar colunas
    colunas_sql = ", ".join([f'"{c.replace("\"", "\"\"")}"' for c in colunas])
    valores_placeholder = ", ".join(["%s"] * len(colunas))

    tabela_esc = tabela.replace('"', '""')
    insert_sql = f"""
    INSERT INTO "{tabela_esc}" ({colunas_sql})
    VALUES ({valores_placeholder});
    """

    linhas = [tuple(r) for r in df.values.tolist()]

    try:
        for i in range(0, len(linhas), chunk_size):
            batch = linhas[i:i+chunk_size]
            cursor.executemany(insert_sql, batch)
            conn.commit()
            print(f"Inseridos {i + len(batch)} registros...")

        cursor.close()
        print("Todos os dados foram inseridos com sucesso!")

    except Exception as e:
        print(f"Erro ao inserir dados: {e}")
        conn.rollback()
        try:
            cursor.close()
        except:
            pass


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
