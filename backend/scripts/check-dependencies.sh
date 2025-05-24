#!/bin/bash
# Script pentru verificarea dependințelor și configurației

set -e

echo "🔍 AI Agents Romania - Dependency Check"
echo "======================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
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

errors=0

# Check Node.js
echo "🟢 Checking Node.js..."
if command -v node &> /dev/null; then
    node_version=$(node --version)
    print_status "Node.js is installed: $node_version"
    
    # Check if version is >= 16
    if [[ ${node_version:1:2} -ge 16 ]]; then
        print_status "Node.js version is compatible"
    else
        print_error "Node.js version should be >= 16. Current: $node_version"
        errors=$((errors + 1))
    fi
else
    print_error "Node.js is not installed"
    errors=$((errors + 1))
fi

# Check npm
echo "📦 Checking npm..."
if command -v npm &> /dev/null; then
    npm_version=$(npm --version)
    print_status "npm is installed: $npm_version"
else
    print_error "npm is not installed"
    errors=$((errors + 1))
fi

# Check Redis
echo "🔴 Checking Redis..."
if command -v redis-server &> /dev/null; then
    redis_version=$(redis-server --version | head -n1)
    print_status "Redis is installed: $redis_version"
    
    # Check if Redis is running
    if redis-cli ping &> /dev/null; then
        print_status "Redis is running"
    else
        print_warning "Redis is installed but not running"
        echo "  Run: ./scripts/start-services.sh"
    fi
else
    print_error "Redis is not installed"
    errors=$((errors + 1))
fi

# Check .env file
echo "⚙️  Checking environment configuration..."
if [ -f .env ]; then
    print_status ".env file exists"
    
    # Check critical variables
    source .env
    
    if [ -n "$JWT_SECRET" ] && [ "$JWT_SECRET" != "your_jwt_secret_here" ]; then
        print_status "JWT_SECRET is configured"
    else
        print_error "JWT_SECRET is missing or not configured"
        errors=$((errors + 1))
    fi
    
    if [ -n "$SUPABASE_URL" ] && [ "$SUPABASE_URL" != "your_supabase_url_here" ]; then
        print_status "SUPABASE_URL is configured"
    else
        print_error "SUPABASE_URL is missing or not configured"
        errors=$((errors + 1))
    fi
    
    if [ -n "$DATABASE_URL" ] && [[ "$DATABASE_URL" != *"your_postgres_password"* ]]; then
        print_status "DATABASE_URL is configured"
    else
        print_error "DATABASE_URL is missing or not configured"
        errors=$((errors + 1))
    fi
    
    if [ -n "$REDIS_URL" ]; then
        print_status "REDIS_URL is configured"
    else
        print_warning "REDIS_URL is not set, using default"
    fi
    
else
    print_error ".env file is missing"
    errors=$((errors + 1))
fi

# Check node_modules
echo "📚 Checking dependencies..."
if [ -d node_modules ]; then
    print_status "node_modules exists"
else
    print_warning "node_modules is missing"
    echo "  Run: npm install"
fi

# Summary
echo ""
echo "📊 Summary"
echo "==========="

if [ $errors -eq 0 ]; then
    print_status "All dependencies and configuration are ready!"
    echo ""
    echo "🚀 You can start the development server with:"
    echo "   npm run dev"
else
    print_error "Found $errors error(s). Please fix them before starting the server."
    echo ""
    echo "🔧 Quick fixes:"
    echo "1. Install missing dependencies: ./setup-dev.sh"
    echo "2. Update .env file with real values"
    echo "3. Start Redis: ./scripts/start-services.sh"
fi