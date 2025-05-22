import postgres from 'postgres';
import dotenv from 'dotenv';
import logger from '../utils/logger';

dotenv.config();

// Validare string de conexiune
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL nu este definit în fișierul .env');
}

// Opțiuni pentru postgres
const options = {
  onnotice: (notice: any) => {
    logger.debug('Postgres notice:', notice);
  },
  onparameter: (parameterStatus: any) => {
    logger.debug('Postgres parameter status:', parameterStatus);
  },
  debug: process.env.NODE_ENV === 'development',
  ssl: process.env.POSTGRES_SSL === 'true',
  max: 10, // Numărul maxim de conexiuni
  idle_timeout: 30, // Timeout pentru conexiuni inactive (secunde)
  connect_timeout: 30, // Timeout pentru conexiune (secunde)
};

// Inițializare client SQL
logger.info(`Inițializare conexiune PostgreSQL în mediul ${process.env.NODE_ENV}`);
const sql = postgres(connectionString, options);

export default sql;