#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Configurații pentru fiecare modul
const configurations = {
  backend: {
    path: 'backend/.env',
    template: 'backend/.env.example',
    description: 'Backend API Server (Port 3001)'
  },
  frontend: {
    path: 'frontend/.env.local',
    template: 'frontend/.env.example',
    description: 'Frontend Development Server (Port 3000)'
  },
  unified: {
    path: 'unified/.env',
    template: 'unified/.env.example',
    description: 'Unified Server - Frontend + Backend (Port 4000)'
  }
};

// Variabile comune care vor fi cerute utilizatorului
const commonVariables = {
  SUPABASE_URL: 'Supabase URL (ex: https://xxx.supabase.co)',
  SUPABASE_KEY: 'Supabase Anon Key',
  SUPABASE_SERVICE_KEY: 'Supabase Service Key (optional)',
  JWT_SECRET: 'JWT Secret (minim 32 caractere)',
  OPENROUTER_API_KEY: 'OpenRouter API Key',
  STRIPE_SECRET_KEY: 'Stripe Secret Key (optional)',
  STRIPE_WEBHOOK_SECRET: 'Stripe Webhook Secret (optional)',
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: 'Stripe Publishable Key (optional)',
  REDIS_URL: 'Redis URL (default: redis://localhost:6379)',
  DATABASE_URL: 'PostgreSQL Connection String'
};

async function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function collectUserInput() {
  console.log('🚀 Setup AI Agents Romania - Environment Configuration\n');
  console.log('Acest script va genera fișierele .env pentru toate modurile de operare.\n');
  
  const values = {};
  
  for (const [key, description] of Object.entries(commonVariables)) {
    let defaultValue = '';
    
    // Setează valori default pentru unele variabile
    switch (key) {
      case 'REDIS_URL':
        defaultValue = 'redis://localhost:6379';
        break;
      case 'JWT_SECRET':
        defaultValue = generateRandomString(32);
        break;
    }
    
    const prompt = defaultValue 
      ? `${description} [${defaultValue}]: `
      : `${description}: `;
      
    const answer = await askQuestion(prompt);
    values[key] = answer || defaultValue;
  }
  
  return values;
}

function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function readTemplate(templatePath) {
  try {
    return fs.readFileSync(templatePath, 'utf8');
  } catch (error) {
    console.error(`❌ Nu s-a putut citi template-ul: ${templatePath}`);
    return null;
  }
}

function replaceVariables(content, values) {
  let result = content;
  
  // Înlocuiește variabilele placeholder cu valorile reale
  Object.entries(values).forEach(([key, value]) => {
    const patterns = [
      new RegExp(`${key}=your_.*_here`, 'g'),
      new RegExp(`${key}=\\[YOUR-.*\\]`, 'g'),
      new RegExp(`${key}=.*_key_here`, 'g'),
      new RegExp(`${key}=.*_secret_here`, 'g'),
      new RegExp(`${key}=.*_url_here`, 'g')
    ];
    
    patterns.forEach(pattern => {
      result = result.replace(pattern, `${key}=${value}`);
    });
  });
  
  return result;
}

function createEnvFile(config, values) {
  const templateContent = readTemplate(config.template);
  if (!templateContent) {
    return false;
  }
  
  const processedContent = replaceVariables(templateContent, values);
  
  try {
    // Creează directorul dacă nu există
    const dir = path.dirname(config.path);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(config.path, processedContent);
    console.log(`✅ ${config.description}: ${config.path}`);
    return true;
  } catch (error) {
    console.error(`❌ Eroare la crearea ${config.path}:`, error.message);
    return false;
  }
}

async function main() {
  try {
    // Colectează input de la utilizator
    const values = await collectUserInput();
    
    console.log('\n📝 Generez fișierele .env...\n');
    
    // Creează fișierele .env pentru fiecare configurație
    let successCount = 0;
    for (const [name, config] of Object.entries(configurations)) {
      if (createEnvFile(config, values)) {
        successCount++;
      }
    }
    
    console.log(`\n🎉 Generat cu succes ${successCount}/${Object.keys(configurations).length} fișiere .env\n`);
    
    // Afișează instrucțiuni de utilizare
    console.log('📋 Instrucțiuni de utilizare:');
    console.log('');
    console.log('1. Frontend separat (port 3000):');
    console.log('   npm run dev:frontend');
    console.log('   URL: http://localhost:3000');
    console.log('');
    console.log('2. Backend separat (port 3001):');
    console.log('   npm run dev:backend');
    console.log('   URL: http://localhost:3001');
    console.log('');
    console.log('3. Server unificat (port 4000):');
    console.log('   npm run dev:unified');
    console.log('   URL: http://localhost:4000');
    console.log('');
    console.log('4. Rulare în paralel (frontend + backend):');
    console.log('   npm run dev');
    console.log('   URLs: http://localhost:3000 + http://localhost:3001');
    console.log('');
    
  } catch (error) {
    console.error('❌ Eroare la configurarea mediului:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  main();
}