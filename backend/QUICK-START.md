# 🚀 Quick Start - 2 Minute Setup

## Partea 1: Environment (.env) - OBLIGATORIU

Trebuie să completezi DATABASE_URL cu parola ta reală de Supabase:

```bash
# Editează fișierul .env
nano .env

# Găsește linia:
DATABASE_URL=postgresql://postgres:your_postgres_password@db.eayihvoacrjxbltgsnxd.supabase.co:5432/postgres

# Înlocuiește 'your_postgres_password' cu parola ta reală din Supabase
```

### Cum găsești parola Supabase:
1. Mergi la https://supabase.com/dashboard
2. Alege proiectul `eayihvoacrjxbltgsnxd`
3. Settings → Database
4. Copiază "Connection string" și extrage parola

## Partea 2: Installează Redis

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install redis-server

# macOS
brew install redis

# Windows (WSL)
sudo apt update && sudo apt install redis-server
```

## Partea 3: Pornește Totul

```bash
# 1. Pornește Redis
sudo systemctl start redis
# SAU pentru macOS: brew services start redis

# 2. Testează Redis
redis-cli ping
# Răspuns așteptat: PONG

# 3. Verifică că totul e OK
npm run check

# 4. Pornește backend-ul
npm run dev
```

## Success Messages

Când merge totul:
```
✅ Node.js is installed
✅ Redis is running
✅ DATABASE_URL is configured  
✅ All dependencies ready
🚀 Server running on port 3001
```

## Dacă nu merge...

### Redis nu pornește:
```bash
# Start manual
redis-server --daemonize yes

# Verifică status
redis-cli ping
```

### Database connection failed:
- Verifică că ai înlocuit `your_postgres_password` în .env
- Testează conexiunea direct:
```bash
# Înlocuiește cu datele tale reale
psql "postgresql://postgres:PAROLA_TA_REALA@db.eayihvoacrjxbltgsnxd.supabase.co:5432/postgres"
```

### Port ocupat:
Backend-ul va încerca automat portul 3101 dacă 3001 e ocupat.

---

**🎯 Goal: `npm run dev` să funcționeze fără erori în < 2 minute**