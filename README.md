# AI Agents Romania

A premium AI agents marketplace developed by Invent Evolution SRL.

## Project Overview

AI Agents Romania is a production-grade marketplace where users can browse, purchase, and use AI agents powered by OpenRouter. The platform also allows users to create and sell their own custom agents, subscribe to various pricing tiers, and execute agents with streaming responses.

## Architecture

This project is built with a modern tech stack:

### Backend

- Node.js + Express + TypeScript
- PostgreSQL via Supabase with Row Level Security
- Redis for caching and rate limiting
- JWT authentication + session management
- Stripe for payment processing
- OpenRouter.ai API integration
- OpenAPI documentation

### Frontend

- Next.js 14+ with App Router
- React Server Components
- TypeScript
- Zustand for state management
- React Query / TanStack Query for API integration
- Tailwind CSS + shadcn/ui components
- GSAP for animations
- Responsive design

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (or Supabase account)
- Redis server
- Stripe account (for payments)
- OpenRouter.ai API key

### Project Structure

This project uses a monorepo architecture with the following structure:

```
/
├── backend/           # Express API server
├── frontend/          # Next.js web application
├── shared/            # Shared types, schemas, and constants
├── scripts/           # Utility scripts
├── docs/              # Documentation
└── package.json       # Root package.json with workspace config
```

### Installation

#### Root (Recommended)

1. Install dependencies for all workspaces:
   ```
   npm install
   ```

2. Set up environment variables:
   - For backend: Copy `backend/.env.example` to `backend/.env` and fill in your credentials.
   - For frontend: Copy `frontend/.env.example` to `frontend/.env.local` and update as needed.

3. Start both development servers concurrently:
   ```
   npm run dev
   ```
   This will start both the backend server (port 3001) and frontend application (port 3000).

### Moduri de Dezvoltare

Aplicația poate fi rulată în trei moduri diferite:

#### 1. Setup Rapid (Recomandat pentru prima instalare)
```bash
# Generează automat toate fișierele .env necesare
npm run setup:env
```

#### 2. Dezvoltare Separată
```bash
# Frontend separat (port 3000)
npm run dev:frontend
# Testează: http://localhost:3000

# Backend separat (port 3001)  
npm run dev:backend
# Testează: http://localhost:3001/health

# Ambele în paralel (recomandat pentru dezvoltare)
npm run dev
# Testează: http://localhost:3000 + http://localhost:3001
```

#### 3. Server Unificat (Production-like)
```bash
# Server unificat (port 4000)
npm run dev:unified
# Testează: http://localhost:4000
```

### Verificarea Funcționalității

**Frontend (Port 3000)**:
- http://localhost:3000 - Pagina principală cu "AI-Agents-Romania este LIVE!"
- http://localhost:3000/dashboard - Dashboard utilizator
- http://localhost:3000/marketplace - Marketplace agenți

**Backend (Port 3001)**:
- http://localhost:3001/health - Health check cu status servicii
- http://localhost:3001/docs - Documentație API (Swagger)
- http://localhost:3001/api/v1/* - Endpoints REST API

**Server Unificat (Port 4000)**:
- http://localhost:4000 - Aplicația completă (frontend + backend)
- http://localhost:4000/api/v1/* - API prin proxy
- http://localhost:4000/health - Health check server unificat

#### Individual Services

Alternatively, you can run each service individually:

##### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env` and fill in your credentials.

4. Start the development server:
   ```
   npm run dev
   ```

##### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env.local` and update as needed.

4. Start the development server:
   ```
   npm run dev
   ```

## Features

- User authentication and profiles
- Agent browsing and filtering
- Agent creation and management
- Subscription tiers with different access levels
- Credit system for using agents
- Marketplace for buying and selling agents
- Streaming responses from AI models
- Conversation history and management
- Secure payment processing

## License

This project is proprietary and owned by Invent Evolution SRL.

© 2023-2024 Invent Evolution SRL. All rights reserved.
