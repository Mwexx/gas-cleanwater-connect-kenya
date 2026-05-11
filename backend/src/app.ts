import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import businessRoutes from './routes/business.routes';
import paymentRoutes from './routes/payment.routes';
import adminRoutes from './routes/admin.routes';

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable('x-powered-by');
app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true,
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

app.get('/api/health', (_, res) => {
  res.json({ ok: true, service: 'gas-water-connect-api' });
});

app.use('/api/auth', authRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

export default app;