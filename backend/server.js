import express from 'express';
import cors from 'cors'
import epiRoutes from './routes/epiRoutes.js';
import funcionarioRoutes from './routes/funcionarioRoutes.js';

const app = express();
app.use(express.json());
app.use(cors())

// Rotas
app.use('/epis', epiRoutes);
app.use('/funcionarios', funcionarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
