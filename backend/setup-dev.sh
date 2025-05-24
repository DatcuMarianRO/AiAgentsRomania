#!/bin/bash
# Setup script pentru dezvoltare locală - AI Agents Romania Backend

set -e

echo "🚀 AI Agents Romania - Backend Setup"
echo "===================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Redis is installed
echo "🔍 Checking Redis installation..."
if command -v redis-server &> /dev/null; then
    print_status "Redis is installed"
else
    print_warning "Redis not found. Installing Redis..."
    
    # Detect OS and install Redis
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        if command -v apt-get &> /dev/null; then
            sudo apt-get update
            sudo apt-get install -y redis-server
        elif command -v yum &> /dev/null; then
            sudo yum install -y redis
        elif command -v pacman &> /dev/null; then
            sudo pacman -S redis
        else
            print_error "Could not detect package manager. Please install Redis manually."
            exit 1
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            brew install redis
        else
            print_error "Homebrew not found. Please install Redis manually."
            exit 1
        fi
    else
        print_error "Unsupported OS. Please install Redis manually."
        exit 1
    fi
fi

# Start Redis service
echo "🔄 Starting Redis service..."
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux - try different service managers
    if command -v systemctl &> /dev/null; then
        sudo systemctl start redis
        sudo systemctl enable redis
    elif command -v service &> /dev/null; then
        sudo service redis-server start
    else
        # Start Redis in background
        redis-server --daemonize yes
    fi
elif [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    if command -v brew &> /dev/null; then
        brew services start redis
    else
        redis-server --daemonize yes
    fi
else
    # Fallback - start as daemon
    redis-server --daemonize yes
fi

# Wait a moment for Redis to start
sleep 2

# Test Redis connection
echo "🧪 Testing Redis connection..."
if redis-cli ping | grep -q "PONG"; then
    print_status "Redis is running and responding"
else
    print_error "Redis is not responding. Please check the installation."
    exit 1
fi

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
npm install

# Check if .env file exists
if [ ! -f .env ]; then
    print_warning ".env file not found. Copying from .env.example..."
    cp .env.example .env
    print_warning "Please update .env file with your actual credentials!"
fi

# Validate critical environment variables
echo "🔍 Validating environment variables..."
source .env

missing_vars=()

if [ -z "$JWT_SECRET" ] || [ "$JWT_SECRET" = "your_jwt_secret_here" ]; then
    missing_vars+=("JWT_SECRET")
fi

if [ -z "$SUPABASE_URL" ] || [ "$SUPABASE_URL" = "your_supabase_url_here" ]; then
    missing_vars+=("SUPABASE_URL")
fi

if [ -z "$SUPABASE_KEY" ] || [ "$SUPABASE_KEY" = "your_supabase_key_here" ]; then
    missing_vars+=("SUPABASE_KEY")
fi

if [ -z "$DATABASE_URL" ] || [[ "$DATABASE_URL" == *"your_postgres_password"* ]]; then
    missing_vars+=("DATABASE_URL")
fi

if [ ${#missing_vars[@]} -ne 0 ]; then
    print_error "Missing or placeholder values for environment variables:"
    for var in "${missing_vars[@]}"; do
        echo "  - $var"
    done
    echo ""
    print_warning "Please update your .env file with real values before starting the server."
    echo ""
    echo "📝 Next steps:"
    echo "1. Get your Supabase credentials from: https://supabase.com/dashboard"
    echo "2. Update DATABASE_URL with your actual Supabase password"
    echo "3. Generate a strong JWT_SECRET"
    echo "4. Run 'npm run dev' to start the development server"
    exit 1
fi

print_status "Environment setup completed successfully!"
echo ""
echo "🎉 Backend setup is complete!"
echo ""
echo "📝 Next steps:"
echo "1. Run 'npm run dev' to start the development server"
echo "2. The server will run on http://localhost:3001"
echo "3. Check logs for any additional configuration needed"
echo ""
echo "🔧 Useful commands:"
echo "  npm run dev       - Start development server"
echo "  npm run build     - Build for production"
echo "  npm run test      - Run tests"
echo "  redis-cli ping    - Test Redis connection"