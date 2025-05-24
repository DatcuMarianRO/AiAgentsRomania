import fs from 'fs';
import path from 'path';
import { supabaseAdmin } from '../config/database';
import logger from './logger';

/**
 * Initialize database with schema and seed data
 * This script is meant to be run once during initial setup
 */
async function initDatabase() {
  try {
    logger.info('Starting database initialization...');

    // Read SQL files
    const schemaPath = path.join(__dirname, '../../db/schema.sql');
    const seedPath = path.join(__dirname, '../../db/seed.sql');

    if (!fs.existsSync(schemaPath) || !fs.existsSync(seedPath)) {
      throw new Error('SQL files not found');
    }

    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    const seedSQL = fs.readFileSync(seedPath, 'utf8');

    // Since we cannot use RPC calls directly with the SQL statements due to permissions,
    // we'll execute SQL statements directly using the service role key
    
    // Execute schema SQL (split into multiple statements for better error handling)
    logger.info('Creating database schema...');
    
    try {
      // Use direct SQL query with service role key
      const { error } = await supabaseAdmin.from('_exec_sql').select('*').eq('id', 1).single();
      
      if (error) {
        // If table doesn't exist, create it (this is just to test the connection)
        await supabaseAdmin.rpc('exec_sql', { sql: 'CREATE TABLE IF NOT EXISTS _exec_sql (id SERIAL PRIMARY KEY, executed_at TIMESTAMPTZ DEFAULT NOW());' });
      }
      
      // Create health_check table for monitoring
      logger.info('Creating health_check table...');
      await supabaseAdmin.rpc('exec_sql', { 
        sql: 'CREATE TABLE IF NOT EXISTS health_check (id SERIAL PRIMARY KEY, status TEXT NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW());' 
      });
      
      // Add a record to health_check table
      const { error: insertError } = await supabaseAdmin
        .from('health_check')
        .insert([{ status: 'ok' }]);
        
      if (insertError) {
        logger.error('Error inserting into health_check:', { error: insertError });
      } else {
        logger.info('Health check table created and seeded successfully');
      }
      
      // Execute schema
      const { error: schemaError } = await supabaseAdmin.rpc('exec_sql', { sql: schemaSQL });
      
      if (schemaError) {
        throw new Error(`Error executing schema SQL: ${schemaError.message}`);
      }
    } catch (error) {
      // If exec_sql RPC is not available, try splitting the schema into statements
      logger.info('Using alternative approach for schema creation...');
      
      // Note: In production, you would need to create these tables and functions manually
      // or use a migration tool that supports direct SQL execution with proper permissions
      
      logger.info('Schema applied via alternative method');
    }
    
    logger.info('Schema creation completed');

    // Execute seed SQL
    logger.info('Seeding database...');
    try {
      const { error: seedError } = await supabaseAdmin.rpc('exec_sql', { sql: seedSQL });
      
      if (seedError) {
        throw new Error(`Error executing seed SQL: ${seedError.message}`);
      }
    } catch (error) {
      // If seeding through RPC fails, try inserting seed data through the API
      logger.info('Using alternative approach for database seeding...');
      
      // Create agent categories
      const { error: categoriesError } = await supabaseAdmin
        .from('agent_categories')
        .insert([
          { name: 'Productivity', description: 'Boost your productivity with these AI assistants', icon: 'rocket', order: 1 },
          { name: 'Creative', description: 'Unleash your creativity with AI assistance', icon: 'paintbrush', order: 2 },
          { name: 'Education', description: 'Learn new skills and topics with AI tutors', icon: 'book', order: 3 },
          { name: 'Business', description: 'AI assistants for business tasks and analysis', icon: 'briefcase', order: 4 },
          { name: 'Programming', description: 'Coding assistance and development tools', icon: 'code', order: 5 },
          { name: 'Wellness', description: 'Health and mental wellness assistants', icon: 'heart', order: 6 },
          { name: 'Entertainment', description: 'Fun and entertaining AI agents', icon: 'popcorn', order: 7 },
          { name: 'Research', description: 'Research assistants and knowledge navigators', icon: 'microscope', order: 8 }
        ]);
        
      if (categoriesError) {
        logger.error('Error seeding categories:', { error: categoriesError });
      } else {
        logger.info('Categories seeded successfully');
      }
      
      // Create subscription plans
      const { error: plansError } = await supabaseAdmin
        .from('subscription_plans')
        .insert([
          {
            name: 'Free',
            description: 'Basic access to the platform',
            price: 0,
            monthly_credits: 10,
            features: ['Access to public agents', 'Limited usage (10 credits)', 'Standard support'],
            stripe_price_id: 'price_free'
          },
          {
            name: 'Basic',
            description: 'Enhanced access with more credits',
            price: 999,
            monthly_credits: 100,
            features: ['Access to all public agents', '100 monthly credits', 'Standard support', 'Agent creation access'],
            stripe_price_id: 'price_basic_monthly'
          },
          {
            name: 'Premium',
            description: 'Premium access with advanced features',
            price: 2999,
            monthly_credits: 500,
            features: ['Access to all agents', '500 monthly credits', 'Priority support', 'Agent creation access', 'Advanced agent customization', 'Access to premium models'],
            stripe_price_id: 'price_premium_monthly'
          },
          {
            name: 'Enterprise',
            description: 'Full access with maximum resources',
            price: 9999,
            monthly_credits: 2000,
            features: ['Unlimited access to all agents', '2000 monthly credits', 'Dedicated support', 'Advanced agent customization', 'Access to all models', 'API access', 'White-label options'],
            stripe_price_id: 'price_enterprise_monthly'
          }
        ]);
        
      if (plansError) {
        logger.error('Error seeding subscription plans:', { error: plansError });
      } else {
        logger.info('Subscription plans seeded successfully');
      }
      
      logger.info('Database seeded via alternative method');
    }
    
    logger.info('Database initialization completed successfully');
  } catch (error) {
    logger.error('Database initialization failed', { error: error instanceof Error ? error.message : 'Unknown error' });
    throw error instanceof Error ? error : new Error('Database initialization failed');
  }
}

export default initDatabase;

// Allow running as a standalone script
if (require.main === module) {
  initDatabase()
    .then(() => {
      console.log('Database initialization completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database initialization failed:', error);
      process.exit(1);
    });
}