import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import '../SASS/funcionarioStyle.scss'


function Funcionario() {
    const [funcionario, setFuncionario] = useState({
        nome: '',
        cargo: '',
        setor: '',
        email: ''
    })

    const [listaFuncionarios, setListaFuncionarios] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        carregarFuncionario()
    }, [])

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

    const carregarFuncionario = async () => {
        try {
            const response = await axios.get('http://localhost:3000/funcionarios');
            setListaFuncionarios(response.data);
        } catch (error) {
            console.error("Erro ao carregar funcionários:", error);
        }
    };

    const deletarFuncionario = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/funcionarios/${id}`);
            setListaFuncionarios(listaFuncionarios.filter(func => func.id !== id));
            console.log("Funcionário deletado com sucesso");
        } catch (error) {
            console.error("Erro ao deletar funcionário:", error);
        }
    };
    

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


                <section className="lista-funcionarios">
                    <h2>Funcionários Cadastrados</h2>
                    <div className="funcionarios-cards">
                        {listaFuncionarios.map((func, index) => (
                            <div key={index} className="funcionario-card">
                                <h3>{func.nome}</h3>
                                <p>Cargo: {func.cargo}</p>
                                <p>Setor: {func.setor}</p>
                                <p>Email: {func.email}</p>
                                <button className="btn-editar"
                                    onClick={() => navigate(`/funcionarios/editar/${func.id}`)}>
                                    Editar</button>
                                <button className="btn-deletar"
                                    onClick={() => deletarFuncionario(func.id)}>
                                    Deletar</button>
                            </div>
                        ))}
                    </div>
                </section>

            </main>

        </div>
    )
}

export default Funcionario
