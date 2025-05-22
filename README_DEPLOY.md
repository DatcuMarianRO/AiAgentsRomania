# AI Agents Romania - Production Deployment Guide

This guide provides complete instructions for deploying AI Agents Romania to production on your VPS.

## 🎯 Quick Start (One-Shot Deployment)

If you just want to get everything running quickly, follow these steps:

### Prerequisites
- Ubuntu 24.04 VPS with 4 CPU / 16 GB RAM / 200 GB SSD
- Root access to the server
- Domain DNS configured (see DNS Configuration section)

### One-Shot Deployment Commands

```bash
# 1. Connect to your VPS
ssh root@168.231.107.89

# 2. Run the complete setup
curl -fsSL https://raw.githubusercontent.com/DatcuMarianRO/AiAgentsRomania/main/scripts/setup-production.sh | bash

# 3. Configure environment variables
cd /opt/ai-agents
cp .env.example .env.prod
nano .env.prod  # Fill in your actual values

# 4. Deploy
sudo ./scripts/deploy.sh
```

That's it! Your application will be available at:
- **Frontend**: https://ai-agents-romania.com
- **API**: https://api.ai-agents-romania.com
- **API Docs**: https://api.ai-agents-romania.com/docs

---

## 📋 Detailed Step-by-Step Guide

### 1. DNS Configuration

Before starting, configure your DNS records:

```
# A Records - Point to your VPS IP (168.231.107.89)
ai-agents-romania.com       A    168.231.107.89
www.ai-agents-romania.com   A    168.231.107.89
api.ai-agents-romania.com   A    168.231.107.89

# Optional: CNAME for www
www.ai-agents-romania.com   CNAME    ai-agents-romania.com
```

### 2. Server Preparation

Connect to your VPS and prepare the environment:

```bash
# Connect to VPS
ssh root@168.231.107.89

# Update system
apt update && apt upgrade -y

# Install required packages
apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release

# Create project directory
mkdir -p /opt/ai-agents
cd /opt/ai-agents
```

### 3. Install Docker & Docker Compose

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Start and enable Docker
systemctl start docker
systemctl enable docker

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

### 4. Install Certbot for SSL

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Or using snap (alternative)
# snap install --classic certbot
# ln -s /snap/bin/certbot /usr/bin/certbot
```

### 5. Clone Repository

```bash
# Clone the repository
cd /opt
git clone https://github.com/DatcuMarianRO/AiAgentsRomania.git ai-agents
cd ai-agents

# Make scripts executable
chmod +x scripts/*.sh
```

### 6. Configure Environment

```bash
# Copy environment template
cp .env.example .env.prod

# Edit environment file
nano .env.prod
```

**Important**: Fill in all `TODO_` placeholders with your actual values:

```bash
# Generate strong passwords
openssl rand -base64 32  # For POSTGRES_PASSWORD
openssl rand -base64 32  # For REDIS_PASSWORD
openssl rand -base64 64  # For JWT_SECRET
openssl rand -base64 32  # For N8N_PASSWORD
```

### 7. Initial SSL Certificate Setup

```bash
# Create temporary nginx config for initial certificate
mkdir -p /tmp/nginx-temp
cat > /tmp/nginx-temp/default.conf << 'EOF'
server {
    listen 80;
    server_name ai-agents-romania.com www.ai-agents-romania.com api.ai-agents-romania.com;
    
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    location / {
        return 301 https://$server_name$request_uri;
    }
}
EOF

# Start temporary nginx
docker run -d --name temp-nginx \
  -p 80:80 \
  -v /tmp/nginx-temp:/etc/nginx/conf.d \
  -v /var/www/certbot:/var/www/certbot \
  nginx:alpine

# Obtain SSL certificates
mkdir -p /var/www/certbot

# Main domain certificate
certbot certonly --webroot \
  --webroot-path=/var/www/certbot \
  --email admin@ai-agents-romania.com \
  --agree-tos \
  --no-eff-email \
  -d ai-agents-romania.com \
  -d www.ai-agents-romania.com

# API subdomain certificate
certbot certonly --webroot \
  --webroot-path=/var/www/certbot \
  --email admin@ai-agents-romania.com \
  --agree-tos \
  --no-eff-email \
  -d api.ai-agents-romania.com

# Stop temporary nginx
docker stop temp-nginx
docker rm temp-nginx
```

### 8. Deploy Application

```bash
# Deploy the application
sudo ./scripts/deploy.sh

# Optional: Deploy with n8n automation
sudo ./scripts/deploy.sh --with-n8n

# Force rebuild all containers
sudo ./scripts/deploy.sh --force-rebuild
```

### 9. Verify Deployment

```bash
# Check container status
docker-compose ps

# Check logs
docker-compose logs -f

# Check individual service logs
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f db
docker-compose logs -f nginx

# Test endpoints
curl -I https://ai-agents-romania.com
curl -I https://api.ai-agents-romania.com/health
```

---

## 🔧 Post-Deployment Configuration

### 1. SSL Auto-Renewal

```bash
# Test certificate renewal
certbot renew --dry-run

# Set up automatic renewal (already configured if using the setup script)
crontab -e

# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet && docker-compose -f /opt/ai-agents/docker-compose.yml exec nginx nginx -s reload
```

### 2. Database Initialization

The database will be automatically initialized with the schema files. To manually initialize:

```bash
# Access database container
docker-compose exec db psql -U aiagents -d ai_agents_romania

# Run migrations if needed
docker-compose exec backend npm run init-db
```

### 3. Create Admin User

```bash
# Create an admin user for the backend
docker-compose exec backend node scripts/create-admin.js
```

### 4. Backup Configuration

```bash
# Create backup directory
mkdir -p /opt/backups/ai-agents

# Set up automated backups
cat > /opt/ai-agents/scripts/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/opt/backups/ai-agents"
DATE=$(date +%Y%m%d_%H%M%S)

# Database backup
docker exec ai-agents-db pg_dump -U aiagents -d ai_agents_romania > "$BACKUP_DIR/db_backup_$DATE.sql"

# Compress old backups
find "$BACKUP_DIR" -name "*.sql" -mtime +7 -exec gzip {} \;

# Remove backups older than 30 days
find "$BACKUP_DIR" -name "*.sql.gz" -mtime +30 -delete
EOF

chmod +x /opt/ai-agents/scripts/backup.sh

# Add to crontab
echo "0 2 * * * /opt/ai-agents/scripts/backup.sh" | crontab -
```

---

## 🔍 Monitoring & Maintenance

### Health Checks

```bash
# Check all services
curl https://ai-agents-romania.com/health
curl https://api.ai-agents-romania.com/health

# Check SSL certificates
certbot certificates

# Check container resources
docker stats

# Check disk usage
df -h
docker system df
```

### Log Management

```bash
# View live logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f nginx
docker-compose logs -f backend
docker-compose logs -f frontend

# Check nginx access logs
docker-compose exec nginx tail -f /var/log/nginx/access.log

# Check nginx error logs
docker-compose exec nginx tail -f /var/log/nginx/error.log
```

### Container Management

```bash
# Restart specific service
docker-compose restart backend

# Rebuild and restart service
docker-compose up -d --build backend

# Scale services (if needed)
docker-compose up -d --scale backend=2

# Update containers
docker-compose pull
docker-compose up -d
```

---

## 🔧 Troubleshooting

### Common Issues

#### 1. SSL Certificate Issues
```bash
# Check certificate status
certbot certificates

# Renew certificates manually
certbot renew --force-renewal

# Restart nginx after certificate renewal
docker-compose restart nginx
```

#### 2. Database Connection Issues
```bash
# Check database logs
docker-compose logs db

# Access database directly
docker-compose exec db psql -U aiagents -d ai_agents_romania

# Reset database (⚠️ Data loss!)
docker-compose down
docker volume rm ai-agents_postgres_data
docker-compose up -d
```

#### 3. Frontend Build Issues
```bash
# Rebuild frontend with logs
docker-compose build --no-cache frontend

# Check build logs
docker-compose logs frontend
```

#### 4. Backend API Issues
```bash
# Check backend logs
docker-compose logs backend

# Check environment variables
docker-compose exec backend env | grep -E "(NODE_ENV|DATABASE_URL|JWT_SECRET)"

# Restart backend
docker-compose restart backend
```

### Performance Optimization

#### 1. Nginx Optimization
```bash
# Edit nginx configuration
nano nginx/nginx.conf

# Test configuration
docker-compose exec nginx nginx -t

# Reload configuration
docker-compose exec nginx nginx -s reload
```

#### 2. Database Optimization
```bash
# Access database for optimization
docker-compose exec db psql -U aiagents -d ai_agents_romania

# Check database size
SELECT pg_size_pretty(pg_database_size('ai_agents_romania'));

# Vacuum and analyze
VACUUM ANALYZE;
```

#### 3. Docker Cleanup
```bash
# Remove unused images
docker image prune -f

# Remove unused volumes (⚠️ Be careful!)
docker volume prune -f

# Remove unused networks
docker network prune -f

# Complete cleanup
docker system prune -af
```

---

## 🚀 CI/CD with GitHub Actions

The repository includes a GitHub Actions workflow for automatic deployment. To enable:

1. Add repository secrets in GitHub:
   ```
   VPS_HOST=168.231.107.89
   VPS_USER=root
   VPS_SSH_KEY=<your_private_ssh_key>
   ```

2. The workflow will automatically deploy on push to `main` branch.

---

## 📞 Support

If you encounter issues:

1. Check the logs: `docker-compose logs -f`
2. Verify all environment variables are set correctly
3. Ensure DNS records are properly configured
4. Check SSL certificates: `certbot certificates`
5. Verify Docker and Docker Compose are properly installed

For additional support, create an issue in the GitHub repository.

---

## 🔒 Security Notes

- All secrets should be stored in `.env.prod` and never committed to version control
- SSL certificates are automatically renewed via certbot
- Regular security updates should be applied: `apt update && apt upgrade`
- Monitor logs for suspicious activity
- Consider implementing fail2ban for additional security
- Regular database backups are essential

---

## 📈 Scaling

For higher traffic, consider:

1. Load balancing with multiple backend containers
2. Redis cluster for session storage
3. CDN for static assets
4. Database read replicas
5. Horizontal scaling with Docker Swarm or Kubernetes

Example scaling:
```bash
# Scale backend to 3 instances
docker-compose up -d --scale backend=3

# Scale with load balancer
# (Requires nginx configuration update for upstream backends)
```