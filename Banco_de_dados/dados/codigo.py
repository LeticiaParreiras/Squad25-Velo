import os
import pandas as pd
import numpy as np
import banco
from dotenv import load_dotenv
from logs import logger

# caminhos (use os.path.join para evitar escapes)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ENTRADA = os.path.join(BASE_DIR, 'Arquivos', 'entrada', 'SIMEC.csv')
SAIDA_FILE = os.path.join(BASE_DIR, 'Arquivos', 'saida', 'SIMEC_UTF8.csv')

load_dotenv()


# Conversor latin1 -> UTF8
def conversor_utf8(ENTRADA, SAIDA_FILE):
    # garante que a pasta de saida exista
    out_dir = os.path.dirname(SAIDA_FILE)
    os.makedirs(out_dir, exist_ok=True)

    df = pd.read_csv(ENTRADA, encoding='latin1', sep=';', quotechar='"', low_memory=False)
    df.to_csv(SAIDA_FILE, index=False, encoding='utf-8')
    print(f"Conversão concluída! Arquivo salvo em: {SAIDA_FILE}")
    return SAIDA_FILE


#Lê o CSV
def ler(SAIDA_FILE) -> pd.DataFrame:
    return pd.read_csv(SAIDA_FILE, encoding='utf-8')


def tratamentos(df: pd.DataFrame) -> pd.DataFrame:

    # Normalizar colunas
    df.columns = df.columns.str.strip()

    numericos = {
        'Número': 'Int64',
        'Número da Licitação': 'Int64',
        'Quantidade Alunos': 'Int64',
        'Prazo de Vigência': 'Int64',
        'Número Entidade': 'Int64',
        'Banco': 'Int64'
    }

    flutuantes = {
        'Saldo da Conta': 'Float64',
        'Saldo Fundos': 'Float64',
        'Saldo da Poupança': 'Float64',
        'Saldo CDB': 'Float64',
        'Saldo TOTAL': 'Float64',
        'Latitude': 'Float64',
        'Longitude': 'Float64',
        'IBGE': 'Float64',
        'Percentual de Execução': 'Float64',
        'Valor do Contrato': 'Float64',
        'Valor Pactuado FNDE': 'Float64',
        'Aporte de Recurso Município': 'Float64',
        'Total Pago': 'Float64',
        'Percentual Pago': 'Float64'
    }

    colunas_data = [
        'Data Última Análise Solicitação',
        'Fim Da Vigência Termo/Convênio',
        'Homologação da Licitação',
        'Data de Assinatura do Contrato',
        'Data de Término do Contrato',
        'Data da Última Vistoria do Estado ou Município',
        'Data Prevista De Conclusão Da Obra',
        'Data'
    ]

# conversão de inteiros
    for coluna, tipo in numericos.items():
        if coluna in df.columns:
            df[coluna] = (
                df[coluna]
                .astype(str)
                .str.replace(r'[^0-9-]', '', regex=True)
                .replace('', np.nan)
            )
            df[coluna] = pd.to_numeric(df[coluna], errors='coerce').astype(tipo)

# Conversão de Floats
    for coluna, tipo in flutuantes.items():
        if coluna in df.columns:
            df[coluna] = (
                df[coluna]
                .astype(str)
                .str.replace('.', '', regex=False)            # Remove separador de milhar
                .str.replace(',', '.', regex=False)           # Troca vírgula por ponto
                .str.replace(r'[^0-9.-]', '', regex=True)
                .replace('', np.nan)
            )
            df[coluna] = pd.to_numeric(df[coluna], errors='coerce').astype(tipo)

# Datas
    for coluna in colunas_data:
        if coluna in df.columns:
            df[coluna] = pd.to_datetime(df[coluna], errors='coerce', dayfirst=True)

    num_cols = df.select_dtypes(include=['number']).columns
    str_cols = df.select_dtypes(include=['object']).columns

    df[num_cols] = df[num_cols].fillna(np.nan)
    df[str_cols] = df[str_cols].fillna('NaS')

    return df
# Pipeline principal


def pipeline():
    logger.info("Pipeline iniciada.")
    try:
        arquivo_saida = conversor_utf8(ENTRADA, SAIDA_FILE)
        logger.info(f"Arquivo convertido e salvo em {arquivo_saida}")

        df = ler(arquivo_saida)
        logger.info(f"Arquivo carregado. Linhas: {len(df)}")

        df = tratamentos(df)
        logger.info("Tratamentos finalizados.")

        conn = banco.conectar_bd(
            db_name=os.getenv("MB_DB_DBNAME"), 
            user=os.getenv("MB_DB_USER"),
            password=os.getenv("MB_DB_PASS"),
            host=os.getenv("MB_DB_HOST"),
            port=os.getenv("MB_DB_PORT")
        )
        if conn:
            logger.info("Conexão com banco estabelecida.")
            try:
                banco.criar_tabela_postgres(df, conn, tabela="Simec")
                logger.info("Tabela criada/validada.")
                
                banco.inserir_dados(df, conn, tabela='Simec')
                logger.info(f"Foram inseridas {len(df)} linhas.")
            except Exception as e:
                logger.error(f"Erro ao inserir dados: {str(e)}")
                raise
            finally:
                conn.close()
                logger.info("Conexão fechada.")
        else:
            logger.error("Falha ao conectar no banco.")

    except Exception as e:
        logger.error(f"Erro geral na pipeline: {e}")

    logger.info("Pipeline concluída.")


if __name__ == "__main__":
    pipeline()
