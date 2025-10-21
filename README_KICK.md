# 🎮 KICK API Integration - OAuth2

Aplicación full-stack para integración segura con la API de KICK usando OAuth2.

## 🌟 Características

- ✅ Autenticación OAuth2 completa con KICK
- ✅ Frontend moderno con React + Vite
- ✅ Backend seguro con Express.js
- ✅ Protección CSRF con validación de state
- ✅ Cookies firmadas para seguridad
- ✅ Diseño responsive y atractivo
- ✅ Documentación completa

## 🏗️ Arquitectura

El proyecto está organizado en dos aplicaciones independientes:

```
.
├── frontend/     # Aplicación React + Vite (Puerto 5173)
├── backend/      # API Express.js (Puerto 3001)
└── docs/         # Documentación técnica
```

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js >= 18.0.0
- npm o yarn
- Credenciales de KICK API (Client ID y Client Secret)

### Instalación

1. **Clonar el repositorio:**

```bash
git clone https://github.com/Defer1189/myPortfolio.git
cd myPortfolio
```

2. **Configurar el Backend:**

```bash
cd backend
npm install
cp .env.example .env
# Editar .env con tus credenciales de KICK
```

3. **Configurar el Frontend:**

```bash
cd ../frontend
npm install
```

4. **Iniciar ambas aplicaciones:**

En una terminal (Backend):
```bash
cd backend
npm run dev
```

En otra terminal (Frontend):
```bash
cd frontend
npm run dev
```

5. **Abrir en el navegador:**

```
http://localhost:5173
```

## 📋 Configuración de KICK API

### Obtener Credenciales

1. Ve a [KICK Developer Portal](https://kick.com/developer) (o la URL correspondiente)
2. Crea una nueva aplicación OAuth2
3. Configura la Redirect URI: `http://localhost:3001/api/auth/callback`
4. Copia el Client ID y Client Secret
5. Pega las credenciales en el archivo `backend/.env`

### Scopes Requeridos

La aplicación solicita los siguientes permisos:

- `user:read` - Información del usuario
- `channel:read` - Información del canal
- `channel:write` - Gestión del canal
- `chat:write` - Enviar mensajes al chat
- `streamkey:read` - Acceso a la clave de streaming
- `events:subscribe` - Eventos en tiempo real
- `moderation:ban` - Herramientas de moderación

## 🔐 Seguridad

### Flujo OAuth2

1. Usuario hace click en "Iniciar Sesión"
2. Backend genera un state aleatorio y lo guarda en cookie firmada
3. Usuario es redirigido a KICK para autorizar
4. KICK redirige de vuelta con un código de autorización
5. Backend valida el state (protección CSRF)
6. Backend intercambia el código por access_token
7. Backend obtiene datos del usuario
8. Tokens y datos se guardan en cookies firmadas
9. Usuario es redirigido al dashboard

### Medidas de Seguridad

- ✅ Validación de state para prevenir CSRF
- ✅ Cookies firmadas con secret
- ✅ HTTPS recomendado en producción
- ✅ Helmet para headers seguros
- ✅ CORS configurado
- ✅ Variables de entorno para credenciales

## 📚 Documentación

- [Backend README](./backend/README.md) - Documentación del backend
- [Frontend README](./frontend/README.md) - Documentación del frontend
- [Documentación Técnica](./docs/kick-api/TECHNICAL_DOCS.md) - Guía técnica completa

## 🎨 Capturas de Pantalla

### Página Principal
Muestra información de la API, estado del sistema y botón de login.

### Dashboard
Información del usuario autenticado, scopes disponibles y datos de streaming.

## 🛠️ Tecnologías

### Frontend
- React 19
- Vite 7
- React Router DOM
- Axios
- CSS3 (gradientes y animaciones)

### Backend
- Node.js (ES Modules)
- Express.js
- Axios
- cookie-parser
- cors
- helmet
- dotenv

## 📁 Estructura del Proyecto

```
myPortfolio/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── AuthSuccess.jsx
│   │   │   ├── AuthError.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── App.jsx
│   ├── .env.example
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── oauth.config.js
│   │   ├── middlewares/
│   │   ├── routes/
│   │   │   ├── api.routes.js
│   │   │   └── auth.routes.js
│   │   ├── utils/
│   │   ├── app.js
│   │   └── index.js
│   ├── .env.example
│   └── package.json
└── docs/
    └── kick-api/
        └── TECHNICAL_DOCS.md
```

## 🔧 Comandos Disponibles

### Backend

```bash
npm run dev      # Modo desarrollo con auto-reload
npm start        # Modo producción
```

### Frontend

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
```

## 🐛 Solución de Problemas

### Error: "Missing required environment variables"

Asegúrate de crear el archivo `.env` en el backend con todas las variables del `.env.example`.

### Error de CORS

Verifica que `FRONTEND_URL` en el backend sea `http://localhost:5173`.

### Error: "Invalid state"

Asegúrate de que las cookies estén habilitadas en el navegador.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](../LICENSE) para más detalles.

## ✨ Autor

**Deiby Arango**

- GitHub: [@Defer1189](https://github.com/Defer1189)

## 🙏 Agradecimientos

- KICK por proporcionar su API
- Comunidad de React y Express.js
- Todos los contribuidores del proyecto

---

**Nota:** Este es un proyecto de demostración educativo. Para uso en producción, asegúrate de seguir las mejores prácticas de seguridad y las políticas de uso de la API de KICK.
