const fs = require('fs');
const path = require('path');

console.log('🔧 Post-processing static export for GitHub Pages...');

// Check if we're building for GitHub Pages
if (process.env.NODE_ENV === 'production' && process.env.DEPLOY_TARGET === 'github-pages') {
  console.log('📁 Reorganizing files for GitHub Pages basePath...');
  
  const outDir = path.join(process.cwd(), 'out');
  const webNovitDir = path.join(outDir, 'web-novit');
  
  // Create web-novit directory if it doesn't exist
  if (!fs.existsSync(webNovitDir)) {
    fs.mkdirSync(webNovitDir, { recursive: true });
  }
  
  // Function to move directory if it exists
  function moveDirectory(from, to, description) {
    const fromPath = path.join(outDir, from);
    const toPath = path.join(outDir, to);
    
    if (fs.existsSync(fromPath)) {
      // Create parent directory if it doesn't exist
      const parentDir = path.dirname(toPath);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }
      
      // Move the directory
      fs.renameSync(fromPath, toPath);
      console.log(`✅ Moved ${description}`);
    }
  }
  
  // Move locale directories to web-novit/
  moveDirectory('es', 'web-novit/es', '/es/ → /web-novit/es/');
  moveDirectory('en', 'web-novit/en', '/en/ → /web-novit/en/');
  moveDirectory('pt', 'web-novit/pt', '/pt/ → /web-novit/pt/');
  
  // Move _next directory to web-novit/_next
  moveDirectory('_next', 'web-novit/_next', '/_next/ → /web-novit/_next/');
  
  // Move images directory to web-novit/images
  moveDirectory('images', 'web-novit/images', '/images/ → /web-novit/images/');
  
  // Move logos directory to web-novit/logos
  moveDirectory('logos', 'web-novit/logos', '/logos/ → /web-novit/logos/');
  
  // Move video directory to web-novit/video
  moveDirectory('video', 'web-novit/video', '/video/ → /web-novit/video/');
  
  // Keep root files at root for GitHub Pages
  console.log('✅ Root files maintained for GitHub Pages compatibility');
  
  console.log('🎉 GitHub Pages structure ready!');
} else {
  console.log('⏭️  Skipping GitHub Pages post-processing (not building for GitHub Pages)');
}
