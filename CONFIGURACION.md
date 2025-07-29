# 🚀 Configuración de Cotización Premium con IA

## ⚠️ IMPORTANTE: Configuración Requerida

Esta funcionalidad **REQUIERE** configuración antes de funcionar. Sin ella, obtendrás errores al intentar enviar cotizaciones.

## 📋 Requisitos Previos

1. **Cuenta OpenAI** (para generar propuestas con IA)
2. **Email corporativo** (para envío automático de cotizaciones)

## 🔧 Paso a Paso de Configuración

### 1️⃣ Configurar OpenAI (OBLIGATORIO)

1. Ve a [OpenAI Platform](https://platform.openai.com/)
2. Crea una cuenta o inicia sesión
3. Ve a "API Keys" en el menú lateral
4. Haz clic en "Create new secret key"
5. Copia la clave (empieza con `sk-proj-...`)

**💰 IMPORTANTE**: Necesitas créditos en tu cuenta OpenAI. La funcionalidad usa GPT-4 que tiene costo por uso.

### 2️⃣ Configurar Email (OBLIGATORIO)

#### Opción A: Gmail (Recomendado)
1. Ve a tu [Cuenta de Google](https://myaccount.google.com/)
2. Habilita "Verificación en 2 pasos"
3. Ve a "Contraseñas de aplicaciones"
4. Genera una contraseña para "Mail"
5. Usa esa contraseña (NO la de tu cuenta personal)

#### Opción B: Outlook
- SMTP: `smtp-mail.outlook.com`
- Puerto: `587`
- Usa las credenciales de tu cuenta Outlook

#### Opción C: Servidor Propio
- Configura según tu proveedor de email

### 3️⃣ Crear Archivo de Configuración

1. Copia el archivo `.env.example` como `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edita `.env.local` y completa:
   ```bash
   # Tu clave de OpenAI
   OPENAI_API_KEY=sk-proj-tu-clave-aqui
   
   # Tu configuración de email
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=tu-email@gmail.com
   SMTP_PASSWORD=tu-contraseña-de-aplicacion
   ```

### 4️⃣ Instalar y Ejecutar

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

## ✅ Verificar Configuración

1. Abre la aplicación en http://localhost:3000
2. Ve a http://localhost:3000/api/check-config para verificar tu configuración
3. Deberías ver: `"configured": true` si todo está bien
4. Haz clic en "⚡ Cotización Premium en 24hs"
5. Completa el formulario con un email corporativo
6. Si todo está bien configurado, deberías recibir un email en rodrigo.vazquez@novit.com.ar

## 🔍 Solución de Problemas

### Error: "OpenAI API key no configurada"
- Verifica que `OPENAI_API_KEY` esté en `.env.local`
- Verifica que la clave sea válida y tenga créditos

### Error: "Error interno del servidor" (email)
- Verifica credenciales SMTP en `.env.local`
- Para Gmail, usa contraseña de aplicación, no la personal
- Verifica que el servidor SMTP sea correcto

### El formulario no envía nada
- Verifica que uses un email corporativo (no Gmail/Outlook personal)
- Revisa la consola del navegador para errores

## 📧 Flujo de Cotización

1. **Usuario** completa formulario con email corporativo
2. **IA** (GPT-4) genera propuesta comercial profesional
3. **Email** se envía automáticamente a rodrigo.vazquez@novit.com.ar
4. **Rodrigo** valida y envía al cliente

## 💡 Notas Importantes

- El email corporativo es validado (no acepta Gmail, Outlook, etc.)
- Los archivos PDF se adjuntan pero no se procesan su contenido
- La IA genera propuestas basadas en el resumen del proyecto
- Cada uso de IA tiene costo (aproximadamente $0.03-0.06 por cotización)

## 🆘 ¿Necesitas Ayuda?

Si tienes problemas con la configuración:
1. Verifica que todos los valores en `.env.local` sean correctos
2. Revisa que tengas créditos en OpenAI
3. Prueba la configuración de email por separado
4. Revisa los logs del servidor para errores específicos