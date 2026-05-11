import { prisma } from '../config/db';
export const findNearby = async (lat: number, lon: number, radiusKm: number = 15, filters?: { type?: string }) => {
  const query = `
    SELECT b.id, b.name, b.type, b.phone, b.whatsapp, b.county, b.town, b.latitude, b.longitude, b.logo_url, b.is_open,
      6371 * acos(sin(${lat} * pi()/180) * sin(b.latitude * pi()/180) + cos(${lat} * pi()/180) * cos(b.latitude * pi()/180) * cos((${lon} - b.longitude) * pi()/180)) AS distance_km
    FROM "Business" b
    WHERE b.is_verified = true AND b.is_open = true
    ${filters?.type ? `AND b.type = '${filters.type}'` : ''}
    HAVING distance_km <= ${radiusKm}
    ORDER BY distance_km ASC LIMIT 50
  `;
  return await prisma.$queryRawUnsafe(query);
};