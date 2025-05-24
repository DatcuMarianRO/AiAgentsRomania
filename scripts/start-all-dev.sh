#!/bin/bash
# Script pentru pornirea tuturor serviciilor în development

set -e

echo "🚀 AI Agents Romania - Starting All Development Services"
echo "========================================================"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

echo "🔍 Checking prerequisites..."

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "frontend" ] || [ ! -d "backend" ] || [ ! -d "unified" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

# Check Redis
if ! redis-cli ping &> /dev/null; then
    print_warning "Redis is not running. Starting Redis..."
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo systemctl start redis 2>/dev/null || sudo service redis-server start 2>/dev/null || redis-server --daemonize yes
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        brew services start redis 2>/dev/null || redis-server --daemonize yes
    else
        redis-server --daemonize yes
    fi
    
    sleep 2
    if redis-cli ping &> /dev/null; then
        print_status "Redis started successfully"
    else
        print_error "Failed to start Redis"
        exit 1
    fi
else
    print_status "Redis is running"
fi

# Install dependencies if needed
echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Installing root dependencies..."
    npm install
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

if [ ! -d "backend/node_modules" ]; then
    echo "Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

if [ ! -d "unified/node_modules" ]; then
    echo "Installing unified dependencies..."
    cd unified && npm install && cd ..
fi

if [ ! -d "shared/node_modules" ]; then
    echo "Installing shared dependencies..."
    cd shared && npm install && cd ..
fi

print_status "All dependencies installed"

# Check environment files
echo "⚙️  Checking environment configuration..."

check_env_file() {
    local dir=$1
    local file="$dir/.env"
    
    if [ ! -f "$file" ]; then
        if [ -f "$dir/.env.example" ]; then
            print_warning "Creating $file from .env.example"
            cp "$dir/.env.example" "$file"
        else
            print_error "$file not found and no .env.example available"
            return 1
        fi
    fi
    return 0
}

check_env_file "frontend" || exit 1
check_env_file "backend" || exit 1
check_env_file "unified" || exit 1

print_status "Environment files ready"

echo ""
echo "🎯 Service Configuration:"
echo "========================="
echo "Frontend:     http://localhost:3000"
echo "Backend API:  http://localhost:3001"
echo "Unified SSR:  http://localhost:4000"
echo ""

echo "🚀 Starting all services..."
echo ""

# Start all services with concurrently
npm run dev:all