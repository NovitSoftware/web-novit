# Docker Testing Guide

Este documento explica cómo usar Docker para ejecutar las pruebas de Playwright en cualquier plataforma (Windows, macOS, Linux).

## ¿Por qué Docker?

- **Consistencia**: El mismo entorno Linux en todas las plataformas
- **GitHub Actions**: Replica exactamente el entorno de CI/CD
- **Windows**: Soluciona problemas de compatibilidad de Playwright en Windows
- **Aislamiento**: No interfiere con tu instalación local de Node.js

## Prerrequisitos

1. **Docker Desktop** instalado y ejecutándose
   - Windows: [Docker Desktop for Windows](https://docs.docker.com/desktop/windows/install/)
   - macOS: [Docker Desktop for Mac](https://docs.docker.com/desktop/mac/install/)
   - Linux: [Docker Engine](https://docs.docker.com/engine/install/)

2. **Docker Compose** (incluido con Docker Desktop)

## Comandos Principales

### 🧪 Ejecutar Todas las Pruebas
```bash
npm run test:docker
```
- Construye el contenedor
- Ejecuta todas las pruebas (dev + static)
- Se cierra automáticamente al finalizar

### 🔧 Desarrollo Interactivo
```bash
npm run test:docker:dev
```
- Modo interactivo para desarrollo
- Los cambios en el código se reflejan en tiempo real
- Ideal para depurar pruebas

### 🧹 Limpiar Entorno
```bash
npm run test:docker:clean
```
- Elimina contenedores y volúmenes
- Útil para empezar desde cero

### 🐳 Verificar Docker
```bash
npm run docker:setup
```
- Verifica que Docker esté funcionando
- Muestra versiones de Docker y Docker Compose

## Arquitectura de Pruebas

### Entornos Duales
1. **localhost:3000** - Servidor de desarrollo Next.js
2. **localhost:8000** - Build estático (simula GitHub Pages)

### Tipos de Pruebas
- `assets.dev.spec.ts` - Pruebas específicas de desarrollo
- `assets.static.spec.ts` - Pruebas de GitHub Pages con base path `/web-novit`
- `navigation.shared.spec.ts` - Pruebas que corren en ambos entornos

## Estructura de Archivos Docker

```
├── Dockerfile.playwright     # Imagen base para pruebas
├── docker-compose.yml        # Configuración de producción
├── docker-compose.dev.yml    # Configuración de desarrollo
└── DOCKER_TESTING.md        # Esta documentación
```

## Solución de Problemas

### Error: "Docker no está ejecutándose"
```bash
# Verifica que Docker Desktop esté iniciado
docker --version
docker-compose --version
```

### Error: "Puerto ya en uso"
```bash
# Detén otros servidores locales
npm run test:docker:clean
```

### Error: "Permisos en Linux"
```bash
# Añade tu usuario al grupo docker
sudo usermod -aG docker $USER
# Reinicia la sesión
```

### Rendimiento Lento en Windows
- Asegúrate de que el proyecto esté en el sistema de archivos Linux en WSL2
- Habilita WSL2 backend en Docker Desktop

## Comparación: Local vs Docker

| Aspecto | Local | Docker |
|---------|-------|--------|
| **Windows** | ❌ Problemas con Playwright | ✅ Funciona perfectamente |
| **Consistencia** | ⚠️ Depende del SO | ✅ Idéntico en todas partes |
| **CI/CD** | ⚠️ Posibles diferencias | ✅ Exactamente igual |
| **Velocidad** | ✅ Más rápido | ⚠️ Overhead de Docker |
| **Configuración** | ⚠️ Dependencias locales | ✅ Todo incluido |

## Integración con GitHub Actions

Las pruebas en GitHub Actions usan el mismo entorno Docker, garantizando:
- Mismos resultados en local y CI/CD
- Detección temprana de problemas
- Consistencia entre desarrolladores

## Comandos Avanzados

### Solo Build de Docker
```bash
npm run docker:build
```

### Ejecutar Comando Personalizado
```bash
docker-compose run playwright-tests npm run test:ui
```

### Ver Logs Detallados
```bash
docker-compose up --build
```

### Acceder al Contenedor
```bash
docker-compose run playwright-tests bash
```

## Próximos Pasos

1. Ejecuta `npm run docker:setup` para verificar tu instalación
2. Prueba `npm run test:docker` para ejecutar todas las pruebas
3. Usa `npm run test:docker:dev` para desarrollo interactivo

¡Con Docker, las pruebas funcionan idénticamente en Windows, macOS y Linux! 🐳✨