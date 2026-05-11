import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { prisma } from '../config/db';
import { redis } from '../config/redis';
import { sendSMS } from '../services/sms.service';
import { asyncHandler } from '../utils/asyncHandler';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { phone, email, password, role } = req.body;
  const existing = await prisma.user.findFirst({ where: { OR: [{ phone }, { email }] } });
  if (existing) return res.status(400).json({ error: 'Account exists' });
  const hash = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { phone, email, passwordHash: hash, role } });
  res.status(201).json({ message: 'Registered. Verify OTP.' });
});

export const loginOrVerify = asyncHandler(async (req: Request, res: Response) => {
  const { identifier, password, otp } = req.body;
  const user = await prisma.user.findFirst({ where: { OR: [{ phone: identifier }, { email: identifier }] } });
  if (!user) return res.status(404).json({ error: 'User not found' });

  if (otp) {
    const stored = await redis.get(`otp:${user.phone}`);
    if (stored !== otp) return res.status(400).json({ error: 'Invalid OTP' });
    await prisma.user.update({ where: { id: user.id }, data: { isVerified: true } });
    await redis.del(`otp:${user.phone}`);
  } else {
    if (!await bcrypt.compare(password, user.passwordHash)) return res.status(401).json({ error: 'Invalid password' });
    if (!user.isVerified) {
      const code = crypto.randomInt(100000, 999999).toString();
      await redis.set(`otp:${user.phone}`, code, 'EX', 300);
      await sendSMS(user.phone, `Your GWC Kenya OTP: ${code}`);
      return res.json({ requiresOtp: true, message: 'OTP sent' });
    }
  }
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, role: user.role, phone: user.phone } });
});