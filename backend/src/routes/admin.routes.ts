import { Router } from 'express';
import { getPendingBusinesses, verifyBusiness } from '../controllers/admin.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
const router = Router();
router.get('/pending', authenticate, authorize('ADMIN'), getPendingBusinesses);
router.patch('/verify/:id', authenticate, authorize('ADMIN'), verifyBusiness);
export default router;