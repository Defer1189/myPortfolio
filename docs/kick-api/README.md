# KICK API Integration Documentation

Esta carpeta contiene toda la documentación relacionada con la integración de KICK API con OAuth2.

## 📚 Documentos Disponibles

### 1. [Guía de Configuración (SETUP_GUIDE.md)](./SETUP_GUIDE.md)

**Para empezar rápidamente**

Esta guía te ayudará a:

- Obtener credenciales de KICK
- Configurar el backend y frontend
- Ejecutar la aplicación
- Solucionar problemas comunes

👉 **Comienza aquí si es tu primera vez usando el proyecto**

### 2. [Documentación Técnica (TECHNICAL_DOCS.md)](./TECHNICAL_DOCS.md)

**Para entender cómo funciona**

Esta documentación incluye:

- Arquitectura del sistema
- Flujo de autenticación OAuth2 con diagramas
- Estructura detallada del proyecto
- Descripción de todos los endpoints
- Medidas de seguridad implementadas
- Guía de despliegue en producción

👉 **Lee esto para entender la implementación técnica**

## 🚀 Inicio Rápido

```bash
# 1. Backend
cd backend
npm install
cp .env.example .env
# Editar .env con tus credenciales de KICK
npm run dev

# 2. Frontend (en otra terminal)
cd frontend
npm install
npm run dev
```

Abre `http://localhost:5173` en tu navegador.

## 📖 Otros Recursos

- [Backend README](../../backend/README.md)
- [Frontend README](../../frontend/README.md)
- [README Principal del Proyecto](../../README_KICK.md)

## 🎯 Flujo de OAuth2 en Resumen

1. Usuario hace click en "Iniciar Sesión con KICK"
2. Backend genera un `state` aleatorio y lo guarda en cookie firmada
3. Usuario es redirigido a KICK para autorizar
4. KICK redirige de vuelta con un código de autorización
5. Backend valida el `state` (protección CSRF)
6. Backend intercambia el código por un `access_token`
7. Backend obtiene los datos del usuario de KICK
8. Tokens y datos se guardan en cookies firmadas
9. Usuario es redirigido al dashboard

## 🔐 Seguridad

Esta implementación incluye:

- ✅ Validación de state (protección CSRF)
- ✅ Cookies firmadas
- ✅ Helmet (headers HTTP seguros)
- ✅ CORS configurado
- ✅ Variables de entorno para credenciales

## 📝 Licencia

MIT - Ver [LICENSE](../../LICENSE)

## 👤 Autor

**Deiby Arango** - [@Defer1189](https://github.com/Defer1189)

---

Para preguntas o problemas, abre un issue en el repositorio.
