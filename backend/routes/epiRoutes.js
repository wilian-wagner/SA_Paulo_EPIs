import express from 'express';
import { deleteEPI, getEPIs, postEPI, putEPI } from '../controllers/epiController.js';
const router = express.Router();

router.get('/', getEPIs);
router.post('/', postEPI);
router.put('/:id', putEPI)
router.delete('/:id', deleteEPI)

export default router;