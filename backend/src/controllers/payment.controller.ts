import { Request, Response } from 'express';
import { stkPush } from '../services/mpesa.service';
import { asyncHandler } from '../utils/asyncHandler';

export const initiatePayment = asyncHandler(async (req: Request, res: Response) => {
  const { phone, amount, ref } = req.body;
  const result = await stkPush(phone, amount, ref);
  res.json({ checkoutRequestId: result.data.CheckoutRequestID, message: 'Check phone for prompt' });
});

export const mpesaCallback = asyncHandler(async (req: Request, res: Response) => {
  const { Body } = req.body;
  if (Body.stkCallback.ResultCode === 0) {
    console.log('✅ Payment successful:', Body.stkCallback.CallbackMetadata);
    // Update order status to CONFIRMED here
  }
  res.json({ ResultCode: 0, ResultDesc: 'Accepted' });
});