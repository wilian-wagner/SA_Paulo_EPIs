// EditarFuncionario.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../SASS/funcionarioStyle.scss'

function EditarFuncionario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [funcionario, setFuncionario] = useState({
    nome: '',
    cargo: '',
    setor: '',
    email: ''
  });

  useEffect(() => {
    const carregarFuncionario = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/funcionarios/${id}`);
        setFuncionario(response.data);
      } catch (error) {
        console.error("Erro ao carregar funcionário:", error);
      }
    };
    carregarFuncionario();
  }, [id]);

  const handleChange = (e) => {
    setFuncionario({ ...funcionario, [e.target.name]: e.target.value });
  };

  const atualizarFuncionario = async (e) => {
    e.preventDefault();

    const dadosAtualizados = Object.fromEntries(
      Object.entries(funcionario).filter(([key, value]) => value !== '')
    );

    try {
      await axios.put(`http://localhost:3000/funcionarios/${id}`, dadosAtualizados);
      navigate('/funcionarios');
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
    }
  };


  return (
    <div className="editar-funcionario-page">
      <header className="header">
        <div className="header-logo">
          <button className='btn-voltar' onClick={() => navigate('/funcionarios')}>⬅ Voltar</button>
          <h1>Master EPIs Manager</h1>
        </div>
      </header>

      <h2>Editar Funcionário</h2>
      <form onSubmit={atualizarFuncionario}>
        <input
          type="text"
          name="nome"
          value={funcionario.nome}
          onChange={handleChange}
          placeholder="Nome"
        />
        <input
          type="text"
          name="cargo"
          value={funcionario.cargo}
          onChange={handleChange}
          placeholder="Cargo"
        />
        <input
          type="text"
          name="setor"
          value={funcionario.setor}
          onChange={handleChange}
          placeholder="Setor"
        />
        <input
          type="email"
          name="email"
          value={funcionario.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditarFuncionario;