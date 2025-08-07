# Novit Software Website - GitHub Copilot Instructions

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Prerequisites and Environment Setup
- **Node.js version**: v20.19.4+ (validated working version)
- **npm version**: 10.8.2+ (validated working version)
- **NEVER CANCEL**: Build processes may take 30+ seconds, test processes may take 5+ minutes. Always use timeout 180+ seconds for builds, 300+ seconds for longer operations.

### Essential Commands (ALL VALIDATED)
1. **Install dependencies**: `npm install` -- takes 1-2 minutes. NEVER CANCEL. Set timeout to 300+ seconds.
2. **Development server**: `npm run dev` -- starts in ~2 seconds with Turbopack. Always accessible at http://localhost:3000
3. **Build for production**: `npm run build` -- takes 20-30 seconds. NEVER CANCEL. Set timeout to 180+ seconds.
4. **Linting**: `npm run lint` -- takes 3-5 seconds. Returns warnings for TypeScript any types (expected).
5. **Serve built site with locale testing**: `npm run serve` -- builds first, then serves at http://localhost:8000

### Critical Build Information
- **Build time**: 20-30 seconds (much faster than typical Next.js builds)
- **Build output**: Static export to `out/` directory
- **Build warnings**: TypeScript warnings for `@typescript-eslint/no-explicit-any` are expected and non-blocking
- **Locale structure**: Builds separate directories for `/es/`, `/en/`, `/pt/` locales

### Locale and Internationalization Testing
- **Test all locales**: Use `npm run serve` which provides specific URLs:
  - Root (auto-detect): http://localhost:8000
  - 🇪🇸 Spanish: http://localhost:8000/es/
  - 🇺🇸 English: http://localhost:8000/en/
  - 🇵🇹 Portuguese: http://localhost:8000/pt/
- **Language switching**: Click the language selector in the header to test dynamic language switching
- **Translation files**: Located in `/src/locales/` (es.json, en.json, pt.json)

## Validation Scenarios

### Always Test After Making Changes
1. **Build validation**: Run `npm run build` and ensure it completes without errors
2. **Development server**: Start `npm run dev` and verify http://localhost:3000 loads
3. **Locale switching**: Click language switcher and verify content changes (Spanish "La software factory que necesitás" vs English "The software factory you need")
4. **Navigation**: Verify all header navigation links are functional
5. **Premium quote functionality**: Click "⚡ Premium Quote in 24h" / "⚡ Cotización Premium en 24hs" button to test modal
6. **Responsive design**: Test both desktop and mobile views

### Manual Validation Requirements
- **CRITICAL**: After any changes, always test the complete user journey: homepage load → language switching → navigation → key interactions
- **Visual validation**: Take screenshots to verify UI changes work correctly
- **Locale validation**: Test at least Spanish and English locales for any content changes

## Environment Configuration

### Required for Premium Quote Feature
The premium quote functionality requires additional setup:
- **OpenAI API Key**: Required in `.env.local` as `OPENAI_API_KEY=sk-proj-...`
- **Email Configuration**: SMTP settings in `.env.local`:
  ```bash
  SMTP_HOST=smtp.gmail.com
  SMTP_PORT=587
  SMTP_USER=your-email@gmail.com
  SMTP_PASSWORD=your-app-password
  ```
- **Configuration check**: Visit http://localhost:3000/api/check-config during development
- **Note**: App functions fully without these environment variables, but premium quote will show errors

### NOT Required for Basic Development
- No database setup needed
- No additional server dependencies
- No Docker or containerization required

## Technology Stack and Architecture

### Core Technologies
- **Next.js 15**: App Router with static export (`output: 'export'`)
- **TypeScript**: Strict mode enabled
- **Tailwind CSS**: Custom configuration with NOVIT brand colors
- **next-intl**: Internationalization (Spanish, English, Portuguese)
- **GSAP**: Advanced animations
- **Framer Motion**: UI transitions
- **Turbopack**: Development bundler (faster than webpack)

### Project Structure
```
src/
├── app/                    # Next.js 15 App Router
│   ├── [locale]/          # Internationalized routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Homepage redirect
├── components/
│   ├── layout/           # Header, Footer
│   ├── sections/         # Hero, Services, CasesGrid
│   └── ui/              # FloatingCTA, LanguageSwitcher, PremiumQuoteModal
├── locales/             # Translation files (es.json, en.json, pt.json)
├── hooks/               # Custom React hooks
├── types/               # TypeScript definitions
├── utils/               # Utility functions
└── config/              # Configuration constants
```

### Key Configuration Files
- **next.config.ts**: Static export, GitHub Pages deployment, next-intl setup
- **tailwind.config.ts**: Custom NOVIT brand colors and animations
- **tsconfig.json**: TypeScript configuration with path mapping
- **eslint.config.mjs**: ESLint rules for Next.js and TypeScript

## Common Development Tasks

### Adding New Content
1. **Always add translations**: For any new text, add entries to all locale files (`es.json`, `en.json`, `pt.json`)
2. **Markdown files also need translations**: When creating or modifying user-facing markdown files (README, CONTRIBUTING, documentation), create localized versions (e.g., `README_en.md`, `README_pt.md`) or update existing localized versions
3. **Senior translator approach**: Do NOT make literal translations. Act as a Senior translator finding the most appropriate words and phrases that convey the intended meaning naturally in each target language while maintaining professional tone
4. **Use translation keys**: Reference translations with `t('key')` in components  
5. **Test all locales**: Verify new content appears correctly in all languages, including any markdown documentation changes

### Translation Guidelines
- **Quality over speed**: Take time to find the most appropriate terminology for each language
- **Context matters**: Consider the business context when translating technical terms
- **Maintain consistency**: Use established terminology patterns within the codebase
- **Professional tone**: Maintain the company's professional voice across all languages
- **Cultural adaptation**: Adapt content culturally when needed, not just linguistically
- **JSON translations**: For component text in `/src/locales/` files
- **Markdown translations**: For documentation files, create separate localized files (e.g., `_en.md`, `_pt.md` suffixes)

### Making UI Changes
1. **Tailwind classes**: Use existing custom classes from `tailwind.config.ts`
2. **Brand colors**: Use `primary-500` (#0A089B), `secondary-500`, `accent-cyan`
3. **Animations**: Leverage existing GSAP animations in `/src/hooks/useAnimations.ts`
4. **Test responsiveness**: Verify mobile and desktop layouts

### Build and Deployment
- **GitHub Actions**: Automated deployment to GitHub Pages via `.github/workflows/nextjs.yml`
- **Static export**: Build generates static files in `out/` directory
- **Base path**: Configured for GitHub Pages deployment with `/web-novit` prefix
- **Asset optimization**: Images use `unoptimized: true` for static export compatibility

## Troubleshooting

### Common Issues and Solutions
- **Hydration warnings**: Expected in development, related to server-client mismatch in dynamic content
- **Resource 404 errors**: Normal in development for HMR chunks
- **TypeScript warnings**: `@typescript-eslint/no-explicit-any` warnings are expected in animation files
- **Build hanging**: NEVER happens - builds complete in 20-30 seconds
- **npm audit vulnerabilities**: 3 low severity vulnerabilities are known and non-blocking

### Performance Expectations
- **Development server startup**: 1-2 seconds with Turbopack
- **Build time**: 20-30 seconds (static export is fast)
- **Hot reload**: Near-instant with Turbopack
- **Bundle size**: ~172kB for main locale pages, ~100kB shared chunks

## Critical Reminders
- **NEVER CANCEL** any build or test command - they complete quickly (20-30 seconds max)
- **Always test internationalization** - this is a multilingual site
- **Use timeout 180+ seconds** for build commands to be safe
- **Validate manually** - run through user scenarios after changes
- **Screenshot UI changes** - visual validation is critical for this design-focused site