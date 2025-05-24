#!/bin/bash
# Script pentru pornirea serviciilor necesare (Redis, etc.)

set -e

echo "🔄 Starting required services for AI Agents Romania Backend..."

# Function to check if a service is running
check_service() {
    local service_name=$1
    local check_command=$2
    
    if eval $check_command &> /dev/null; then
        echo "✅ $service_name is running"
        return 0
    else
        echo "❌ $service_name is not running"
        return 1
    fi
}

# Start Redis
echo "🔴 Starting Redis..."
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    if command -v systemctl &> /dev/null; then
        sudo systemctl start redis || sudo systemctl start redis-server
    elif command -v service &> /dev/null; then
        sudo service redis-server start
    else
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
    redis-server --daemonize yes
fi

# Wait for services to start
sleep 3

# Check services
echo "🧪 Checking services..."
check_service "Redis" "redis-cli ping | grep -q PONG"

echo ""
echo "🎉 All services are ready!"
echo "📝 You can now run: npm run dev"