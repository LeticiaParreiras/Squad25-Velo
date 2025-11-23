import httpx
import aiofiles
from db.connection import SessionLocal
from db.models import Controle_simec
from datetime import datetime

async def atualizar():
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
                with SessionLocal() as db:
                    # colocar o caminho da pasta aqui ↓
                    async with aiofiles.open(nome_do_arquivo, 'wb') as arquivo:
                        # escrever o andamento do download no db aqui
                        intervarlo = 1024 * 1024 * 3 # 3 MB
                        total_baixado = 0
                        ultimo_registro = 0

                        db.add(Controle_simec(
                            situacao='Baixando',
                            progresso=0,
                            atualizado_em=datetime.now()
                        ))
                        db.commit()
                        async for chunk in response.aiter_bytes(chunk_size=8192):
                            await arquivo.write(chunk)
                            total_baixado += len(chunk)

                            if (total_baixado - ultimo_registro) >= intervarlo :
                                db.query(Controle_simec).update({
                                    'progresso': (total_baixado / (1024 * 1024)) # armazena em progresso em MB
                                })
                                db.commit()
                                print('registrado')
                                ultimo_registro = total_baixado
                    db.query(Controle_simec).update({
                        'progresso': 'Concluido',
                    })
                    db.commit()
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