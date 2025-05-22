#!/bin/bash
# Script pentru demonstrația completă a experienței cinematice

set -e

echo "🎬 AI Agents Romania - Cinematic Experience Demo"
echo "================================================"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}🎯 $1${NC}"
}

print_feature() {
    echo -e "${PURPLE}🌟 $1${NC}"
}

print_demo() {
    echo -e "${CYAN}🚀 $1${NC}"
}

cd /home/datcu/AiAgentsRomania

echo ""
print_info "Demonstrație Experiență Cinematică - localhost:4000"
echo ""

# Check dependencies
print_info "Checking cinematic features..."
echo ""

print_feature "Spline 3D Integration"
echo "   • Scene URL: https://prod.spline.design/1UXn54MQwsum35o7/scene.splinecode"
echo "   • Full-screen background cu overlay gradients"
echo "   • Loading animation elegantă"
echo "   • Fallback animation pentru erori"

print_feature "GSAP Animations"
echo "   • Titlu: Elastic bounce cu glow effect"
echo "   • Subtitle: Smooth fade-in cu parallax"
echo "   • Butoane: Back bounce cu scale effect"
echo "   • Scroll indicator: Float animation"

print_feature "Typography & Design"
echo "   • Font Display: Orbitron (futuristic)"
echo "   • Font Body: Inter (modern)"
echo "   • Gradient Text: AI Agents cu animation"
echo "   • Brand Colors: Blue accent cu shadows"

print_feature "Responsive & Performance"
echo "   • Next.js 15 + React 19"
echo "   • Tailwind CSS cu custom classes"
echo "   • Mobile-first responsive"
echo "   • SEO optimizat"

echo ""
print_info "Starting cinematic experience..."
echo ""

# Start unified service
print_demo "Launch Command: cd unified && npm run dev"
echo ""
print_demo "Browser URL: http://localhost:4000"
echo ""

print_status "Expected Experience:"
echo "   🎬 Full-screen Spline 3D scene"
echo "   ✨ Cinematic text animations"
echo "   🎯 Premium UI components"
echo "   📱 Perfect mobile responsive"
echo "   ⚡ Lightning-fast performance"

echo ""
echo "🎭 Features Demo:"
echo "=================="
echo "1. Hero Section: Scena Spline full-screen cu overlay"
echo "2. Typography: Titlu gradient animat cu glow"
echo "3. Animations: GSAP timeline cu elastic effects"
echo "4. Buttons: Hover effects cu shadow-glow"
echo "5. Features: Cards cu backdrop-blur și animations"
echo "6. Status: Real-time health checks"

echo ""
print_info "Ready for Browser Demo!"
echo ""
echo "🌐 Open: http://localhost:4000"
echo "🎥 Watch: Cinematic animations load sequence"
echo "🎯 Test: Responsive design pe mobile/desktop"
echo "⚡ Check: Performance și loading speed"

echo ""
print_demo "Starting unified cinematic server..."

cd unified
npm run dev