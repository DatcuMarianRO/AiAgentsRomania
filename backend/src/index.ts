import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from './utils/errorHandler';
import logger, { requestLogger, performanceLogger } from './utils/logger';
import apiRoutes from './routes';
import swaggerSpec from './config/swagger';
import { apiLimiter } from './middleware/rateLimit.middleware';
import redisClient from './utils/cache';
import supabase from './config/database';

// Load environment variables
dotenv.config();

// Verify required environment variables
const requiredEnvVars = [
  'JWT_SECRET',
  'SUPABASE_URL',
  'SUPABASE_KEY',
  'OPENROUTER_API_KEY'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingEnvVars.length > 0) {
  logger.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

// Create Express app
const app = express();

// Set security HTTP headers
app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
}));

// Configure CORS with options
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true, // Allow credentials (cookies)
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Refresh'],
  exposedHeaders: ['X-Access-Token']
}));

// Parse cookies
app.use(cookieParser());

// Request logging
app.use(requestLogger);

// Morgan pentru loguri compatibile cu formatul Apache combined log format
app.use(morgan('combined', {
  skip: (req, _) => req.path === '/health' || req.path === '/metrics',
  stream: {
    write: (message) => logger.http(message.trim()),
  },
}));

// Parse JSON request body
app.use(express.json({ limit: '10mb' }));

// Parse URL-encoded request body
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Apply rate limiting to all requests
app.use(apiLimiter);

// Health check endpoint
app.get('/health', async (_req, res) => {
  const isRedisConnected = redisClient.status === 'ready';
  
  // Check Supabase connection
  let isSupabaseConnected = false;
  let supabaseError = null;
  try {
    // Try a simple query to validate connection
    const { data, error } = await supabase.from('health_check').select('*').limit(1);
    if (error) {
      supabaseError = error.message;
      logger.error('Supabase health check failed', { error });
    } else {
      isSupabaseConnected = true;
    }
  } catch (error) {
    supabaseError = error instanceof Error ? error.message : 'Unknown error';
    logger.error('Supabase health check failed', { error: error instanceof Error ? error.message : 'Unknown error', stack: error instanceof Error ? error.stack : undefined });
  }
  
  // Basic health check response
  const allServicesConnected = isRedisConnected && isSupabaseConnected;
  
  res.json({
    status: allServicesConnected ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    services: {
      redis: {
        status: isRedisConnected ? 'connected' : 'disconnected'
      },
      supabase: {
        status: isSupabaseConnected ? 'connected' : 'disconnected',
        error: supabaseError
      }
    },
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

// API documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCssUrl: '/swagger-ui.css',
  swaggerOptions: {
    persistAuthorization: true,
  },
}));

// Serve swagger CSS
app.get('/swagger-ui.css', (_req, res) => {
  res.setHeader('Content-Type', 'text/css');
  res.send(`
    .swagger-ui .topbar { display: none }
    .swagger-ui .info { margin-top: 20px }
    .swagger-ui .scheme-container { background-color: transparent; box-shadow: none; }
    .swagger-ui .opblock .opblock-summary-description { text-align: right; }
  `);
});

// API routes
app.use('/api/v1', apiRoutes);

// Root endpoint
app.get('/', (_req, res) => {
  res.send(`
    <html>
      <head>
        <title>AI Agents Romania API</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; }
          h1 { color: #333; }
          a { color: #0070f3; text-decoration: none; }
          a:hover { text-decoration: underline; }
          .card { border: 1px solid #eaeaea; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
          code { background-color: #f1f1f1; padding: 0.2em 0.4em; border-radius: 3px; font-size: 85%; }
        </style>
      </head>
      <body>
        <h1>AI Agents Romania API</h1>
        <div class="card">
          <p>Welcome to the AI Agents Romania API. This is a RESTful API providing access to our AI agent marketplace.</p>
          <p>For full API documentation, visit <a href="/docs">/docs</a>.</p>
        </div>
        <div class="card">
          <p>For health status, visit <a href="/health">/health</a>.</p>
        </div>
      </body>
    </html>
  `);
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
});

// Error handling middleware
app.use(errorHandler);

// Handle unhandled promise rejections
process.on('unhandledRejection', (error: Error) => {
  logger.error('Unhandled promise rejection', { error });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught exception', { error });
  // For uncaught exceptions, we might want to exit the process
  process.exit(1);
});

// Start server
const PORT = process.env.PORT || 3001;
const FALLBACK_PORT = process.env.FALLBACK_PORT || 3101;

// Try to start on the primary port, if that fails, use the fallback port
const startServer = (port: number) => {
  return new Promise<number>((resolve, reject) => {
    const serverInstance = app.listen(port, () => {
      logger.info(`🚀 Backend live at http://localhost:${port}`);
      logger.info(`📚 API documentation available at http://localhost:${port}/docs`);
      resolve(port);
    });
    
    serverInstance.on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        logger.warn(`Port ${port} is already in use`);
        reject(err);
      } else {
        logger.error('Error starting server', { error: err });
        reject(err);
      }
    });
    
    return serverInstance;
  });
};

// Try to start on primary port, fallback if needed
let server: any;
startServer(Number(PORT))
  .catch(() => {
    logger.info(`Attempting to use fallback port ${FALLBACK_PORT}`);
    return startServer(Number(FALLBACK_PORT));
  })
  .then((activePort) => {
    // Export the active port for other modules to use
    app.set('port', activePort);
  })
  .catch((err) => {
    logger.error('Failed to start server on both primary and fallback ports', { error: err });
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    redisClient.quit().then(() => {
      logger.info('Redis connection closed');
      process.exit(0);
    });
  });
});
