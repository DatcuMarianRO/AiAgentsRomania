import express from 'express';
import next from 'next';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import winston from 'winston';

// Load environment variables
dotenv.config();

// Configure logger for unified server
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.simple()
  ),
  defaultMeta: { service: 'unified-server' },
  transports: [
    new winston.transports.Console()
  ]
});

// Configuration
const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 4000;
const fallbackPort = process.env.FALLBACK_PORT || 4100;
const backendApiUrl = process.env.BACKEND_API_URL || 'http://localhost:3001/api/v1';
const backendHealthUrl = process.env.BACKEND_HEALTH_URL || 'http://localhost:3001/health';

// Initialize Next.js
const nextApp = next({ 
  dev, 
  dir: path.join(__dirname, '..'),
  conf: {
    // Override Next.js config if needed
    env: {
      NEXT_PUBLIC_API_URL: '/api/v1',
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || `http://localhost:${port}`,
    }
  }
});

const handle = nextApp.getRequestHandler();

async function startUnifiedServer() {
  try {
    // Prepare Next.js
    await nextApp.prepare();
    logger.info('Next.js prepared for unified server');

    // Create Express app
    const app = express();

    // Security headers
    app.use(helmet({
      contentSecurityPolicy: dev ? false : undefined,
      crossOriginEmbedderPolicy: false,
    }));

    // CORS configuration
    app.use(cors({
      origin: process.env.NEXT_PUBLIC_SITE_URL || `http://localhost:${port}`,
      credentials: true,
    }));

    // Request logging
    app.use(morgan('combined', {
      stream: {
        write: (message: string) => logger.info(message.trim()),
      },
    }));

    // Parse JSON bodies
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true }));

    // Health check for unified server
    app.get('/health', (req, res) => {
      res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        server: 'unified',
        port: req.get('host')?.split(':')[1] || port,
        environment: process.env.NODE_ENV || 'development',
        uptime: process.uptime()
      });
    });

    // Proxy API calls to backend
    app.use('/api/v1', createProxyMiddleware({
      target: backendApiUrl.replace('/api/v1', ''),
      changeOrigin: true,
      pathRewrite: {
        '^/api/v1': '/api/v1',
      },
      on: {
        error: (err: any, req: any, res: any) => {
          logger.error('Proxy error:', err);
          if (!res.headersSent) {
            res.status(502).json({
              status: 'error',
              message: 'Backend service unavailable'
            });
          }
        },
        proxyReq: (proxyReq: any, req: any, res: any) => {
          logger.debug(`Proxying ${req.method} ${req.url} to backend`);
        }
      }
    }));

    // Proxy backend health check
    app.use('/backend-health', createProxyMiddleware({
      target: backendHealthUrl.replace('/health', ''),
      changeOrigin: true,
      pathRewrite: {
        '^/backend-health': '/health',
      }
    }));

    // Handle Next.js routes
    app.get('/', (req, res) => {
      return handle(req, res);
    });
    
    // Handle all other routes with Next.js
    app.get('*', (req, res) => {
      // Skip API routes (they're handled by proxies above)
      if (req.path.startsWith('/api/') || req.path.startsWith('/backend-health')) {
        return res.status(404).json({ error: 'API endpoint not found' });
      }
      return handle(req, res);
    });

    // Start server with fallback logic
    const startServer = (serverPort: number): Promise<number> => {
      return new Promise((resolve, reject) => {
        const server = app.listen(serverPort, (err?: any) => {
          if (err) {
            reject(err);
          } else {
            logger.info(`🚀 Unified server running at http://localhost:${serverPort}`);
            logger.info(`📱 Frontend accessible at http://localhost:${serverPort}`);
            logger.info(`🔌 API accessible at http://localhost:${serverPort}/api/v1`);
            logger.info(`💚 Health check at http://localhost:${serverPort}/health`);
            resolve(serverPort);
          }
        });

        server.on('error', (err: any) => {
          if (err.code === 'EADDRINUSE') {
            logger.warn(`Port ${serverPort} is already in use`);
            reject(err);
          } else {
            logger.error('Server error:', err);
            reject(err);
          }
        });
      });
    };

    // Try primary port, fallback if needed
    try {
      await startServer(Number(port));
    } catch (error) {
      logger.info(`Attempting to use fallback port ${fallbackPort}`);
      try {
        await startServer(Number(fallbackPort));
      } catch (fallbackError) {
        logger.error('Failed to start unified server on both primary and fallback ports');
        process.exit(1);
      }
    }

  } catch (error) {
    logger.error('Failed to start unified server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down unified server gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down unified server gracefully');
  process.exit(0);
});

// Start the unified server
startUnifiedServer();