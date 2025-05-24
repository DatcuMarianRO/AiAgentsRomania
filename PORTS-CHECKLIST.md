# 🎯 Ports Checklist - VS Code Development

## 🚀 Quick Start (toate porturile în 30 secunde)

```bash
# Din root directory
./scripts/start-all-dev.sh
```

## 📋 Manual Step-by-Step

### 1. Verifică Redis
```bash
redis-cli ping
# Dacă nu: redis-server --daemonize yes
```

### 2. Start Backend (Port 3001)
```bash
cd backend && npm run dev
# ✅ Vizibil în VS Code Ports: localhost:3001
```

### 3. Start Frontend (Port 3000) 
```bash
cd frontend && npm run dev
# ✅ Vizibil în VS Code Ports: localhost:3000
```

### 4. Start Unified (Port 4000)
```bash
cd unified && npm run dev
# ✅ Vizibil în VS Code Ports: localhost:4000
```

## 📊 Expected VS Code Ports Tab

După start complet:

| Port | Service | URL | Status |
|------|---------|-----|--------|
| 3000 | Frontend | http://localhost:3000 | ✅ Green |
| 3001 | Backend API | http://localhost:3001 | ✅ Green |
| 4000 | Unified SSR | http://localhost:4000 | ✅ Green |

## 🧪 Test Endpoints

```bash
# Test toate serviciile
curl http://localhost:3001/health  # Backend
curl http://localhost:3000         # Frontend  
curl http://localhost:4000/health  # Unified
curl http://localhost:4000/api/v1  # API prin proxy
```

## 🔧 Alternative Commands

```bash
# Individual services
npm run dev:frontend    # Port 3000
npm run dev:backend     # Port 3001  
npm run dev:unified     # Port 4000

# Multiple services
npm run dev             # Frontend + Backend
npm run dev:all         # Toate 3 serviciile
```

## ⚡ Super Quick (1 comandă)

```bash
npm run dev:all
```

**Output așteptat:**
```
[frontend] ▲ Next.js 14.1.4
[frontend] - Local: http://localhost:3000

[backend] 🚀 Server running on port 3001
[backend] 📚 API docs: http://localhost:3001/api-docs

[unified] 🚀 Unified server running at http://localhost:4000
[unified] 📱 Frontend accessible at http://localhost:4000
[unified] 🔌 API accessible at http://localhost:4000/api/v1
```

## 🎉 Success Criteria

✅ **3 porturi verzi în VS Code**  
✅ **3 servicii responsabile**  
✅ **API calls funcționează**  
✅ **Frontend load-ează corect**  
✅ **Unified proxy funcționează**

---

**Goal: 30 secunde de la comandă la 3 porturi active!** 🚀