#!/bin/bash
# Script pentru pornirea doar a serviciului unified pe port 4000

set -e

echo "🚀 Starting AI Agents Romania - Unified Service"
echo "=============================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m' 
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}🔍 $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

cd /home/datcu/AiAgentsRomania

# Check if backend is running (optional but recommended)
print_info "Checking if backend is available..."
if curl -s http://localhost:3001/health > /dev/null; then
    print_status "Backend is running on port 3001 - API proxy will work"
else
    print_warning "Backend not detected on port 3001 - API calls may fail"
    echo "  To start backend: cd backend && npm run dev"
fi

# Check Redis (needed for backend)
if redis-cli ping > /dev/null 2>&1; then
    print_status "Redis is running"
else
    print_warning "Redis not running - starting it..."
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo systemctl start redis 2>/dev/null || redis-server --daemonize yes
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        brew services start redis 2>/dev/null || redis-server --daemonize yes
    else
        redis-server --daemonize yes
    fi
fi

echo ""
print_info "Starting Unified Service on port 4000..."
echo ""
echo "🌟 What you'll see:"
echo "   Frontend: Complete Next.js 15 + React 19 + Tailwind CSS"
echo "   Backend:  API proxy to port 3001 (/api/v1/*)"
echo "   Health:   Server status at /health"
echo ""
echo "🌐 Open in browser: http://localhost:4000"
echo ""

cd unified
npm run dev