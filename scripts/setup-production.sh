#!/bin/bash

# AI Agents Romania - Production Setup Script
# This script sets up the complete production environment

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   log_error "This script must be run as root"
   exit 1
fi

log_info "Starting AI Agents Romania production setup..."

# Update system
log_info "Updating system packages..."
apt update && apt upgrade -y

# Install prerequisites
log_info "Installing prerequisites..."
apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release

# Install Docker
log_info "Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    systemctl start docker
    systemctl enable docker
    log_success "Docker installed successfully"
else
    log_info "Docker already installed"
fi

# Install Docker Compose
log_info "Installing Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    log_success "Docker Compose installed successfully"
else
    log_info "Docker Compose already installed"
fi

# Install Certbot
log_info "Installing Certbot..."
if ! command -v certbot &> /dev/null; then
    apt install -y certbot python3-certbot-nginx
    log_success "Certbot installed successfully"
else
    log_info "Certbot already installed"
fi

# Create project directory
log_info "Setting up project directory..."
mkdir -p /opt/ai-agents
cd /opt

# Clone repository
log_info "Cloning repository..."
if [[ -d "/opt/ai-agents/.git" ]]; then
    log_info "Repository already exists, pulling latest changes..."
    cd /opt/ai-agents
    git pull origin main
else
    git clone https://github.com/DatcuMarianRO/AiAgentsRomania.git ai-agents
fi

cd /opt/ai-agents

# Make scripts executable
chmod +x scripts/*.sh

# Create necessary directories
mkdir -p nginx/logs
mkdir -p /opt/backups/ai-agents
mkdir -p /var/www/certbot

# Set up environment file
if [[ ! -f ".env.prod" ]]; then
    log_info "Creating environment file..."
    cp .env.example .env.prod
    log_warning "Please edit .env.prod with your actual configuration values!"
    log_warning "nano /opt/ai-agents/.env.prod"
fi

# Set up SSL certificate auto-renewal
log_info "Setting up SSL certificate auto-renewal..."
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet && docker-compose -f /opt/ai-agents/docker-compose.yml exec nginx nginx -s reload") | crontab -

# Set up database backup
log_info "Setting up database backup..."
cat > /opt/ai-agents/scripts/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/opt/backups/ai-agents"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p "$BACKUP_DIR"

# Database backup
if docker ps | grep -q "ai-agents-db"; then
    docker exec ai-agents-db pg_dump -U aiagents -d ai_agents_romania > "$BACKUP_DIR/db_backup_$DATE.sql"
    
    # Compress old backups
    find "$BACKUP_DIR" -name "*.sql" -mtime +7 -exec gzip {} \;
    
    # Remove backups older than 30 days
    find "$BACKUP_DIR" -name "*.sql.gz" -mtime +30 -delete
    
    echo "Database backup completed: $BACKUP_DIR/db_backup_$DATE.sql"
else
    echo "Database container not running, skipping backup"
fi
EOF

chmod +x /opt/ai-agents/scripts/backup.sh

# Add backup to crontab
(crontab -l 2>/dev/null; echo "0 2 * * * /opt/ai-agents/scripts/backup.sh") | crontab -

# Create health check script
cat > /opt/ai-agents/scripts/health-check.sh << 'EOF'
#!/bin/bash

# Health check script for AI Agents Romania

echo "=== AI Agents Romania Health Check ==="
echo "Timestamp: $(date)"
echo

# Check containers
echo "=== Container Status ==="
docker-compose -f /opt/ai-agents/docker-compose.yml ps

echo
echo "=== Health Checks ==="

# Frontend health check
echo -n "Frontend: "
if curl -f -s https://ai-agents-romania.com/health > /dev/null 2>&1; then
    echo "✅ Healthy"
else
    echo "❌ Failed"
fi

# Backend health check
echo -n "Backend: "
if curl -f -s https://api.ai-agents-romania.com/health > /dev/null 2>&1; then
    echo "✅ Healthy"
else
    echo "❌ Failed"
fi

# SSL certificates
echo
echo "=== SSL Certificates ==="
certbot certificates

echo
echo "=== Disk Usage ==="
df -h

echo
echo "=== Docker System Info ==="
docker system df
EOF

chmod +x /opt/ai-agents/scripts/health-check.sh

# Create update script
cat > /opt/ai-agents/scripts/update.sh << 'EOF'
#!/bin/bash

# Update script for AI Agents Romania

echo "Updating AI Agents Romania..."

cd /opt/ai-agents

# Pull latest code
git pull origin main

# Rebuild and restart containers
docker-compose down
docker-compose up -d --build

echo "Update completed!"
EOF

chmod +x /opt/ai-agents/scripts/update.sh

log_success "Production environment setup completed!"
log_info ""
log_info "Next steps:"
log_info "1. Configure DNS A records for your domains:"
log_info "   - ai-agents-romania.com → 168.231.107.89"
log_info "   - www.ai-agents-romania.com → 168.231.107.89"
log_info "   - api.ai-agents-romania.com → 168.231.107.89"
log_info ""
log_info "2. Edit environment configuration:"
log_info "   nano /opt/ai-agents/.env.prod"
log_info ""
log_info "3. Set up SSL certificates:"
log_info "   sudo certbot --nginx -d ai-agents-romania.com -d www.ai-agents-romania.com"
log_info "   sudo certbot --nginx -d api.ai-agents-romania.com"
log_info ""
log_info "4. Deploy the application:"
log_info "   cd /opt/ai-agents && sudo ./scripts/deploy.sh"
log_info ""
log_info "Available scripts:"
log_info "   - ./scripts/deploy.sh        - Deploy application"
log_info "   - ./scripts/health-check.sh  - Check system health"
log_info "   - ./scripts/backup.sh        - Manual backup"
log_info "   - ./scripts/update.sh        - Update application"
log_info ""
log_success "Setup completed successfully!"