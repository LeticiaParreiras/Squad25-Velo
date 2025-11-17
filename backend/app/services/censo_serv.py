from fastapi import HTTPException
from bs4 import BeautifulSoup
from io import BytesIO
import zipfile
import asyncio
import httpx
import aiofiles

async def pegar_anos_disponiveis(client: httpx.AsyncClient) -> list[dict[str, str]]:
    try:
        response = await client.get('https://www.gov.br/inep/pt-br/acesso-a-informacao/dados-abertos/microdados/censo-escolar')
        soup = BeautifulSoup(response.content, 'html.parser')
        response.raise_for_status()

        tags_dos_links = soup.find_all('a', class_='external-link')

        # criando uma lista para armazenar os anos e links
        links = []
        for tag in tags_dos_links:
            link = tag['href']
            ano = link[-8:-4]
            links.append({'ano': ano, 'link': link})

        return links
    except:
        return links

def extrair_arquivo_zip(caminho:str, destino: str):
    with zipfile.ZipFile(BytesIO(caminho)) as arq_zip:
        arq_zip.extractall(destino)

async def atualizar(ano: str):
    # verificar se já existe alguma opereação relacionado a este ano no banco
    # se existir, cancelar a operação
    # se não, escrever no db a situação de "baixando"
    async with httpx.AsyncClient(timeout=60) as client:
        links_disponiveis = await pegar_anos_disponiveis(client)
        link = next((item for item in links_disponiveis if item['ano'] == ano), None)

        if not link:
            # escrever no db a falha do download aqui
            raise HTTPException(status_code=404, detail=f"Ano {ano} não encontrado.")
        
    print('anos coletados, iniciando download do censo...')

    for tentativas in range(1, 5):
        print(f'Tentativa {tentativas} de download do censo {ano}...')
        
        # delay para evitar bloqueio
        await asyncio.sleep(3 * tentativas)
        try:
            async with httpx.AsyncClient(timeout=120) as client:
                async with client.stream('GET', link['link']) as response:
                    response.raise_for_status()

                    print(f'Baixando arquivo do censo {ano}...')
                    async with aiofiles.open(f'censo_{ano}.zip', 'wb') as arquivo:
                        async for chunk in response.aiter_bytes(chunk_size=8192):
                            await arquivo.write(chunk)

                    # colocar o destino do arquivo censo aqui ↓
                    print(f'Extraindo arquivo do censo {ano}...')
                    await asyncio.to_thread(
                        extrair_arquivo_zip,
                        caminho=f'censo_{ano}.zip',
                        destino='./'
                    )

            print(f'Download e extração do censo {ano} concluídos.')
            break
        except Exception as e:
            # verificar se ocorreu um erro http aqui, caso contrario, lançar outro erro
            ...

async def deletar(ano: str):
    # verificar se existe dados do censo no banco
    # se existir, deletar aqui 
    # se não existir, retornar uma mensagem
    ...