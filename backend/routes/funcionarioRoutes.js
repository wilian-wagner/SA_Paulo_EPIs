import express from 'express';
import { getFuncionarios, postFuncionario, putFuncionario, deleteFuncionario } from '../controllers/funcionarioController.js';

const router = express.Router();

router.get('/', getFuncionarios);
router.post('/', postFuncionario);
router.put('/:id', putFuncionario)
router.delete('/:id', deleteFuncionario)


export default router;
