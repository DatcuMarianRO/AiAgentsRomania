# Health Check System

The AI Agents Romania platform includes a comprehensive health check system that monitors the status of all critical services.

## Endpoint

The health check endpoint is accessible at:

```
GET /health
```

This endpoint returns a JSON response with the following structure:

```json
{
  "status": "ok",
  "timestamp": "2024-05-21T23:15:00.000Z",
  "services": {
    "redis": {
      "status": "connected"
    },
    "supabase": {
      "status": "connected",
      "error": null
    }
  },
  "environment": "development",
  "uptime": 3600,
  "version": "1.0.0"
}
```

## Status Codes

- `ok`: All services are connected and functioning normally
- `degraded`: One or more services are experiencing issues but the system is still operational
- `error`: Critical services are down and the system is not functioning properly

## Monitored Services

The health check system monitors the following services:

### Redis

Redis is used for caching and rate limiting. The health check verifies that the Redis client is connected and ready to accept commands.

### Supabase

Supabase is our primary database. The health check attempts to query the `health_check` table to verify that the database connection is working properly.

## Setup

The health check system is automatically set up when you run the database initialization script:

```
npm run init-db
```

This script creates the necessary database tables, including a `health_check` table specifically used for monitoring.

## Extending

To add additional service checks to the health check system, modify the `/health` endpoint in `backend/src/index.ts`.