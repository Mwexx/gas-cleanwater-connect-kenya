import { Router } from 'express';
import { initiatePayment, mpesaCallback } from '../controllers/payment.controller';
const router = Router();
router.post('/initiate', initiatePayment);
router.post('/mpesa/callback', mpesaCallback);
export default router;