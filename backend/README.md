# Backend - KICK API Integration

Backend API para la integración con KICK usando OAuth2.

## 🚀 Características

- ✅ Autenticación OAuth2 con KICK API
- ✅ Protección CSRF usando state aleatorio
- ✅ Cookies firmadas para seguridad
- ✅ Middlewares de seguridad (Helmet, CORS)
- ✅ Manejo centralizado de errores
- ✅ Variables de entorno para configuración

## 📋 Requisitos

- Node.js >= 18.0.0
- npm o yarn
- Credenciales de KICK API (Client ID y Client Secret)

## ⚙️ Instalación

1. Instalar dependencias:

```bash
npm install
```

2. Configurar variables de entorno:

Copia el archivo `.env.example` a `.env` y configura las variables:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales de KICK:

```env
KICK_CLIENT_ID=tu_client_id_aqui
KICK_CLIENT_SECRET=tu_client_secret_aqui
KICK_REDIRECT_URI=http://localhost:3001/api/auth/callback
COOKIE_SECRET=un_secreto_aleatorio_seguro
```

## 🏃 Ejecución

### Modo desarrollo (con auto-reload):

```bash
npm run dev
```

### Modo producción:

```bash
npm start
```

El servidor estará disponible en `http://localhost:3001`

## 📚 Endpoints de la API

### Health Check

```
GET /health
```

Verifica el estado del servidor.

### Información de la API

```
GET /api/info
```

Retorna información sobre la API y los endpoints disponibles.

### Autenticación OAuth2

#### Iniciar login

```
GET /api/auth/login
```

Inicia el flujo de OAuth2, genera un state aleatorio y redirige a KICK para autorización.

#### Callback OAuth

```
GET /api/auth/callback
```

Endpoint de callback después de la autorización de KICK. Valida el state y obtiene los tokens de acceso.

#### Obtener datos del usuario

```
GET /api/auth/user
```

Retorna la información del usuario autenticado.

#### Cerrar sesión

```
POST /api/auth/logout
```

Limpia todas las cookies de autenticación.

## 🔐 Seguridad

- **Helmet**: Protección de headers HTTP
- **CORS**: Configurado para aceptar solo el frontend especificado
- **Cookies firmadas**: Todas las cookies sensibles están firmadas
- **State validation**: Protección contra ataques CSRF
- **HTTPS**: Recomendado en producción

## 📝 Scopes de KICK API

Los siguientes scopes están configurados:

- `user:read` - Leer información del usuario
- `channel:read` - Leer información del canal
- `channel:write` - Escribir en el canal
- `chat:write` - Escribir en el chat
- `streamkey:read` - Leer la clave de streaming
- `events:subscribe` - Suscribirse a eventos
- `moderation:ban` - Moderar (banear usuarios)

## 🛠️ Tecnologías

- **Express.js** - Framework web
- **Axios** - Cliente HTTP para llamadas a KICK API
- **cookie-parser** - Manejo de cookies firmadas
- **cors** - Configuración CORS
- **helmet** - Seguridad HTTP
- **dotenv** - Variables de entorno

## 📄 Licencia

MIT
