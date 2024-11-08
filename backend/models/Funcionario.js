import conexao from '../config/database.js';

const listarFuncionarios = async () => {
  const res = await conexao.query('SELECT * FROM funcionarios');
  return res.rows;
};


const criarFuncionario = async (nome, cargo, setor, email) => {
  const res = await conexao.query(
    'INSERT INTO funcionarios (nome, cargo, setor, email) VALUES ($1, $2, $3, $4) RETURNING *',
    [nome, cargo, setor, email]
  );
  return res.rows[0];
};

const editarFuncionario = async (id, dados) => {
  const campos = [];
  const valores = [];

  // Monta dinamicamente os campos e valores que serão atualizados
  Object.entries(dados).forEach(([chave, valor], index) => {
    campos.push(`${chave} = $${index + 1}`);
    valores.push(valor);
  });

  // Adiciona o ID no final da lista de valores
  valores.push(id);

  const query = `
    UPDATE funcionarios 
    SET ${campos.join(', ')} 
    WHERE id = $${valores.length} 
    RETURNING *`;
  console.log(query,valores)
  const resultado = await conexao.query(query, valores);
  return resultado.rows[0];
};

const deletarFuncionario = async (id) => {
  const resultado = await conexao.query(
    'DELETE FROM funcionarios WHERE id = $1',
    [id]
  )
  return resultado.rows[0];
}


export { listarFuncionarios, listarFuncionariosID, criarFuncionario, editarFuncionario, deletarFuncionario }