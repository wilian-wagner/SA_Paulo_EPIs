import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../SASS/epiStyle.scss';

function Epi() {
    const [epi, setEpi] = useState({
        nome: '',
        quantidade: 0,
        status: ''
    });
    const [listaEPIs, setListaEPIs] = useState([]);
    const [erro, setErro] = useState(''); 

    const [filtroNome, setFiltroNome] = useState('');
    const [filtroStatus, setFiltroStatus] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        carregarEPIs();
    }, []);

    const handleChange = (e) => {
        setEpi({ ...epi, [e.target.name]: e.target.value });
    };

    const carregarEPIs = async () => {
        try {
            const response = await axios.get('http://localhost:3000/epis');
            setListaEPIs(response.data);
        } catch (error) {
            console.error("Erro ao carregar EPIs:", error);
        }
    };

    const cadastrarEPI = async (e) => {
        e.preventDefault();
        const nomeExistente = listaEPIs.some(epiExistente =>
            epiExistente.nome.toLowerCase() === epi.nome.toLowerCase()
        );

        if (nomeExistente) {
            setErro('Nome do EPI já cadastrado.');
            return alert('EPI já cadastrado!');
        }
        setErro('');

        try {
            const response = await axios.post('http://localhost:3000/epis', epi);
            console.log(response.data);
            setEpi({ nome: '', quantidade: 0, status: '' });
            carregarEPIs();
        } catch (error) {
            console.error("Erro ao cadastrar EPI:", error);
        }
    };

    const deletarEPI = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/epis/${id}`);
            setListaEPIs(listaEPIs.filter(epi => epi.id !== id));
            console.log("EPI deletado com sucesso");
        } catch (error) {
            console.error("Erro ao deletar EPI:", error);
        }
    };

    const episFiltrados = listaEPIs.filter(epi =>
        epi.nome.toLowerCase().includes(filtroNome.toLowerCase()) &&
        epi.status.toLowerCase().startsWith(filtroStatus.toLowerCase())
    );

    return (
        <div className='epi-page container'>
            <header className="header">
                <div className="header-logo">
                    <img src="./src/assets/logo.png" alt="Logo" className="logo" />
                    <h1>Master EPIs Manager</h1>
                </div>
                <nav className="header-nav">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/Funcionarios" className="nav-link">Funcionários</Link>
                    <Link to="/Historico" className="nav-link">Histórico</Link>
                </nav>
            </header>

            <main className="epi-main-content">
                <section className="intro-epi">
                    <h2>Cadastro de EPIs</h2>
                    <form onSubmit={cadastrarEPI}>
                        <input
                            type="text"
                            name="nome"
                            onChange={handleChange}
                            value={epi.nome}
                            placeholder="Nome do equipamento"
                        />
                        <input
                            type="number"
                            name="quantidade"
                            onChange={handleChange}
                            value={epi.quantidade}
                            placeholder="Quantidade"
                        />
                        <button type="submit" className="btn-cadastrar">Cadastrar</button>
                    </form>
                </section>

                <section className="lista-epis">
                    <h2>EPIs Cadastrados</h2>
                    <div className="filtro-epis">
                        <input
                            type="text"
                            placeholder="Buscar por nome"
                            value={filtroNome}
                            onChange={(e) => setFiltroNome(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Filtrar por status"
                            value={filtroStatus}
                            onChange={(e) => setFiltroStatus(e.target.value)}
                        />
                    </div>
                    <div className="epis-cards">
                        {episFiltrados.map((epi, index) => (
                            <div key={index} className="epi-card">
                                <h3>{epi.nome}</h3>
                                <p>Estoque: {epi.quantidade}</p>
                                <p>Status: {epi.status}</p>
                                <button className="btn-editar"
                                    onClick={() => navigate(`/Epi/editar/${epi.id}`)}>
                                    Editar
                                </button>
                                <button className="btn-deletar"
                                    onClick={() => deletarEPI(epi.id)}>
                                    Deletar
                                </button>
                                <div>
                                    <button className="btn-retirar">Retirar</button>
                                    <button className="btn-devolver">Devolver</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Epi;
