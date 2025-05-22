# 🚀 Unified Service - AI Agents Romania

## Ce este Unified Service?

Unified Service combină **Frontend** + **Backend** într-un singur server pe portul **4000**.

### 🎯 Caracteristici:

- **Next.js 15** cu React 19 - cel mai nou
- **Tailwind CSS** complet configurat  
- **API Proxy** către backend (port 3001)
- **Server-Side Rendering** pentru SEO
- **Single deployment** pentru producție

## 🚀 Pornire Rapidă

```bash
# Opțiunea 1: Script automat
./scripts/start-unified-only.sh

# Opțiunea 2: Manual
cd unified && npm run dev
```

## 🌐 Endpoints

- **Homepage**: `http://localhost:4000/`
- **API Health**: `http://localhost:4000/api/v1/health`
- **Server Health**: `http://localhost:4000/health`
- **Backend Health**: `http://localhost:4000/backend-health`

## 🏗️ Cum funcționează?

1. **Express Server** pornește pe port 4000
2. **Next.js App** se integrează cu Express
3. **API calls** `/api/v1/*` sunt proxiate către backend (port 3001)
4. **Static pages** sunt servite direct de Next.js
5. **CSS/JS** sunt compilate și servite automat

## 📁 Structura

```
unified/
├── pages/           # Next.js pages
│   ├── index.tsx    # Homepage
│   └── _app.tsx     # App wrapper
├── styles/          # CSS files
│   └── globals.css  # Tailwind + custom styles
├── src/
│   └── server.ts    # Express + Next.js integration
├── next.config.js   # Next.js configuration
├── tailwind.config.js # Tailwind configuration
└── package.json     # Dependencies
```

## 🔧 Configurare

### Environment Variables (unified/.env)
```env
PORT=4000
FALLBACK_PORT=4100
NODE_ENV=development

# Backend integration
BACKEND_API_URL=http://localhost:3001/api/v1
BACKEND_HEALTH_URL=http://localhost:3001/health

# Frontend configuration
NEXT_PUBLIC_API_URL=/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:4000
```

### Dependențe principale:
- `next`: ^15.1.6
- `react`: ^19.0.0  
- `express`: ^4.19.2
- `tailwindcss`: ^3.4.17
- `http-proxy-middleware`: ^3.0.0

## 🎨 Styling

Unified folosește **Tailwind CSS** cu configurația completă:
- Dark/Light mode support
- Custom color variables
- Responsive design
- Animation support

## 🔗 API Integration

Toate call-urile către API sunt automat proxiate:

```javascript
// Din frontend
fetch('/api/v1/agents')  // → http://localhost:3001/api/v1/agents

// Direct backend health
fetch('/backend-health') // → http://localhost:3001/health
```

## 🚀 Producție

Pentru deployment în producție:

```bash
# Build
npm run build

# Start production server
npm start
```

## 🔍 Debugging

```bash
# Vezi log-urile complete
cd unified && npm run dev

# Testează manual endpoints
curl http://localhost:4000/health
curl http://localhost:4000/api/v1/health
```

---

**🎯 Obiectiv: O singură adresă (localhost:4000) pentru întreaga aplicație!**