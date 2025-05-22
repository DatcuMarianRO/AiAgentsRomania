# Sistem de Metrici și Analiză

Această documentație descrie implementarea sistemului de metrici și analiză pentru platforma AI Agents Romania.

## Arhitectură

Sistemul de metrici și analiză constă din următoarele componente:

1. **Model de date** - Tabele SQL pentru stocarea și accesarea metricilor
2. **Serviciu de metrici** - Clasă TypeScript pentru accesarea și procesarea datelor
3. **Controller de metrici** - Rute API pentru accesarea metricilor
4. **Integrare cu logarea** - Folosirea sistemului de logare avansat
5. **Integrare cu Supabase și Postgres** - Utilizarea conexiunii directe PostgreSQL

## Schema de Date

Sistemul utilizează următoarele tabele și vederi:

### Tabelul `agent_usage`

Stochează fiecare utilizare a unui agent AI:

- `id`: Identificator unic
- `user_id`: ID-ul utilizatorului
- `agent_id`: ID-ul agentului
- `tokens_used`: Numărul de tokeni consumați
- `response_time_ms`: Timpul de răspuns în milisecunde
- `is_streaming`: Indicator pentru răspunsuri în streaming
- `created_at`: Timestamp

### View-ul `daily_usage_stats`

Oferă statistici agregate zilnice:

- `day`: Data (truncată la zi)
- `total_requests`: Număr total de cereri
- `total_tokens`: Tokeni totali consumați
- `avg_response_time`: Timp mediu de răspuns
- `unique_users`: Utilizatori unici
- `unique_agents`: Agenți unici utilizați

### Funcția `get_user_usage_stats`

O funcție PostgreSQL care returnează statisticile unui utilizator:

- Utilizare pe agent
- Tokeni totali
- Timp mediu de răspuns

## Securitate și Politici RLS

Sistemul implementează securitate la nivel de rând (Row Level Security) pentru a asigura că:

1. Utilizatorii pot vedea doar propriile date de utilizare
2. Administratorii pot vedea toate datele

## API Endpoints

### Obținere metrici sistem

```
GET /api/v1/metrics/system
```

**Acces**: Doar administratori

**Răspuns**:
```json
{
  "status": "success",
  "data": {
    "users": 120,
    "agents": 45,
    "subscriptions": {
      "free": 80,
      "basic": 25,
      "premium": 12,
      "enterprise": 3
    },
    "timestamp": "2023-05-21T14:23:45.123Z"
  }
}
```

### Obținere statistici utilizator

```
GET /api/v1/metrics/user/:userId
```

**Acces**: Propriile date sau administratori

**Răspuns**:
```json
{
  "status": "success",
  "data": {
    "agentUsage": [
      {
        "agent_id": "abc123",
        "usage_count": 47,
        "total_tokens": 24500,
        "avg_response_time": 1230
      }
    ],
    "dailyUsage": [
      {
        "day": "2023-05-21T00:00:00.000Z",
        "usage_count": 12,
        "tokens_used": 6400
      }
    ],
    "userId": "user123"
  }
}
```

### Obținere top agenți

```
GET /api/v1/metrics/agents/top?limit=10
```

**Acces**: Toți utilizatorii autentificați

**Răspuns**:
```json
{
  "status": "success",
  "data": [
    {
      "id": "agent123",
      "name": "Code Assistant",
      "description": "Ajută la scrierea de cod",
      "created_by": "user456",
      "usage_count": 1245,
      "total_tokens": 680000
    }
  ]
}
```

## Utilizare Practică

### Înregistrarea utilizării

Pentru a înregistra utilizarea unui agent, folosiți:

```typescript
import metricsService from '../services/metrics.service';

// În timpul sau după procesarea unei cereri de agent
await metricsService.logAgentUsage({
  userId: req.user.id,
  agentId: selectedAgent.id,
  tokensUsed: response.usage.total_tokens,
  responseTime: performance.now() - startTime,
  isStreaming: req.body.stream || false
});
```

### Obținerea statisticilor pentru dashboard

```typescript
// În controller pentru dashboard
const userStats = await metricsService.getUserUsageStats(req.user.id);
res.render('dashboard', { userStats });
```

### Afișarea top agenților în marketplace

```typescript
// În controller pentru marketplace
const topAgents = await metricsService.getTopAgents(5);
res.render('marketplace', { topAgents, otherAgents });
```

## Extensibilitate

Sistemul de metrici poate fi extins cu următoarele funcționalități:

1. **Exportare date** - Endpoint pentru exportarea datelor în format CSV/Excel
2. **Grafice și vizualizări** - API pentru generarea datelor pentru grafice
3. **Previziuni** - Analiză predictivă a consumului de resurse
4. **Alerte** - Notificări bazate pe praguri definite

## Integrare cu Servicii Externe

Sistemul poate fi integrat cu servicii externe de analiză precum:

- Google Analytics
- Mixpanel
- Amplitude
- Grafana

## Considerații de Performanță

Pentru a asigura performanța optimă:

1. Indecși adecvați pe tabelele de metrici
2. Agregate precalculate pentru vizualizări frecvente
3. Cache pentru interogări frecvente
4. Partajarea tabelelor pentru date istorice voluminoase