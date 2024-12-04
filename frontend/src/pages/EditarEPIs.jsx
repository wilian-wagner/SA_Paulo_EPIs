import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../SASS/epiStyle.scss'; 
function EditarEPI() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [epi, setEpi] = useState({
    nome: '',
    quantidade: '',
  });

  const handleChange = (e) => {
    setEpi({ ...epi, [e.target.name]: e.target.value });
  };

  const atualizarEpi = async (e) => {
    e.preventDefault();
    const dadosAtualizados = Object.fromEntries(
      Object.entries(epi).filter(([, value]) => value !== '')
    );
    
    try {
      await axios.put(`https://sa-paulo-epis.onrender.com/epis/${id}`, dadosAtualizados);
      navigate('/Epi'); 
    } catch (error) {
      console.error("Erro ao atualizar EPI:", error);
    }
  };

  return (
    <div className="editar-epi-page">
      <header className="header">
        <div className="header-logo">
          <button className='btn-voltar' onClick={() => navigate('/Epi')}>⬅ Voltar</button>
          <h1>Master EPIs Manager</h1>
        </div>
      </header>

      <h2>Editar EPI</h2>
      <form onSubmit={atualizarEpi}>
        <input
          type="text"
          name="nome"
          value={epi.nome}
          onChange={handleChange}
          placeholder="Nome do EPI"
        />
        <input
          type="number"
          name="quantidade"
          value={epi.quantidade}
          onChange={handleChange}
          placeholder="Quantidade"
        />
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditarEPI;