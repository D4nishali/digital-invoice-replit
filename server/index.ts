import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { dbStorage } from './db-storage';
import apiRoutes from './routes';

const app = express();
const PORT = parseInt(process.env.PORT || '5000');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRoutes);

// Setup Vite dev server in development
async function setupViteDevServer() {
  if (process.env.NODE_ENV === 'development') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });

    app.use(vite.ssrFixStacktrace);
    app.use(vite.middlewares);
  }
}

// Initialize database
async function initializeApp() {
  try {
    await dbStorage.init();
    console.log('✅ Database initialized successfully');
    
    // Setup Vite dev server
    await setupViteDevServer();
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`[express] serving on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to initialize application:', error);
    process.exit(1);
  }
}

initializeApp();