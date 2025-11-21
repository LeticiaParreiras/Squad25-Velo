import os
import pandas as pd

arquivo = r"C:\Users\ramon\OneDrive\Desktop\faculdade\Squad25-Velo\Banco_de_dados\banco de dados\Arquivos\entrada\SIMEC.csv"

print("Tamanho (MB):", os.path.getsize(arquivo) / (1024*1024))

df = pd.read_csv(arquivo, encoding="latin1", sep=";", nrows=10)
print("Colunas:", len(df.columns))
print("Primeiras linhas:")
print(df.head())