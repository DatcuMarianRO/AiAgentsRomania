#!/bin/bash

# AI Agents Romania - Production Deployment Script
# Usage: ./scripts/deploy.sh [--with-n8n] [--force-rebuild]

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_DIR="/opt/ai-agents"
COMPOSE_FILE="docker-compose.yml"
ENV_FILE=".env.prod"
BACKUP_DIR="/opt/backups/ai-agents"

# Flags
WITH_N8N=false
FORCE_REBUILD=false

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --with-n8n)
            WITH_N8N=true
            shift
            ;;
        --force-rebuild)
            FORCE_REBUILD=true
            shift
            ;;
        -h|--help)
            echo -e "${BLUE}AI Agents Romania - Deployment Script${NC}"
            echo ""
            echo "Usage: $0 [options]"
            echo ""
            echo "Options:"
            echo "  --with-n8n        Enable n8n automation service"
            echo "  --force-rebuild   Force rebuild all containers"
            echo "  -h, --help        Show this help message"
            echo ""
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            exit 1
            ;;
    esac
done

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check if running as root or with sudo
    if [[ $EUID -ne 0 ]]; then
        log_error "This script must be run as root or with sudo"
        exit 1
    fi
    
    # Check if Docker is installed
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    # Check if Docker Compose is installed
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    # Check if project directory exists
    if [[ ! -d "$PROJECT_DIR" ]]; then
        log_error "Project directory $PROJECT_DIR not found. Please clone the repository first."
        exit 1
    fi
    
    # Check if .env.prod exists
    if [[ ! -f "$PROJECT_DIR/$ENV_FILE" ]]; then
        log_error "Environment file $PROJECT_DIR/$ENV_FILE not found. Please create it from .env.example"
        exit 1
    fi
    
    log_success "Prerequisites check passed"
}

backup_database() {
    log_info "Creating database backup..."
    
    mkdir -p "$BACKUP_DIR"
    
    # Create backup filename with timestamp
    BACKUP_FILE="$BACKUP_DIR/backup_$(date +%Y%m%d_%H%M%S).sql"
    
    # Only backup if database container is running
    if docker ps | grep -q "ai-agents-db"; then
        docker exec ai-agents-db pg_dump -U "${POSTGRES_USER:-aiagents}" -d "${POSTGRES_DB:-ai_agents_romania}" > "$BACKUP_FILE"
        log_success "Database backup created: $BACKUP_FILE"
    else
        log_warning "Database container not running, skipping backup"
    fi
}

pull_latest_code() {
    log_info "Pulling latest code from repository..."
    
    cd "$PROJECT_DIR"
    
    # Save current branch
    CURRENT_BRANCH=$(git branch --show-current)
    
    # Fetch latest changes
    git fetch origin
    
    # Pull latest changes
    git pull origin "$CURRENT_BRANCH"
    
    log_success "Code updated successfully"
}

setup_ssl_certificates() {
    log_info "Setting up SSL certificates..."
    
    # Create directories for SSL certificates
    mkdir -p "$PROJECT_DIR/nginx/ssl"
    
    # Check if certificates exist
    if [[ ! -f "/etc/letsencrypt/live/ai-agents-romania.com/fullchain.pem" ]]; then
        log_warning "SSL certificates not found. Please run SSL setup first:"
        log_warning "sudo certbot --nginx -d ai-agents-romania.com -d www.ai-agents-romania.com"
        log_warning "sudo certbot --nginx -d api.ai-agents-romania.com"
    else
        log_success "SSL certificates found"
    fi
}

build_and_deploy() {
    log_info "Building and deploying containers..."
    
    cd "$PROJECT_DIR"
    
    # Build arguments for force rebuild
    BUILD_ARGS=""
    if [[ "$FORCE_REBUILD" == true ]]; then
        BUILD_ARGS="--no-cache --force-recreate"
        log_info "Force rebuild enabled"
    fi
    
    # Compose profiles for n8n
    COMPOSE_PROFILES=""
    if [[ "$WITH_N8N" == true ]]; then
        COMPOSE_PROFILES="--profile n8n"
        log_info "n8n service will be enabled"
    fi
    
    # Stop existing containers
    log_info "Stopping existing containers..."
    docker-compose down
    
    # Build and start containers
    log_info "Building and starting containers..."
    docker-compose --env-file "$ENV_FILE" $COMPOSE_PROFILES up -d --build $BUILD_ARGS
    
    # Wait for services to be ready
    log_info "Waiting for services to start..."
    sleep 30
    
    log_success "Containers deployed successfully"
}

verify_deployment() {
    log_info "Verifying deployment..."
    
    # Check container status
    log_info "Checking container status..."
    docker-compose ps
    
    # Health check for backend
    log_info "Checking backend health..."
    for i in {1..30}; do
        if curl -f -s http://localhost:1337/health > /dev/null 2>&1; then
            log_success "Backend is healthy"
            break
        fi
        if [[ $i -eq 30 ]]; then
            log_error "Backend health check failed"
            return 1
        fi
        sleep 2
    done
    
    # Health check for frontend
    log_info "Checking frontend health..."
    for i in {1..30}; do
        if curl -f -s http://localhost:3000/health > /dev/null 2>&1; then
            log_success "Frontend is healthy"
            break
        fi
        if [[ $i -eq 30 ]]; then
            log_error "Frontend health check failed"
            return 1
        fi
        sleep 2
    done
    
    # Check SSL certificates
    log_info "Checking SSL certificates..."
    if command -v certbot &> /dev/null; then
        certbot certificates
    fi
    
    log_success "Deployment verification completed"
}

cleanup_old_images() {
    log_info "Cleaning up old Docker images..."
    
    # Remove unused images
    docker image prune -f
    
    # Remove unused volumes (be careful with this)
    # docker volume prune -f
    
    log_success "Docker cleanup completed"
}

main() {
    log_info "Starting AI Agents Romania deployment..."
    log_info "Timestamp: $(date)"
    
    check_prerequisites
    backup_database
    pull_latest_code
    setup_ssl_certificates
    build_and_deploy
    verify_deployment
    cleanup_old_images
    
    log_success "Deployment completed successfully!"
    log_info "Services:"
    log_info "  - Frontend: https://ai-agents-romania.com"
    log_info "  - API: https://api.ai-agents-romania.com"
    log_info "  - API Docs: https://api.ai-agents-romania.com/docs"
    
    if [[ "$WITH_N8N" == true ]]; then
        log_info "  - n8n: https://api.ai-agents-romania.com/n8n"
    fi
    
    log_info ""
    log_info "To view logs: docker-compose logs -f [service_name]"
    log_info "To check status: docker-compose ps"
    log_info "To stop services: sudo docker-compose down"
}

# Run main function
main "$@"