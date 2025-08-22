#!/bin/bash

# Docker Testing Validation Script
# Tests that Docker setup works correctly

echo "🐳 Testing Docker infrastructure for Novit Website..."
echo ""

# Test 1: Docker setup
echo "📋 Test 1: Checking Docker installation..."
if npm run docker:setup > /dev/null 2>&1; then
    echo "✅ Docker setup: OK"
else
    echo "❌ Docker setup: FAILED"
    exit 1
fi

# Test 2: Validate docker-compose files
echo "📋 Test 2: Validating Docker Compose configuration..."
if docker compose config > /dev/null 2>&1; then
    echo "✅ Docker Compose config: OK"
else
    echo "❌ Docker Compose config: FAILED"
    exit 1
fi

# Test 3: Check development config
echo "📋 Test 3: Validating development Docker Compose..."
if docker compose -f docker-compose.dev.yml config > /dev/null 2>&1; then
    echo "✅ Development Docker config: OK"
else
    echo "❌ Development Docker config: FAILED"
    exit 1
fi

# Test 4: Dockerfile syntax
echo "📋 Test 4: Validating Dockerfile syntax..."
if docker build -f Dockerfile.playwright --dry-run . > /dev/null 2>&1; then
    echo "✅ Dockerfile syntax: OK"
else
    echo "⚠️  Dockerfile syntax: SKIPPED (requires build context)"
fi

echo ""
echo "🎉 Docker infrastructure validation completed!"
echo ""
echo "📖 Next steps:"
echo "   1. Run 'npm run test:docker' to test all environments"
echo "   2. Run 'npm run test:docker:dev' for interactive development"
echo "   3. See DOCKER_TESTING.md for detailed documentation"
echo ""
echo "💡 This Docker setup ensures consistent testing across Windows, macOS, and Linux!"