
# Gas Water Connect Kenya

Monorepo layout:

- `web/` - Next.js app for Vercel
- `backend/` - Express API adapted for Vercel serverless functions
- `mobile/` - Expo app

## Vercel deployment

Deploy the web app and backend as separate Vercel projects:

1. Create a Vercel project for the `web` folder.
2. Create a second Vercel project for the `backend` folder.
3. Set backend environment variables in Vercel, especially `DATABASE_URL`, `REDIS_URL`, `JWT_SECRET`, `CORS_ORIGIN`, and payment/SMS keys.
4. Point `NEXT_PUBLIC_API_BASE_URL` and `EXPO_PUBLIC_API_BASE_URL` at the backend Vercel URL, for example `https://your-backend-api.vercel.app/api`.

## Notes

- The backend exposes a serverless catch-all handler at `backend/api/[...all].ts`.
- Local development still works with `npm run dev` inside each package.
