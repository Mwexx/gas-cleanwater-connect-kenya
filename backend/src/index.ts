import app from './app';

const port = Number(process.env.PORT || 4000);

if (process.env.VERCEL !== '1') {
	app.listen(port, () => console.log(`✅ Backend running on port ${port}`));
}

export default app;