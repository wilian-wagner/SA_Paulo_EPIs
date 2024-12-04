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
    const [listaFuncionarios, setListaFuncionarios] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalInput, setModalInput] = useState('');
    const [modalCallback, setModalCallback] = useState(null);

    const [filtroNome, setFiltroNome] = useState('');
    const [filtroStatus, setFiltroStatus] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        carregarEPIs();
        carregarFuncionarios();
    }, []);

    const handleChange = (e) => {
        setEpi({ ...epi, [e.target.name]: e.target.value });
    };

    const carregarFuncionarios = async () => {
        try {
            const response = await axios.get('https://sa-paulo-epis.onrender.com/funcionarios');
            setListaFuncionarios(response.data);
        } catch (error) {
            console.error("Erro ao carregar funcionários:", error);
        }
    };

    const carregarEPIs = async () => {
        try {
            const response = await axios.get('https://sa-paulo-epis.onrender.com/epis');
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
            return alert('EPI já cadastrado!');
        }

        try {
            const response = await axios.post('https://sa-paulo-epis.onrender.com/epis', epi);
            setEpi({ nome: '', quantidade: 0, status: '' });
            carregarEPIs();
        } catch (error) {
            console.error("Erro ao cadastrar EPI:", error);
        }
    };

    const deletarEPI = async (id) => {
        try {
            await axios.delete(`https://sa-paulo-epis.onrender.com/epis/${id}`);
            setListaEPIs(listaEPIs.filter(epi => epi.id !== id));
        } catch (error) {
            console.error("Erro ao deletar EPI:", error);
        }
    };

    const openModal = (callback) => {
        setModalCallback(() => callback);
        setModalVisible(true);
    };

    const handleModalConfirm = () => {
        if (modalCallback) {
            modalCallback(modalInput);
        }
        setModalVisible(false);
        setModalInput('');
    };

    const retirarEPI = async (epi_id, quantidadeAtual) => {
        if (quantidadeAtual > 0) {
            openModal(async (nomeFuncionario) => {
                if (!nomeFuncionario) {
                    alert('Selecione um funcionário.');
                    return;
                }
                try {
                    await axios.post(
                        `https://sa-paulo-epis.onrender.com/epis/retirar/${epi_id}?nomeFuncionario=${encodeURIComponent(nomeFuncionario)}`
                    );
                    alert('Retirado com sucesso');
                    carregarEPIs();
                } catch (error) {
                    console.error("Erro ao registrar movimentação:", error);
                }
            });
        } else {
            alert("Estoque insuficiente para retirada.");
        }
    };

    const devolverEPI = async (epi_id) => {
        openModal(async (nomeFuncionario) => {
            try {
                await axios.post(
                    `https://sa-paulo-epis.onrender.com/epis/devolver/${epi_id}?nomeFuncionario=${encodeURIComponent(nomeFuncionario)}`
                );
                alert("Devolvido com sucesso");
                carregarEPIs();
            } catch (error) {
                console.error("Erro ao registrar movimentação:", error);
            }
        });
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
                    <Link to="/Epi" className="nav-link">Equipamento</Link>
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
                        {episFiltrados.map((epi) => (
                            <div key={epi.id} className="epi-card">
                                <h3>{epi.nome}</h3>
                                <p>Estoque: {epi.quantidade}</p>
                                <p>Status: {epi.status}</p>
                                <button className="btn-editar" onClick={() => navigate(`/Epi/editar/${epi.id}`)}>Editar</button>
                                <button className="btn-deletar" onClick={() => deletarEPI(epi.id)}>Deletar</button>
                                <div>
                                    <button className="btn-retirar" onClick={() => retirarEPI(epi.id, epi.quantidade)}>Retirar</button>
                                    <button className="btn-devolver" onClick={() => devolverEPI(epi.id)}>Devolver</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {modalVisible && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <h3>Selecione o funcionário</h3>
                        <select
                            value={modalInput}
                            onChange={(e) => setModalInput(e.target.value)}
                        >
                            <option value="">Selecione</option>
                            {listaFuncionarios.map((funcionario) => (
                                <option key={funcionario.id} value={funcionario.nome}>
                                    {funcionario.nome}
                                </option>
                            ))}
                        </select>
                        <div className="modal-buttons">
                            <button className='btn-confirmar' onClick={handleModalConfirm}>Confirmar</button>
                            <button className='btn-cancelar' onClick={() => setModalVisible(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Epi;
