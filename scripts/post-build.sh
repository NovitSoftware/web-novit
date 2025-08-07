#!/bin/bash

# Post-build script to fix GitHub Pages basePath structure
# This script reorganizes the static export to work with GitHub Pages basePath

echo "🔧 Post-processing static export for GitHub Pages..."

# Check if we're building for GitHub Pages
if [ "$NODE_ENV" = "production" ] && [ "$DEPLOY_TARGET" = "github-pages" ]; then
  echo "📁 Reorganizing files for GitHub Pages basePath..."
  
  cd out
  
  # Create web-novit directory if it doesn't exist
  mkdir -p web-novit
  
  # Move locale directories to web-novit/
  if [ -d "es" ]; then
    mv es web-novit/es
    echo "✅ Moved /es/ to /web-novit/es/"
  fi
  
  if [ -d "en" ]; then
    mv en web-novit/en
    echo "✅ Moved /en/ to /web-novit/en/"
  fi
  
  if [ -d "pt" ]; then
    mv pt web-novit/pt
    echo "✅ Moved /pt/ to /web-novit/pt/"
  fi
  
  # Move _next directory to web-novit/_next
  if [ -d "_next" ]; then
    mv _next web-novit/_next
    echo "✅ Moved /_next/ to /web-novit/_next/"
  fi
  
  # Move images directory to web-novit/images
  if [ -d "images" ]; then
    mv images web-novit/images
    echo "✅ Moved /images/ to /web-novit/images/"
  fi
  
  # Move logos directory to web-novit/logos
  if [ -d "logos" ]; then
    mv logos web-novit/logos
    echo "✅ Moved /logos/ to /web-novit/logos/"
  fi
  
  # Keep root files at root for GitHub Pages
  echo "✅ Root files maintained for GitHub Pages compatibility"
  
  echo "🎉 GitHub Pages structure ready!"
else
  echo "⏭️  Skipping GitHub Pages post-processing (not building for GitHub Pages)"
fi