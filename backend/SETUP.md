# 🚀 AI Agents Romania - Backend Setup Guide

Ghid complet pentru configurarea și pornirea backend-ului local fără erori.

## 📋 Checklist Rapid

### ✅ Pre-requisites
- [ ] Node.js >= 16.x instalat
- [ ] npm instalat
- [ ] Git instalat
- [ ] Acces la internet pentru API-uri externe

### ✅ Servicii Externe
- [ ] Contul Supabase configurat
- [ ] Redis server pornit local
- [ ] OpenRouter API key valid
- [ ] Stripe keys (dacă folosești payments)

### ✅ Configurare Environment
- [ ] Fișierul `.env` completat cu valori reale
- [ ] DATABASE_URL configurat corect
- [ ] JWT_SECRET generat
- [ ] API keys adăugate

## 🔧 Setup Automat (Recomandat)

### Opțiunea 1: Setup Complet Automat
```bash
# Din directorul backend/
./setup-dev.sh
```

Acest script va:
- Instala Redis automat
- Porni serviciile necesare
- Instala dependințele npm
- Valida configurația

### Opțiunea 2: Setup Manual

#### 1. Instalează Redis

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install redis-server
sudo systemctl start redis
sudo systemctl enable redis
```

**macOS (cu Homebrew):**
```bash
brew install redis
brew services start redis
```

**Windows:**
- Descarcă Redis de la: https://github.com/microsoftarchive/redis/releases
- Sau folosește WSL cu Ubuntu

#### 2. Verifică Redis
```bash
redis-cli ping
# Răspunsul ar trebui să fie: PONG
```

#### 3. Instalează dependințele Node.js
```bash
npm install
```

## ⚙️ Configurare Environment Variables

### 1. Copiază și editează .env
```bash
cp .env.example .env
```

### 2. Completează valorile în .env

```env
# Server Configuration
PORT=3001
NODE_ENV=development
FALLBACK_PORT=3101

# JWT Configuration (CRITICĂ)
JWT_SECRET=your_strong_jwt_secret_minimum_32_characters_here
JWT_EXPIRY=7d

# Supabase Configuration (CRITICĂ)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_role_key_here

# Postgres Configuration (CRITICĂ)
DATABASE_URL=postgresql://postgres:your_password@db.your-project.supabase.co:5432/postgres
POSTGRES_SSL=true

# Redis Configuration
REDIS_URL=redis://localhost:6379

# Logging
LOG_LEVEL=debug

# OpenRouter API (pentru AI features)
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_API_URL=https://openrouter.ai/api/v1

# Stripe (pentru payments)
STRIPE_SECRET_KEY=sk_test_your_stripe_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# CORS
FRONTEND_URL=http://localhost:3000
```

### 3. Obține credentialele Supabase

1. Mergi la [Supabase Dashboard](https://supabase.com/dashboard)
2. Selectează proiectul tău
3. Din Settings > API:
   - `SUPABASE_URL` = URL
   - `SUPABASE_KEY` = anon public key
   - `SUPABASE_SERVICE_KEY` = service_role key
4. Din Settings > Database:
   - `DATABASE_URL` = Connection string (înlocuiește `[YOUR-PASSWORD]` cu parola ta)

### 4. Generează JWT Secret
```bash
# Generează o cheie sigură de 64 caractere
openssl rand -hex 32
```

## 🚀 Pornire Rapidă

### 1. Verifică totul înainte de start
```bash
./scripts/check-dependencies.sh
```

### 2. Pornește serviciile
```bash
./scripts/start-services.sh
```

### 3. Pornește backend-ul
```bash
npm run dev
```

Server-ul va rula pe: `http://localhost:3001`

## 🔍 Troubleshooting

### Redis nu se conectează
```bash
# Verifică dacă Redis rulează
redis-cli ping

# Pornește Redis manual
redis-server --daemonize yes

# Sau prin systemctl (Linux)
sudo systemctl start redis
```

### Database connection failed
1. Verifică DATABASE_URL în .env
2. Testează conexiunea:
```bash
# Înlocuiește cu URL-ul tău real
psql "postgresql://postgres:password@db.project.supabase.co:5432/postgres"
```

### Port 3001 ocupat
- Backend-ul va încerca automat portul 3101
- Sau schimbă `PORT` în .env

### JWT errors
- Asigură-te că JWT_SECRET are minimum 32 caractere
- Nu folosii valori placeholder-e

## 📝 Scripts Utile

```bash
# Verifică toate dependințele
./scripts/check-dependencies.sh

# Start servicii externe
./scripts/start-services.sh

# Development server
npm run dev

# Build pentru producție
npm run build

# Rulează testele
npm test

# Verifică tipurile TypeScript
npm run type-check
```

## 🌍 Environment-uri

### Development (local)
- Redis local
- Supabase remote
- Log level: debug

### Production
- Redis remote (configurează REDIS_URL)
- Toate serviciile remote
- Log level: error
- NODE_ENV=production

## 🔐 Securitate

### Variabile Critice
- `JWT_SECRET`: Minimum 32 caractere, unic per environment
- `DATABASE_URL`: Conține parola, keep secret
- `SUPABASE_SERVICE_KEY`: Admin access, foarte sensibil
- `STRIPE_SECRET_KEY`: Acces la payments

### Best Practices
- Nu committa niciodată fișiere .env
- Folosește .env.example pentru template
- Rotează key-urile periodic
- Folosește variabile diferite pentru dev/prod

## 🎯 Verificare Finală

Backend-ul este gata când:
- [ ] `npm run dev` pornește fără erori
- [ ] Output-ul afișează: "Server running on port 3001"
- [ ] Nu apar erori Redis în log-uri
- [ ] Nu apar erori database în log-uri
- [ ] API health check răspunde: `GET http://localhost:3001/health`

## 🆘 Suport

Dacă întâmpini probleme:

1. Rulează diagnosis script: `./scripts/check-dependencies.sh`
2. Verifică log-urile în `logs/`
3. Testează individual:
   - Redis: `redis-cli ping`
   - Database: conectează-te cu psql
   - API keys: testează manual

---

**🎉 Succes! Backend-ul tău este gata să ruleze.**