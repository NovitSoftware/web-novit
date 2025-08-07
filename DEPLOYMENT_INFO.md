# Deployment Information

## GitHub Pages URLs

After deployment, the website is available at the following URLs:

### Main Site
- **Root (auto-detect language)**: https://novitsoftware.github.io/web-novit/
- **Spanish**: https://novitsoftware.github.io/web-novit/es/
- **English**: https://novitsoftware.github.io/web-novit/en/
- **Portuguese**: https://novitsoftware.github.io/web-novit/pt/

### Important Notes

1. **Base Path Required**: GitHub Pages for project repositories requires the repository name (`/web-novit`) as a base path.

2. **Automatic Language Detection**: The root URL (`/web-novit/`) automatically detects the browser language and redirects to the appropriate locale.

3. **Language Switching**: Users can switch languages using the language selector in the header.

4. **Wrong URLs**: Do not use URLs like `https://novitsoftware.github.io/pt/` - these will result in 404 errors.

## Build Configuration

The site is configured to automatically use the correct base path when deployed to GitHub Pages through environment variables in the GitHub Actions workflow.

## Local Development

For local development, use:
```bash
npm run dev
```
The site will be available at `http://localhost:3000` without the base path.