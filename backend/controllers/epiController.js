import { listarEPIs, criarEPI } from '../models/Epi.js';

export const getEPIs = async (req, res) => {
  try {
    const epis = await listarEPIs();
    res.json(epis);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar EPIs' });
  }
};

export const postEPI = async (req, res) => {
  try {
    const { nome, quantidade, status } = req.body;
    const novoEpi = await criarEPI(nome, quantidade, status);
    res.json(novoEpi);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar EPI' });
  }
};
