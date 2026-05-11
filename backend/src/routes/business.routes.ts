import { Router } from 'express';
import { getNearby, createBusiness, addProduct } from '../controllers/business.controller';
import { authenticate } from '../middleware/auth.middleware';
const router = Router();
router.get('/nearby', getNearby);
router.post('/create', authenticate, createBusiness);
router.post('/products', authenticate, addProduct);
export default router;