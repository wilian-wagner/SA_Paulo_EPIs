import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import '../SASS/historicoStyle.scss'

const Historico = () => {
    const [movimentacoes, setMovimentacoes] = useState([]);

    useEffect(() => {
        async function fetchMovimentacoes() {
            try {
                const response = await axios.get('/api/movimentacoes');
                setMovimentacoes(response.data);
            } catch (error) {
                console.error("Erro ao buscar movimentações:", error);
                setMovimentacoes();
            }
        }

        fetchMovimentacoes();
    }, []);

    return (
        <div>
            <header className="header">
                <div className="header-logo">
                    <img src="./src/assets/logo.png" alt="Logo" className="logo" />
                    <h1>Master EPIs Manager</h1>
                </div>
                <nav className="header-nav">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/Funcionarios" className="nav-link">Funcionários</Link>
                    <Link to="/Epi" className="nav-link">Equipamento</Link>
                    <Link to="/Historico" className="nav-link">Histórico</Link>
                </nav>
            </header>

            <h1>Histórico de Movimentações</h1>

            {Array.isArray(movimentacoes) && movimentacoes.length > 0 ? (
                movimentacoes.map((mov) => (
                    <div key={mov.id}>
                        <p><strong>ID:</strong> {mov.id}</p>
                        <p><strong>Funcionário ID:</strong> {mov.funcionario_id}</p>
                        <p><strong>EPI ID:</strong> {mov.epi_id}</p>
                        <p><strong>Tipo de Movimentação:</strong> {mov.tipo_movimentacao}</p>
                        <p><strong>Data:</strong> {mov.data}</p>
                    </div>
                ))
            ) : (
                <p>Sem movimentações para exibir.</p>
            )}
        </div>
    );
};

export default Historico