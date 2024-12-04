import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../SASS/funcionarioStyle.scss';

function Funcionario() {
    const [funcionario, setFuncionario] = useState({
        nome: '',
        cargo: '',
        setor: '',
        email: ''
    });
    const [listaFuncionarios, setListaFuncionarios] = useState([]);
    const [erro, setErro] = useState(''); 

    const [filtroNome, setFiltroNome] = useState('');
    const [filtroCargo, setFiltroCargo] = useState('');
    const [filtroSetor, setFiltroSetor] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        carregarFuncionario();
    }, []);

    const handleChange = (e) => {
        setFuncionario({ ...funcionario, [e.target.name]: e.target.value });
    };

    const cadastrar = async (e) => {
        e.preventDefault();
        const nomeExistente = listaFuncionarios.some(funcionarioExistente =>
            funcionarioExistente.nome.toLowerCase() === funcionario.nome.toLowerCase()
        );

        if (nomeExistente) {
            setErro('Nome do Funcionário já cadastrado.');
            return alert('Funcionário já cadastrado!');
        }
        setErro('');
        try {
            const response = await axios.post('https://sa-paulo-epis.onrender.com/funcionarios', funcionario);
            console.log(response.data);
            setFuncionario({ nome: '', cargo: '', setor: '', email: '' });
            carregarFuncionario(); 
        } catch (error) {
            console.error("Erro ao cadastrar funcionário:", error);
        }
    };

    const carregarFuncionario = async () => {
        try {
            const response = await axios.get('https://sa-paulo-epis.onrender.com/funcionarios');
            setListaFuncionarios(response.data);
        } catch (error) {
            console.error("Erro ao carregar funcionários:", error);
        }
    };

    const deletarFuncionario = async (id) => {
        try {
            await axios.delete(`https://sa-paulo-epis.onrender.com/funcionarios/${id}`);
            setListaFuncionarios(listaFuncionarios.filter(func => func.id !== id));
            console.log("Funcionário deletado com sucesso");
        } catch (error) {
            console.error("Erro ao deletar funcionário:", error);
        }
    };

    const funcionariosFiltrados = listaFuncionarios.filter(func =>
        func.nome.toLowerCase().includes(filtroNome.toLowerCase()) &&
        func.cargo.toLowerCase().includes(filtroCargo.toLowerCase()) &&
        func.setor.toLowerCase().includes(filtroSetor.toLowerCase())
    );

    return (
        <div className='funcionario-page container'>
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

            <main className="funcionario-main-content">
                <section className="intro">
                    <h2>Cadastro de Funcionário</h2>
                    <form onSubmit={cadastrar}>
                        <input id='nome' type="text" name="nome" onChange={handleChange} value={funcionario.nome} placeholder="Nome" />
                        <input id='cargo' type="text" name="cargo" onChange={handleChange} value={funcionario.cargo} placeholder="Cargo" />
                        <input id='setor' type="text" name="setor" onChange={handleChange} value={funcionario.setor} placeholder="Setor" />
                        <input id='email' type="email" name="email" onChange={handleChange} value={funcionario.email} placeholder="Email" />
                        <button type="submit" className="btn-cadastrar">Cadastrar</button>
                    </form>
                </section>
                
                <section className="lista-funcionarios">
                    <h2>Funcionários Cadastrados</h2>
                    <div className="filtro-funcionarios">
                        <input
                            type="text"
                            placeholder="Buscar por nome"
                            value={filtroNome}
                            onChange={(e) => setFiltroNome(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Filtrar por cargo"
                            value={filtroCargo}
                            onChange={(e) => setFiltroCargo(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Filtrar por setor"
                            value={filtroSetor}
                            onChange={(e) => setFiltroSetor(e.target.value)}
                        />
                    </div>
                    <div className="funcionarios-cards">
                        {funcionariosFiltrados.map((func, index) => (
                            <div key={index} className="funcionario-card">
                                <h3>{func.nome}</h3>
                                <p><strong>Cargo: </strong>{func.cargo}</p>
                                <p><strong>Setor: </strong>{func.setor}</p>
                                <p><strong>Email: </strong>{func.email}</p>
                                <button className="btn-editar"
                                    onClick={() => navigate(`/funcionarios/editar/${func.id}`)}>
                                    Editar
                                </button>
                                <button className="btn-deletar"
                                    onClick={() => deletarFuncionario(func.id)}>
                                    Deletar
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Funcionario;