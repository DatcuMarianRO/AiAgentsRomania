# 🎯 AI Agents Romania - Deployment Checklist

## Pre-Flight Check (Local Development)

### ✅ Backend Setup - Verifică în ordine:

```bash
cd backend/

# 1. Verifică dependențele
npm run check
# Toate ✅ = bun de continuat

# 2. Dacă Redis lipsește:
sudo apt install redis-server    # Linux
brew install redis               # macOS

# 3. Pornește Redis
sudo systemctl start redis       # Linux
brew services start redis        # macOS
redis-cli ping                   # Test: răspuns = PONG

# 4. Completează .env (CRITICĂ)
nano .env
# Înlocuiește: your_postgres_password cu parola ta reală din Supabase

# 5. Test final
npm run dev
# Success: "Server running on port 3001"
```

### ✅ Frontend Setup:

```bash
cd ../frontend/

# 1. Instalează
npm install

# 2. Verifică .env
nano .env.local
# NEXT_PUBLIC_API_URL=http://localhost:3001

# 3. Start
npm run dev
# Success: "Ready on http://localhost:3000"
```

## Production Deployment

### ✅ Environment Variables Production

**Backend (.env.production):**
```env
NODE_ENV=production
DATABASE_URL=postgresql://postgres:PROD_PASSWORD@db.your-prod.supabase.co:5432/postgres
REDIS_URL=redis://your-prod-redis:6379
JWT_SECRET=64_character_secure_production_secret
SUPABASE_URL=https://your-prod-project.supabase.co
STRIPE_SECRET_KEY=sk_live_your_live_key
FRONTEND_URL=https://your-domain.com
```

**Frontend (.env.production):**
```env
NEXT_PUBLIC_API_URL=https://api.your-domain.com
NEXT_PUBLIC_SUPABASE_URL=https://your-prod-project.supabase.co
```

### ✅ Production Services

1. **Database**: Supabase Production Project
2. **Redis**: 
   - AWS ElastiCache
   - Redis Cloud
   - Self-hosted Redis server
3. **Server**: 
   - VPS (DigitalOcean, Linode, etc.)
   - AWS EC2
   - Heroku
   - Vercel (frontend) + Railway (backend)

### ✅ Production Build & Deploy

```bash
# Backend
cd backend/
npm run build
NODE_ENV=production npm start

# Frontend  
cd frontend/
npm run build
npm start
```

## 🔍 Health Checks

### Local:
- **Backend**: `curl http://localhost:3001/health`
- **Frontend**: `curl http://localhost:3000`
- **Redis**: `redis-cli ping`
- **Database**: psql connection test

### Production:
- **Backend**: `curl https://api.your-domain.com/health`
- **Frontend**: `curl https://your-domain.com`
- **Logs**: Check application logs
- **Metrics**: Monitor CPU, Memory, Database connections

## 🚨 Common Issues & Solutions

### Redis Connection Error
```bash
# Check if running
redis-cli ping

# Start if not running
sudo systemctl start redis
# OR
redis-server --daemonize yes
```

### Database Connection Error
```bash
# Test connection
psql "postgresql://postgres:PASSWORD@host:5432/postgres"

# Check if DATABASE_URL is correct in .env
grep DATABASE_URL .env
```

### Port Already in Use
```bash
# Check what's using port 3001
lsof -i :3001

# Kill process if needed
kill -9 PID

# Or use different port in .env
PORT=3002
```

### TypeScript Compilation Errors
```bash
# Check types
npm run typecheck

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🎛️ Quick Commands Reference

```bash
# Development
npm run dev          # Start dev server
npm run check        # Check dependencies
npm run services     # Start external services

# Production
npm run build        # Build for production  
npm run prod         # Start production server

# Debugging
npm run dev:debug    # Start with debug logs
npm run typecheck    # Check TypeScript
npm test             # Run tests

# Services
redis-cli ping       # Test Redis
psql DATABASE_URL    # Test Database
```

## 📊 Success Criteria

### Development Ready:
- [ ] `npm run check` = all ✅
- [ ] `npm run dev` starts without errors
- [ ] No Redis connection errors in logs
- [ ] No database connection errors in logs
- [ ] Frontend connects to backend API
- [ ] Can create/login users
- [ ] AI agents respond correctly

### Production Ready:
- [ ] All environment variables production-ready
- [ ] Database migrations run successfully
- [ ] Redis cluster/service configured
- [ ] SSL certificates configured
- [ ] Domain pointing to correct servers
- [ ] Health endpoints respond
- [ ] Monitoring & logging configured

---

**🎉 Obiectiv: Zero erori la `npm run dev` în < 60 secunde**