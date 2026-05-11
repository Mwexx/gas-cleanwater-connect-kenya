import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { findNearby } from '../services/geolocation.service';
import { asyncHandler } from '../utils/asyncHandler';

export const getNearby = asyncHandler(async (req: Request, res: Response) => {
  const { lat, lon, radius, type } = req.query;
  const results = await findNearby(Number(lat), Number(lon), Number(radius) || 15, { type: type as string });
  res.json(results);
});

export const createBusiness = asyncHandler(async (req: Request, res: Response) => {
  const { name, type, phone, whatsapp, email, county, town, latitude, longitude, logoUrl } = req.body;
  const ownerId = (req as any).user.id;
  const business = await prisma.business.create({
    data: { ownerId, name, type, phone, whatsapp, email, county, town, latitude, longitude, logoUrl }
  });
  res.status(201).json(business);
});

export const addProduct = asyncHandler(async (req: Request, res: Response) => {
  const { businessId, name, category, priceKsh, stock, imageUrl } = req.body;
  const product = await prisma.product.create({ data: { businessId, name, category, priceKsh, stock, imageUrl } });
  res.status(201).json(product);
});