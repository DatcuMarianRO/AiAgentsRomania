# 🚀 AI Agents Romania - Services Guide

## 📋 Architektura Serviciilor

### Port Configuration:
- **Frontend (Next.js)**: `3000` - React SPA cu Tailwind + Supabase Auth
- **Backend (Express API)**: `3001` - REST API + Auth + Database + Redis
- **Unified (SSR)**: `4000` - Next.js SSR + API Proxy (Full-stack în unul)

## 🎯 Serviciul pe Portul 4000 (Unified)

**Ce face:**
- Servește frontend-ul via Next.js SSR (Server-Side Rendering)
- Proxy pentru API calls către backend (port 3001)
- Single point of entry pentru toată aplicația
- Ideal pentru producție sau testare end-to-end

**Avantaje:**
- Un singur URL pentru totul: `http://localhost:4000`
- API calls merg automat prin proxy: `http://localhost:4000/api/v1/*`
- SEO-friendly cu SSR
- Simplified deployment

## 🚀 Comenzi pentru Pornire

### Opțiunea 1: Individual (Recomandat pentru dezvoltare)
```bash
# Frontend only
npm run dev:frontend    # Port 3000

# Backend only  
npm run dev:backend     # Port 3001

# Unified only
npm run dev:unified     # Port 4000
```

### Opțiunea 2: Toate Deodată (Pentru testare completă)
```bash
# Script automat - pornește toate 3 serviciile
./scripts/start-all-dev.sh

# SAU prin npm
npm run dev:all
```

### Opțiunea 3: Tradițional (Frontend + Backend)
```bash
npm run dev
# Pornește doar frontend + backend (fără unified)
```

## 🔌 Endpoints și Testing

### Health Checks:
```bash
# Backend health
curl http://localhost:3001/health

# Unified health  
curl http://localhost:4000/health

# Backend health prin unified
curl http://localhost:4000/backend-health
```

### API Testing:
```bash
# Direct backend API
curl http://localhost:3001/api/v1/agents

# Through unified proxy
curl http://localhost:4000/api/v1/agents

# Frontend pages
curl http://localhost:3000        # Direct React SPA
curl http://localhost:4000        # SSR rendered
```

## 📊 Când să folosești care serviciu?

### Development workflow:
1. **Frontend dev**: Port 3000 (hot reload rapid)
2. **Backend dev**: Port 3001 (API development)
3. **Full-stack testing**: Port 4000 (unified)

### Production deployment:
- **Opțiunea A**: Deploy unified pe port 4000 (all-in-one)
- **Opțiunea B**: Frontend pe Vercel + Backend pe Railway/Heroku

## ⚙️ Configurare Rapidă

### 1. Check și Start toate serviciile:
```bash
./scripts/start-all-dev.sh
```

### 2. Sau pas cu pas:
```bash
# 1. Start Redis
redis-cli ping || redis-server --daemonize yes

# 2. Backend
cd backend && npm run dev &

# 3. Frontend  
cd frontend && npm run dev &

# 4. Unified
cd unified && npm run dev &
```

## 🔍 Troubleshooting

### Port ocupat:
- Frontend fallback: 3100
- Backend fallback: 3101  
- Unified fallback: 4100

### Proxy errors în unified:
- Verifică că backend rulează pe 3001
- Check `BACKEND_API_URL` în unified/.env

### Build errors:
```bash
# Clean și rebuild
npm run clean
npm install
npm run build:shared
```

## 📝 VS Code Ports Tab

După rularea `./scripts/start-all-dev.sh`, în VS Code Ports tab vei avea:

✅ **3000** - Frontend (Next.js React)  
✅ **3001** - Backend (Express API)  
✅ **4000** - Unified (SSR + Proxy)  

## 🎉 Quick Start

**Pentru a avea toate serviciile pornite în < 30 secunde:**

```bash
# Din root directory
./scripts/start-all-dev.sh
```

**Success output:**
```
✅ Redis is running
✅ All dependencies installed  
✅ Environment files ready
🚀 Starting all services...
Frontend:     http://localhost:3000
Backend API:  http://localhost:3001  
Unified SSR:  http://localhost:4000
```

---

**🎯 Obiectiv: 3 servicii pornite, 3 porturi vizibile în VS Code, testare end-to-end completă!**