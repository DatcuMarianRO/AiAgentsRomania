#!/bin/bash

# AI Agents Romania - Health Check Script
# Usage: ./scripts/health-check.sh [--detailed] [--json]

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
PROJECT_DIR="/opt/ai-agents"
DETAILED=false
JSON_OUTPUT=false

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --detailed)
            DETAILED=true
            shift
            ;;
        --json)
            JSON_OUTPUT=true
            shift
            ;;
        -h|--help)
            echo "AI Agents Romania - Health Check Script"
            echo ""
            echo "Usage: $0 [options]"
            echo ""
            echo "Options:"
            echo "  --detailed    Show detailed information"
            echo "  --json        Output in JSON format"
            echo "  -h, --help    Show this help message"
            echo ""
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Functions
log_info() {
    if [[ "$JSON_OUTPUT" == false ]]; then
        echo -e "${BLUE}[INFO]${NC} $1"
    fi
}

log_success() {
    if [[ "$JSON_OUTPUT" == false ]]; then
        echo -e "${GREEN}[SUCCESS]${NC} $1"
    fi
}

log_warning() {
    if [[ "$JSON_OUTPUT" == false ]]; then
        echo -e "${YELLOW}[WARNING]${NC} $1"
    fi
}

log_error() {
    if [[ "$JSON_OUTPUT" == false ]]; then
        echo -e "${RED}[ERROR]${NC} $1"
    fi
}

# Health check functions
check_containers() {
    local status="healthy"
    local details=()
    
    cd "$PROJECT_DIR"
    
    # Check if containers are running
    local containers=("ai-agents-db" "ai-agents-redis" "ai-agents-backend" "ai-agents-frontend" "ai-agents-nginx")
    
    for container in "${containers[@]}"; do
        if docker ps --format "table {{.Names}}" | grep -q "$container"; then
            local health=$(docker inspect --format='{{.State.Health.Status}}' "$container" 2>/dev/null || echo "no-healthcheck")
            if [[ "$health" == "healthy" ]] || [[ "$health" == "no-healthcheck" ]]; then
                details+=("$container: running")
            else
                details+=("$container: unhealthy")
                status="unhealthy"
            fi
        else
            details+=("$container: not running")
            status="unhealthy"
        fi
    done
    
    echo "$status|${details[*]}"
}

check_endpoints() {
    local status="healthy"
    local details=()
    
    # Check frontend
    if curl -f -s -o /dev/null -w "%{http_code}" https://ai-agents-romania.com/health | grep -q "200"; then
        details+=("frontend: accessible")
    else
        details+=("frontend: not accessible")
        status="unhealthy"
    fi
    
    # Check backend API
    if curl -f -s -o /dev/null -w "%{http_code}" https://api.ai-agents-romania.com/health | grep -q "200"; then
        details+=("backend: accessible")
    else
        details+=("backend: not accessible")
        status="unhealthy"
    fi
    
    # Check API documentation
    if curl -f -s -o /dev/null -w "%{http_code}" https://api.ai-agents-romania.com/docs | grep -q "200"; then
        details+=("api-docs: accessible")
    else
        details+=("api-docs: not accessible")
        status="warning"
    fi
    
    echo "$status|${details[*]}"
}

check_ssl_certificates() {
    local status="healthy"
    local details=()
    
    # Check main domain certificate
    local main_cert_days=$(( $(date -d "$(openssl s_client -connect ai-agents-romania.com:443 -servername ai-agents-romania.com < /dev/null 2>/dev/null | openssl x509 -noout -enddate | cut -d= -f2)" +%s) - $(date +%s) ))
    main_cert_days=$((main_cert_days / 86400))
    
    if [[ $main_cert_days -gt 30 ]]; then
        details+=("main-domain: ${main_cert_days} days remaining")
    elif [[ $main_cert_days -gt 7 ]]; then
        details+=("main-domain: ${main_cert_days} days remaining (warning)")
        status="warning"
    else
        details+=("main-domain: ${main_cert_days} days remaining (critical)")
        status="critical"
    fi
    
    # Check API domain certificate
    local api_cert_days=$(( $(date -d "$(openssl s_client -connect api.ai-agents-romania.com:443 -servername api.ai-agents-romania.com < /dev/null 2>/dev/null | openssl x509 -noout -enddate | cut -d= -f2)" +%s) - $(date +%s) ))
    api_cert_days=$((api_cert_days / 86400))
    
    if [[ $api_cert_days -gt 30 ]]; then
        details+=("api-domain: ${api_cert_days} days remaining")
    elif [[ $api_cert_days -gt 7 ]]; then
        details+=("api-domain: ${api_cert_days} days remaining (warning)")
        [[ "$status" != "critical" ]] && status="warning"
    else
        details+=("api-domain: ${api_cert_days} days remaining (critical)")
        status="critical"
    fi
    
    echo "$status|${details[*]}"
}

check_disk_space() {
    local status="healthy"
    local details=()
    
    # Check root filesystem
    local root_usage=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
    if [[ $root_usage -lt 80 ]]; then
        details+=("root: ${root_usage}% used")
    elif [[ $root_usage -lt 90 ]]; then
        details+=("root: ${root_usage}% used (warning)")
        status="warning"
    else
        details+=("root: ${root_usage}% used (critical)")
        status="critical"
    fi
    
    # Check Docker space
    local docker_usage=$(docker system df --format "table {{.Type}}\t{{.Size}}\t{{.Reclaimable}}" | grep -E "Images|Containers|Local Volumes" | awk '{sum+=$2} END {print sum}')
    details+=("docker: $(docker system df --format 'table {{.TotalCount}}\t{{.Size}}' | tail -n 1)")
    
    echo "$status|${details[*]}"
}

check_memory_usage() {
    local status="healthy"
    local details=()
    
    # Check system memory
    local mem_info=$(free | grep Mem)
    local total_mem=$(echo $mem_info | awk '{print $2}')
    local used_mem=$(echo $mem_info | awk '{print $3}')
    local mem_percentage=$((used_mem * 100 / total_mem))
    
    if [[ $mem_percentage -lt 80 ]]; then
        details+=("system: ${mem_percentage}% used")
    elif [[ $mem_percentage -lt 90 ]]; then
        details+=("system: ${mem_percentage}% used (warning)")
        status="warning"
    else
        details+=("system: ${mem_percentage}% used (critical)")
        status="critical"
    fi
    
    echo "$status|${details[*]}"
}

check_database_connection() {
    local status="healthy"
    local details=()
    
    # Check database connectivity
    if docker-compose -f "$PROJECT_DIR/docker-compose.yml" exec -T db pg_isready -U aiagents -d ai_agents_romania > /dev/null 2>&1; then
        details+=("postgresql: connected")
        
        # Check database size if detailed mode
        if [[ "$DETAILED" == true ]]; then
            local db_size=$(docker-compose -f "$PROJECT_DIR/docker-compose.yml" exec -T db psql -U aiagents -d ai_agents_romania -t -c "SELECT pg_size_pretty(pg_database_size('ai_agents_romania'));" 2>/dev/null | xargs)
            details+=("database-size: $db_size")
        fi
    else
        details+=("postgresql: connection failed")
        status="unhealthy"
    fi
    
    # Check Redis connectivity
    if docker-compose -f "$PROJECT_DIR/docker-compose.yml" exec -T redis redis-cli ping > /dev/null 2>&1; then
        details+=("redis: connected")
    else
        details+=("redis: connection failed")
        status="unhealthy"
    fi
    
    echo "$status|${details[*]}"
}

# Main health check
main() {
    local overall_status="healthy"
    local timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    
    if [[ "$JSON_OUTPUT" == false ]]; then
        echo "=== AI Agents Romania Health Check ==="
        echo "Timestamp: $timestamp"
        echo ""
    fi
    
    # Perform checks
    local containers_result=$(check_containers)
    local containers_status=$(echo "$containers_result" | cut -d'|' -f1)
    local containers_details=$(echo "$containers_result" | cut -d'|' -f2)
    
    local endpoints_result=$(check_endpoints)
    local endpoints_status=$(echo "$endpoints_result" | cut -d'|' -f1)
    local endpoints_details=$(echo "$endpoints_result" | cut -d'|' -f2)
    
    local ssl_result=$(check_ssl_certificates)
    local ssl_status=$(echo "$ssl_result" | cut -d'|' -f1)
    local ssl_details=$(echo "$ssl_result" | cut -d'|' -f2)
    
    local disk_result=$(check_disk_space)
    local disk_status=$(echo "$disk_result" | cut -d'|' -f1)
    local disk_details=$(echo "$disk_result" | cut -d'|' -f2)
    
    local memory_result=$(check_memory_usage)
    local memory_status=$(echo "$memory_result" | cut -d'|' -f1)
    local memory_details=$(echo "$memory_result" | cut -d'|' -f2)
    
    local database_result=$(check_database_connection)
    local database_status=$(echo "$database_result" | cut -d'|' -f1)
    local database_details=$(echo "$database_result" | cut -d'|' -f2)
    
    # Determine overall status
    for status in "$containers_status" "$endpoints_status" "$ssl_status" "$disk_status" "$memory_status" "$database_status"; do
        if [[ "$status" == "critical" ]] || [[ "$status" == "unhealthy" ]]; then
            overall_status="unhealthy"
            break
        elif [[ "$status" == "warning" ]] && [[ "$overall_status" != "unhealthy" ]]; then
            overall_status="warning"
        fi
    done
    
    if [[ "$JSON_OUTPUT" == true ]]; then
        # JSON output
        cat << EOF
{
  "timestamp": "$timestamp",
  "overall_status": "$overall_status",
  "checks": {
    "containers": {
      "status": "$containers_status",
      "details": "$containers_details"
    },
    "endpoints": {
      "status": "$endpoints_status",
      "details": "$endpoints_details"
    },
    "ssl_certificates": {
      "status": "$ssl_status",
      "details": "$ssl_details"
    },
    "disk_space": {
      "status": "$disk_status",
      "details": "$disk_details"
    },
    "memory": {
      "status": "$memory_status",
      "details": "$memory_details"
    },
    "database": {
      "status": "$database_status",
      "details": "$database_details"
    }
  }
}
EOF
    else
        # Human readable output
        echo "=== Containers ==="
        echo "Status: $containers_status"
        echo "Details: $containers_details"
        echo ""
        
        echo "=== Endpoints ==="
        echo "Status: $endpoints_status"
        echo "Details: $endpoints_details"
        echo ""
        
        echo "=== SSL Certificates ==="
        echo "Status: $ssl_status"
        echo "Details: $ssl_details"
        echo ""
        
        echo "=== Disk Space ==="
        echo "Status: $disk_status"
        echo "Details: $disk_details"
        echo ""
        
        echo "=== Memory Usage ==="
        echo "Status: $memory_status"
        echo "Details: $memory_details"
        echo ""
        
        echo "=== Database ==="
        echo "Status: $database_status"
        echo "Details: $database_details"
        echo ""
        
        echo "=== Overall Status: $overall_status ==="
        
        if [[ "$DETAILED" == true ]]; then
            echo ""
            echo "=== Detailed Information ==="
            echo ""
            echo "Docker containers:"
            docker-compose -f "$PROJECT_DIR/docker-compose.yml" ps
            echo ""
            echo "System resources:"
            free -h
            echo ""
            df -h
            echo ""
            echo "Docker system usage:"
            docker system df
        fi
    fi
    
    # Exit with appropriate code
    case "$overall_status" in
        "healthy")
            exit 0
            ;;
        "warning")
            exit 1
            ;;
        "unhealthy"|"critical")
            exit 2
            ;;
    esac
}

# Run main function
main "$@"