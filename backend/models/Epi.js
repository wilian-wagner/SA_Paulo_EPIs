import conexao from '../config/database.js';

 const listarEPIs = async () => {
  const res = await conexao.query('SELECT * FROM epis');
  return res.rows;
};

 const criarEPI = async (nome, quantidade, status) => {
  const res = await conexao.query(
    'INSERT INTO epis (nome, quantidade, status) VALUES ($1, $2, $3) RETURNING *',
    [nome, quantidade, status]
  );
  return res.rows[0];
};

const editarEPI = async (id, nome, quantidade) => {
  // Determina o status com base na quantidade, caso a quantidade seja fornecida
  const status = quantidade > 0 ? 'Disponível' : 'Indisponível';

  // Criação dinâmica da query
  let query = 'UPDATE epis SET ';
  const values = [];
  let count = 1; // Contador para parâmetros da query (ex: $1, $2, etc)

  if (nome) {
    query += `nome = $${count}, `;
    values.push(nome);
    count++;
  }

  if (quantidade !== undefined) {
    query += `quantidade = $${count}, `;
    values.push(quantidade);
    count++;
    
    // Inclui o status apenas se a quantidade foi passada
    query += `status = $${count}, `;
    values.push(status);
    count++;
  }

  // Remove a última vírgula e espaço extra
  query = query.slice(0, -2);

  // Completa a query com a condição WHERE
  query += ` WHERE id = $${count} RETURNING *`;
  values.push(id);

  const resultado = await conexao.query(query, values);
  return resultado.rows[0]; // Retorna o EPI atualizado
};

const deletarEPI = async (id) => {
  const resultado = await conexao.query(
    'DELETE FROM epis WHERE id = $1',
    [id]
  )
  return resultado.rows[0];
}


export {listarEPIs, criarEPI, editarEPI, deletarEPI}