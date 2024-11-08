import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import '../SASS/funcionarioStyle.scss'

function Funcionario() {
    const [funcionario, setFuncionario] = useState({
        nome: '',
        cargo: '',
        setor: '',
        email: ''
    })

    const handleChange = (e) => {
        setFuncionario({ ...funcionario, [e.target.name]: e.target.value })
    }

    const cadastrar = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/funcionarios', funcionario)
            console.log(response.data)
            setFuncionario({ nome: '', cargo: '', setor: '', email: '' })
        } catch (error) {
            console.error("Erro ao cadastrar funcionário:", error)
        }
    }

    const [exibirFuncionario, setExibirFuncionario] = useState(null)
    
    
    useEffect(() => {
        carregarFuncionario()
    }, [])

    const carregarFuncionario = async () => {
        const response = await axios.get('')
    }



    return (
        <div className='funcionario-page container'>
            <header className="header">
                <div className="header-logo">
                    <img src="./src/assets/logo.png" alt="Logo" className="logo" />
                    <h1>Master EPIs Manager</h1>
                </div>
                <nav className="header-nav">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/EPI" className="nav-link">Equipamento</Link>
                    <Link to="/Historico" className="nav-link">Histórico</Link>
                </nav>
            </header>

            <main className="funcionario-main-content">
                <section className="intro">
                    <h2>Cadastro de Funcionário</h2>
                    <form onSubmit={cadastrar}>
                        <input
                            type="text"
                            name="nome"
                            onChange={handleChange}
                            value={funcionario.nome}
                            placeholder="Nome"
                        />
                        <input
                            type="text"
                            name="cargo"
                            onChange={handleChange}
                            value={funcionario.cargo}
                            placeholder="Cargo"
                        />
                        <input
                            type="text"
                            name="setor"
                            onChange={handleChange}
                            value={funcionario.setor}
                            placeholder="Setor"
                        />
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={funcionario.email}
                            placeholder="Email"
                        />
                        <button type="submit" className="btn-cadastrar">Cadastrar</button>
                    </form>
                </section>

                <section>


                </section>



            </main>

        </div>
    )
}

export default Funcionario
