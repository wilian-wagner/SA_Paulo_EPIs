import express from 'express';
import { getEPIs, postEPI } from '../controllers/epiController.js';
const router = express.Router();

router.get('/', getEPIs);
router.post('/', postEPI);

export default router;
