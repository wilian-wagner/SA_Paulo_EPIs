// Conexão com o banco de dados
import pg from 'pg'

const conexao = new pg.Client("postgresql://jean:jAXTJ4CowRPCpB5HmpxZdA@blackzssj-1696.jxf.gcp-southamerica-east1.cockroachlabs.cloud:26257/MasterEPI?sslmode=verify-full")

try {
    await conexao.connect()
    console.log('Banco de dados conectou')
} catch (erro) {
    console.error('Erro ao conectar no banco de dados', erro)
}

export default conexao