import pandas as pd

entrada = 'SIMEC.csv'
saida = r'C:\Users\ramon\OneDrive\Desktop\faculdade\SIMEC_UTF8.csv'

def conversor_utf8(entrada, saida):
    # Lê o CSV com separador de ponto e vírgula e aspas
    df = pd.read_csv(entrada, encoding='latin1', sep=';', quotechar='"')
    
    # Converte para UTF-8 e salva
    df.to_csv(saida, index=False, encoding='utf-8')
    print(f"Conversão concluída! Arquivo salvo em: {saida}")

if __name__ == '__main__':
    conversor_utf8(entrada, saida)

