import conexao from '../config/database.js';

export const listarEPIs = async () => {
  const res = await conexao.query('SELECT * FROM epis');
  return res.rows;
};

export const criarEPI = async (nome, quantidade, status) => {
  const res = await conexao.query(
    'INSERT INTO epis (nome, quantidade, status) VALUES ($1, $2, $3) RETURNING *',
    [nome, quantidade, status]
  );
  return res.rows[0];
};
