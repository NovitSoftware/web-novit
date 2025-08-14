# 🚀 Novit Software - Sitio Web Oficial

## 📋 Descripción del Proyecto

Sitio web moderno y responsivo para Novit Software, desarrollado con Next.js 14, TypeScript y Tailwind CSS. Incluye animaciones avanzadas, optimización SEO y diseño mobile-first.

## 🎨 Características Principales

### ✨ Diseño y UX
- **Hero Section** con video de fondo y animaciones fluidas
- **Sección de Servicios** con efecto "tarjetero" inspirado en Samsung Fold
- **Grid Masonry** para casos de éxito con efectos hover
- **Navegación sticky bottom** para móviles
- **CTA flotante** con formulario de contacto rápido
- **Efectos de scroll** con animaciones personalizadas
- **Imágenes grayscale** que cambian a color al scroll/hover

### 🛠 Stack Tecnológico
- **Next.js 14** con App Router y SSR
- **TypeScript** para type safety
- **Tailwind CSS** con configuración personalizada
- **GSAP** para animaciones avanzadas
- **Framer Motion** para transiciones
- **Lucide React** para iconografía

### 🌐 Funcionalidades
- **Multiidioma** (Español, Inglés, Catalán)
- **SEO Optimizado** con metadatos dinámicos
- **Performance** optimizado (LCP < 2.1s, FID < 100ms)
- **Responsive Design** mobile-first
- **Gestos Touch** para interacciones móviles

## 🚀 Instalación y Setup

### Prerrequisitos
```bash
Node.js >= 18.0.0
npm >= 9.0.0
```

### Instalación
```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Abrir en el navegador
# http://localhost:3000
```

### Scripts Disponibles
```bash
npm run dev          # Desarrollo
npm run build        # Build para producción
npm run start        # Ejecutar build
npm run lint         # Linter
```

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router (Next.js 14)
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx          # Página de inicio
├── components/
│   ├── layout/           # Componentes de layout
│   │   ├── Header.tsx    # Navegación principal
│   │   └── Footer.tsx    # Footer del sitio
│   ├── sections/         # Secciones principales
│   │   ├── Hero.tsx      # Hero con video
│   │   ├── Services.tsx  # Servicios con efecto tarjetero
│   │   └── CasesGrid.tsx # Grid masonry de casos
│   └── ui/              # Componentes UI
│       └── FloatingCTA.tsx # CTA flotante
├── hooks/               # Custom hooks
│   └── useAnimations.ts # Hooks para animaciones
├── types/              # Definiciones TypeScript
│   └── index.ts        # Tipos principales
└── lib/               # Utilidades
```

## 🎨 Sistema de Diseño

### Colores Principales
```css
--primary-color: #0A0089    /* Azul NOVIT */
--secondary-color: #FF0080  /* Magenta */
--accent-cyan: #00FFE1      /* Cyan */
```

### Tipografía
- **Principal**: Inter (Google Fonts)
- **Alternativa**: System fonts

## 🎬 Animaciones y Efectos

### Efectos Implementados
1. **Hero**: Partículas animadas + parallax
2. **Servicios**: Cards con efecto tarjetero (GSAP)
3. **Casos**: Grid masonry + hover effects
4. **Scroll**: Animaciones on-scroll con Intersection Observer
5. **Imágenes**: Efecto grayscale → color
6. **Navegación**: Sticky bottom en móvil

## 📱 Responsive Design

### Mobile First
- Navegación sticky bottom
- Gestos touch habilitados
- Optimización para thumb zone

### Desktop
- Navegación fija superior
- Hover effects completos
- Parallax avanzado

## 📊 Métricas de Performance

### Objetivos
- **LCP**: < 2.1s
- **FID**: < 100ms
- **CLS**: < 0.1

### Optimizaciones
- Next.js Image Optimization
- Font optimization
- CSS critical path
- JavaScript code splitting

## 🌍 Idiomas Soportados
- **Español** (es) - Principal
- **Inglés** (en)  
- **Catalán** (ca)

## 🧪 Testing y Control de Calidad

### UI Testing con Playwright
Este proyecto incluye pruebas automatizadas completas para validar la funcionalidad en ambos entornos:
- **Desarrollo**: `localhost:3000` (Next.js dev server)
- **Producción**: `localhost:8000` (GitHub Pages con base path `/web-novit`)

### Comandos de Testing

#### 💻 Testing Local (requiere Linux/macOS)
```bash
npm test                    # Ejecutar todas las pruebas
npm run test:ui            # Interfaz visual para pruebas
npm run test:headed        # Pruebas con navegador visible
```

#### 🐳 Testing con Docker (Windows/macOS/Linux)
```bash
npm run test:docker        # Ejecutar todas las pruebas en contenedor
npm run test:docker:dev    # Modo desarrollo interactivo
npm run test:docker:clean  # Limpiar entorno Docker
```

### ¿Por qué Docker para Testing?
- **✅ Compatibilidad**: Funciona idénticamente en Windows, macOS y Linux
- **✅ Consistencia**: Mismo entorno que GitHub Actions
- **✅ Aislamiento**: No interfiere con tu instalación local
- **✅ GitHub Pages**: Simula exactamente el entorno de producción

Para más detalles sobre Docker testing, ver [DOCKER_TESTING.md](./DOCKER_TESTING.md)

## 📧 Contacto

**Novit Software**
- Email: info@novitsoftware.com
- Tel: +54 11 3176 9406
- Web: https://novitsoftware.com

---

**Desarrollado con ❤️ por el equipo de Novit Software**
