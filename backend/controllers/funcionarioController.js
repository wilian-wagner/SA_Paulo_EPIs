import { listarFuncionarios, criarFuncionario } from '../models/Funcionario.js';

export const getFuncionarios = async (req, res) => {
  try {
    const funcionarios = await listarFuncionarios();
    res.json(funcionarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar funcionários' });
  }
};

export const postFuncionario = async (req, res) => {
  try {
    const { nome, cargo, setor, email } = req.body;
    const novoFuncionario = await criarFuncionario(nome, cargo, setor, email);
    res.status(201).json(novoFuncionario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar funcionário' });
  }
};
