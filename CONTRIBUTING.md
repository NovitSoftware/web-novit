# Guía para contribuciones

## Traducciones obligatorias

- Todos los textos y funcionalidades nuevas deben incluir traducción a:
  - Español (es)
  - Inglés (en)
  - Catalán (ca)
- Los archivos de traducción se encuentran en `/src/locales/`.
- Cada vez que agregues un texto nuevo en la app, asegúrate de agregar su traducción correspondiente en los archivos:
  - `en.json`
  - `ca.json`
  - `es.json`

## Ejemplo

Si agregas este texto en la app:
```js
t('welcome_message')
```
Debes añadir la clave y traducción en:
```json
// en.json
"welcome_message": "Welcome!"
// ca.json
"welcome_message": "Benvingut!"
// es.json
"welcome_message": "¡Bienvenido!"
```

## Estructura de archivos de traducción

Los archivos de traducción están organizados por secciones:

```json
{
  "common": {
    // Términos comunes como "loading", "error", etc.
  },
  "navigation": {
    // Elementos de navegación del header/footer
  },
  "hero": {
    // Textos de la sección principal
  },
  "metadata": {
    // Meta tags y SEO
  }
}
```

## Cómo contribuir

1. **Fork** el repositorio
2. **Crea** una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. **Agrega** los textos en español primero
4. **Traduce** todos los textos a inglés y catalán
5. **Prueba** que la aplicación funcione en los 3 idiomas
6. **Commit** tus cambios: `git commit -m 'Add: nueva funcionalidad con traducciones'`
7. **Push** a la rama: `git push origin feature/nueva-funcionalidad`
8. **Abre** un Pull Request

## Directrices de traducción

### Español (es) - Idioma base
- Usar tono profesional pero cercano
- Utilizar "tú" en lugar de "usted" 
- Evitar tecnicismos excesivos

### Inglés (en)
- Tono profesional e internacional
- Usar terminología estándar de la industria tech
- Evitar contracciones en textos formales

### Catalán (ca)  
- Seguir las normas del Institut d'Estudis Catalans
- Usar terminología técnica en catalán cuando sea posible
- Mantener coherencia con el registro formal

## Herramientas recomendadas

- **Google Translate**: Para primera aproximación
- **DeepL**: Para traducciones más naturales
- **Linguee**: Para verificar terminología técnica
- **Institut d'Estudis Catalans**: Para normativa del catalán

## Testing

Antes de enviar un PR, verifica:

- [ ] La aplicación se ejecuta sin errores en los 3 idiomas
- [ ] Todos los textos están traducidos
- [ ] No hay claves de traducción faltantes
- [ ] El cambio de idioma funciona correctamente
- [ ] Los meta tags están actualizados para cada idioma

## Soporte

Si tienes dudas sobre traducciones o necesitas ayuda:
- Abre un issue con la etiqueta `translation`
- Consulta con el equipo de desarrollo
- Revisa ejemplos existentes en el código