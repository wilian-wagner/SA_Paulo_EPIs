import express from 'express';
import { getFuncionarios, postFuncionario } from '../controllers/funcionarioController.js';

const router = express.Router();

router.get('/', getFuncionarios);
router.post('/', postFuncionario);

export default router;
