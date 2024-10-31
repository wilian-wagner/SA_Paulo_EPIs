import { listarEPIs, criarEPI, editarEPI, deletarEPI } from '../models/Epi.js';

 const getEPIs = async (req, res) => {
  try {
    const epis = await listarEPIs();
    res.json(epis);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar EPIs' });
  }
};

 const postEPI = async (req, res) => {
  try {
    const { nome, quantidade } = req.body;
    // Definindo o status com base na quantidade em estoque
    const status = quantidade > 0 ? 'Disponível' : 'Indisponível';
    // Criando o EPI com o status calculado
    const novoEpi = await criarEPI(nome, quantidade, status);

    res.json(novoEpi);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar EPI',error});
  }
};

const putEPI = async (req, res) => {
  const { id } = req.params;
  const { nome, quantidade } = req.body;

  try {
    const epiAtualizado = await editarEPI(id, nome, quantidade);

    if (!epiAtualizado) {
      return res.status(404).send({ mensagem: 'EPI não encontrado' });
    }

    res.status(200).send({ mensagem: 'EPI atualizado com sucesso', epi: epiAtualizado });
  } catch (error) {
    res.status(500).send({ mensagem: 'Erro ao atualizar EPI', error: error.message });
  }
};


const deleteEPI = async (req, res) => {
  const {id} = req.params;

  try{
    const epiDelete = await deletarEPI(id)
    if (!epiDelete) {
      return res.status(200).send({ mensagem: 'EPI deletado com sucesso'});;
    }
  }catch (error) {
    res.status(500).send({ mensagem: 'Erro ao deletar EPI', error: error.message });
  }
};

export { getEPIs, postEPI, putEPI, deleteEPI}