import httpx
import aiofiles

async def atualizar():
    # verificar se existe dados do simec em processamento no banco
    # se existir, cancelar a operação
    # se não, escrever no db a situação de "baixando"

    contexto_ssl = httpx.create_ssl_context(verify=False)
    try: 
        async with httpx.AsyncClient(timeout=60, verify=contexto_ssl) as client:
            print('Iniciando download do Simec...')
            async with client.stream(
                method='POST',
                url='https://simec.mec.gov.br/painelObras/download.php',
                data={'captcha': 'captcha'},
                timeout=120
            ) as response:
                
                response.raise_for_status()

                nome_do_arquivo = response.headers.get('content-disposition')
                if nome_do_arquivo:
                    nome_do_arquivo = nome_do_arquivo.split('filename=')[1]
                else:
                    nome_do_arquivo = 'simec.xlxs'

                print('Baixando arquivo do Simec...')
                # colocar o caminho da pasta aqui ↓
                async with aiofiles.open(nome_do_arquivo, 'wb') as arquivo:
                    # escrever o andamento do download no db aqui
                    async for chunk in response.aiter_bytes(chunk_size=8192):
                        await arquivo.write(chunk)

                print('Dowloando concluído')

        # guardar a data de atualização simec no db aqui
        # atualizar os dados do simec aqui

    except:
        # escrever no db a falha do download aqui
        ...

def deletar():
    # verificar se existe dados do simec no banco
    # se existir, deletar aqui 
    # se não existir ou der qualquer outro erro retornar um erro detalhado
    ...