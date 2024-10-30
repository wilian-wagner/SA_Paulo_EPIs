import conexao from '../config/database.js';

export const listarFuncionarios = async () => {
  const res = await conexao.query('SELECT * FROM funcionarios');
  return res.rows;
};

export const criarFuncionario = async (nome, cargo, setor, email) => {
  const res = await conexao.query(
    'INSERT INTO funcionarios (nome, cargo, setor, email) VALUES ($1, $2, $3, $4) RETURNING *',
    [nome, cargo, setor, email]
  );
  return res.rows[0];
};
