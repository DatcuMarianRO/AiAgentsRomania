# Moduri de Dezvoltare - AI Agents Romania

Acest document explică cele trei moduri de funcționare pentru dezvoltarea locală a aplicației AI Agents Romania.

## Arhitectura Porturilor

### Port 3000 - Frontend Separat (Next.js)
- **Descriere**: Serverul de dezvoltare Next.js pentru frontend
- **Utilizare**: Dezvoltare UI, testarea componentelor frontend
- **API**: Se conectează la backend-ul de pe portul 3001

### Port 3001 - Backend Separat (Express/Node.js)
- **Descriere**: Serverul API Express cu toate serviciile backend
- **Utilizare**: Dezvoltarea API-urilor, testarea serviciilor backend
- **Funcționalități**: REST API, autentificare, integrarea cu bazele de date

### Port 4000 - Server Unificat (Frontend + Backend)
- **Descriere**: Un singur server care gestionează atât frontend-ul cât și backend-ul
- **Utilizare**: Testarea integrării, simularea producției locale
- **Funcționalități**: Servește frontend-ul și proxies către API

## Configurarea Environment Variables

### 1. Backend (.env)
```bash
# Server Configuration
PORT=3001
FALLBACK_PORT=3101
NODE_ENV=development

# API și servicii externe
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
JWT_SECRET=your_jwt_secret
OPENROUTER_API_KEY=your_openrouter_key
REDIS_URL=redis://localhost:6379
DATABASE_URL=postgresql://user:pass@host:5432/db

# CORS
FRONTEND_URL=http://localhost:3000
```

### 2. Frontend (.env.local)
```bash
# Frontend Server
PORT=3000
FALLBACK_PORT=3100

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Servicii publice
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

### 3. Unified Server (.env)
```bash
# Unified Server
PORT=4000
FALLBACK_PORT=4100
NODE_ENV=development

# Internal backend connection
BACKEND_API_URL=http://localhost:3001/api/v1
BACKEND_HEALTH_URL=http://localhost:3001/health

# Frontend serving
NEXT_PUBLIC_API_URL=/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:4000

# Toate configurările backend (JWT, Supabase, etc.)
```

## Scripturi de Rulare

### Setup Rapid
```bash
# Generează automat toate fișierele .env
npm run setup:env
```

### Dezvoltare Separată
```bash
# Doar frontend (port 3000)
npm run dev:frontend

# Doar backend (port 3001)
npm run dev:backend

# Ambele în paralel
npm run dev
```

### Server Unificat
```bash
# Dezvoltare unificată (port 4000)
npm run dev:unified

# Build și start production-like
npm run build:unified
npm run start:unified
```

## Testarea Funcționalităților

### 1. Frontend Separat (Port 3000)
```bash
npm run dev:frontend
```
**Testează:**
- http://localhost:3000 - Pagina principală
- http://localhost:3000/dashboard - Dashboard (necesită autentificare)
- http://localhost:3000/marketplace - Marketplace agenți

### 2. Backend Separat (Port 3001)
```bash
npm run dev:backend
```
**Testează:**
- http://localhost:3001/health - Health check
- http://localhost:3001/docs - Documentația API (Swagger)
- http://localhost:3001/api/v1/auth/login - Endpoint de autentificare

### 3. Server Unificat (Port 4000)
```bash
npm run dev:unified
```
**Testează:**
- http://localhost:4000 - Aplicația completă
- http://localhost:4000/api/v1/health - API prin proxy
- http://localhost:4000/health - Health check server unificat
- http://localhost:4000/backend-health - Health check backend prin proxy

## Troubleshooting

### Porturile sunt ocupate
Aplicația va încerca automat porturile alternative configurate în variabilele FALLBACK_PORT.

### Erori de CORS
Verifică configurările CORS în:
- backend/src/index.ts
- frontend/next.config.js
- unified/src/server.ts

### Probleme cu proxy-ul în serverul unificat
Verifică:
- BACKEND_API_URL în .env
- Statusul backend-ului (port 3001)
- Logs în consola serverului unificat

## Flowchart pentru alegerea modului de dezvoltare

```
Dezvolt doar UI? 
├─ DA → npm run dev:frontend (Port 3000)
└─ NU
   │
   Dezvolt doar API?
   ├─ DA → npm run dev:backend (Port 3001)  
   └─ NU
      │
      Testez integrarea?
      ├─ DA → npm run dev:unified (Port 4000)
      └─ Dezvolt tot → npm run dev (Port 3000 + 3001)
```

## Best Practices

1. **Dezvoltare de funcționalități noi**: Folosește `npm run dev` pentru a avea ambele servere active
2. **Debug API**: Folosește `npm run dev:backend` pentru focus pe backend
3. **Test UI/UX**: Folosește `npm run dev:frontend` pentru focus pe frontend  
4. **Test final/demo**: Folosește `npm run dev:unified` pentru simulare producție
5. **Setup rapid**: Rulează `npm run setup:env` la beginning pentru a configura toate .env-urile

## Monitorizare și Logs

Fiecare mod de rulare are propriile logs:
- **Frontend**: Logs Next.js în terminal
- **Backend**: Winston logs în terminal și fișiere (`logs/`)
- **Unified**: Logs combinate pentru ambele servicii

Pentru debugging avansat, accesează:
- Frontend: Browser DevTools
- Backend: Log files în `backend/logs/`
- Unified: Console logs pentru ambele servicii