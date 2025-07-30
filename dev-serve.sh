#!/bin/bash

# Script to build and serve the static export for testing locale routing
# This is needed because Next.js dev server doesn't properly handle dynamic routes with static exports

echo "🔨 Building static export..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "🌐 Starting static server on http://localhost:8000"
    echo ""
    echo "Test the locale routes:"
    echo "  📍 Root (auto-detect): http://localhost:8000"
    echo "  🇪🇸 Spanish: http://localhost:8000/es/"
    echo "  🇺🇸 English: http://localhost:8000/en/" 
    echo "  🏴󠁧󠁢󠁣󠁴󠁿 Catalan: http://localhost:8000/ca/"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    
    cd out && python3 -m http.server 8000
else
    echo "❌ Build failed!"
    exit 1
fi