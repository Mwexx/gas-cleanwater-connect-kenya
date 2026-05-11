import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { asyncHandler } from '../utils/asyncHandler';

export const getPendingBusinesses = asyncHandler(async (_req: Request, res: Response) => {
  const pending = await prisma.business.findMany({ where: { isVerified: false } });
  res.json(pending);
});

export const verifyBusiness = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.business.update({ where: { id }, data: { isVerified: true } });
  res.json({ message: 'Verified' });
});