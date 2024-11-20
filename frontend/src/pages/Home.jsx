import React from 'react'
import { Link } from 'react-router-dom'
import '../SASS/homeStyle.scss'

function Home() {
    return (
        <div className='container'>
            <header className="header">
                <div className="header-logo">
                    <img src="./src/assets/logo.png" alt="Logo" className="logo" />
                    <h1>Master EPIs Manager</h1>
                </div>
                <nav className="header-nav">
                    <Link to="/Funcionarios" className="nav-link">Funcionários</Link>
                    <Link to="/Epi" className="nav-link">Equipamento</Link>
                    <Link to="/Historico" className="nav-link">Histórico</Link>
                </nav>
            </header>

            <main className="home-main-content">
                <section className="home-intro">
                    <h2>Bem-vindo ao Master EPIs Manager!</h2>
                    <p>
                        O <strong>Master EPIs Manager</strong> é um software web projetado para melhorar a gestão de Equipamentos de Proteção Individual (EPIs),
                        funcionários e os processos de retirada e devolução desses equipamentos. O objetivo é garantir a saúde do colaborador e proteger
                        o empregador de problemas legais, enquanto melhora a organização e o controle dos EPIs.
                    </p>
                </section>

                <section className="home-features">
                    <h3>O que o sistema faz</h3>
                    <ul>
                        <li>Gestão de EPIs</li>
                        <li>Gestão de Funcionários</li>
                        <li>Controle de Retirada e Devolução de EPIs</li>
                    </ul>
                </section>

                <section className="home-benefits">
                    <h3>Benefícios do sistema</h3>
                    <p>
                        Este sistema ajudará a melhorar o processo organizacional e de gestão, facilitando o acesso e a visualização de dados
                        relacionados ao uso e devolução de EPIs. A principal meta é minimizar perdas materiais e pessoais, ao controlar o uso adequado
                        dos equipamentos de segurança.
                    </p>
                </section>

            </main>

            <footer className="footer">
                <p>&copy; 2024 Master EPIs Manager - Todos os direitos reservados.</p>
            </footer>

        </div>
    )
}

export default Home
