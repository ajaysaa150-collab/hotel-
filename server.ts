import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sendBookingEmailHandler from './api/send-booking-email.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = parseInt(process.env.PORT || '3000', 10);

  // Body parser for JSON
  app.use(express.json());

  // Mount booking email API route (same handler as Vercel serverless function)
  app.all('/api/send-booking-email', (req, res) => {
    return sendBookingEmailHandler(req, res);
  });

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'Regency Hotel Mumbai Booking API' });
  });

  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    // In development mode, mount Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production mode, serve built static files from dist
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`[Regency Hotel Server] Running at http://localhost:${port}`);
  });
}

startServer().catch((err) => {
  console.error('[Regency Hotel Server Error]', err);
  process.exit(1);
});
