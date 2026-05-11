import { Router } from 'express';
import { register, loginOrVerify } from '../controllers/auth.controller';
const router = Router();
router.post('/register', register);
router.post('/login', loginOrVerify);
export default router;