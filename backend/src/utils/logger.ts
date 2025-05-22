import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';
import fs from 'fs';

// Asigură-te că directorul de loguri există
const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Crează un format personalizat pentru loguri
const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss.SSS',
  }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.printf(({ level, message, timestamp, requestId, userId, ...meta }) => {
    // Format standard pentru loguri
    let log = `${timestamp} [${level.toUpperCase()}]`;
    
    // Adaugă ID-ul cererii dacă este disponibil
    if (requestId) {
      log += ` [${requestId}]`;
    }
    
    // Adaugă ID-ul utilizatorului dacă este disponibil
    if (userId) {
      log += ` [User: ${userId}]`;
    }
    
    // Adaugă mesajul
    log += `: ${message}`;
    
    // Adaugă metadate suplimentare
    if (Object.keys(meta).length > 0) {
      const metaString = JSON.stringify(meta);
      if (metaString !== '{}') {
        log += ` ${metaString}`;
      }
    }
    
    return log;
  })
);

// Format JSON pentru logurile care merg în fișiere
const jsonLogFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss.SSS',
  }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Configurare pentru rotarea zilnică a fișierelor
const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
  filename: path.join(logDir, 'application-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '14d',
  format: jsonLogFormat,
});

// Configurare pentru loguri de eroare
const errorFileTransport = new winston.transports.DailyRotateFile({
  filename: path.join(logDir, 'error-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  level: 'error',
  maxSize: '20m',
  maxFiles: '30d',
  format: jsonLogFormat,
});

// Determină nivelul de log implicit bazat pe mediul de execuție
const defaultLevel = process.env.LOG_LEVEL || 
                    (process.env.NODE_ENV === 'production' ? 'info' : 'debug');

// Crează instanța logger-ului
const logger = winston.createLogger({
  level: defaultLevel,
  defaultMeta: { 
    service: 'ai-agents-romania-backend',
    environment: process.env.NODE_ENV || 'development',
  },
  transports: [
    // Scrie logurile în consolă cu un format ușor de citit
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        logFormat
      ),
    }),
    // Rotare zilnică pentru toate logurile
    dailyRotateFileTransport,
    // Rotare zilnică pentru logurile de eroare
    errorFileTransport,
  ],
  // Gestionează excepțiile și respingerile negestionate
  exceptionHandlers: [
    new winston.transports.DailyRotateFile({
      filename: path.join(logDir, 'exceptions-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxFiles: '30d',
      format: jsonLogFormat,
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        logFormat
      ),
    }),
  ],
  rejectionHandlers: [
    new winston.transports.DailyRotateFile({
      filename: path.join(logDir, 'rejections-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxFiles: '30d',
      format: jsonLogFormat,
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        logFormat
      ),
    }),
  ],
  exitOnError: false,
});

// Funcții helper pentru a facilita logarea cu contexte consistente
export const createLoggerWithContext = (context: Record<string, any>) => {
  return {
    error: (message: string, meta = {}) => logger.error(message, { ...context, ...meta }),
    warn: (message: string, meta = {}) => logger.warn(message, { ...context, ...meta }),
    info: (message: string, meta = {}) => logger.info(message, { ...context, ...meta }),
    http: (message: string, meta = {}) => logger.http(message, { ...context, ...meta }),
    verbose: (message: string, meta = {}) => logger.verbose(message, { ...context, ...meta }),
    debug: (message: string, meta = {}) => logger.debug(message, { ...context, ...meta }),
    silly: (message: string, meta = {}) => logger.silly(message, { ...context, ...meta }),
  };
};

// Middleware pentru Express care adaugă ID-ul de cerere în contextul de log
export const requestLogger = (req: any, res: any, next: any) => {
  const requestId = req.headers['x-request-id'] || `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  req.requestId = requestId;
  
  // Adaugă requestId în res.locals pentru a-l putea folosi în alte middleware-uri
  res.locals.requestId = requestId;
  
  // Crează un logger specific acestei cereri
  req.logger = createLoggerWithContext({ requestId });
  
  // Loghează cererea HTTP
  req.logger.http(`${req.method} ${req.originalUrl}`, {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });
  
  // Interceptează evenimentul de finalizare a cererii pentru a loga răspunsul
  res.on('finish', () => {
    const responseTime = Date.now() - (req._startTime || Date.now());
    req.logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`, {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      responseTime,
    });
  });
  
  next();
};

// Middleware pentru a adăuga logarea trace-urilor de performanță
export const performanceLogger = (name: string) => {
  return (req: any, res: any, next: any) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      req.logger?.debug(`Performance: ${name}`, { duration });
    });
    next();
  };
};

export default logger;