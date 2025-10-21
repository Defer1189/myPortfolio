# Frontend - KICK API Integration

Frontend de la aplicación de integración con KICK API construido con React + Vite.

## 🚀 Características

- ✅ Interfaz moderna con React 19
- ✅ Enrutamiento con React Router DOM
- ✅ Integración con API de backend
- ✅ Manejo de autenticación OAuth2
- ✅ Dashboard interactivo
- ✅ Diseño responsive
- ✅ Gradientes y efectos visuales modernos

## 📋 Requisitos

- Node.js >= 18.0.0
- npm o yarn
- Backend en ejecución (puerto 3001)

## ⚙️ Instalación

1. Instalar dependencias:

```bash
npm install
```

2. Configurar variables de entorno (opcional):

```bash
cp .env.example .env
```

Edita el archivo `.env` si necesitas cambiar la URL del backend:

```env
VITE_API_URL=http://localhost:3001
```

## 🏃 Ejecución

### Modo desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para producción:

```bash
npm run build
```

### Preview del build:

```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/       # Componentes reutilizables
│   ├── pages/           # Páginas de la aplicación
│   │   ├── Home.jsx     # Página principal
│   │   ├── AuthSuccess.jsx  # Página de éxito de autenticación
│   │   ├── AuthError.jsx    # Página de error de autenticación
│   │   └── Dashboard.jsx    # Dashboard del usuario
│   ├── services/        # Servicios de API
│   │   └── api.js       # Cliente Axios configurado
│   ├── utils/           # Utilidades
│   ├── App.jsx          # Componente principal con rutas
│   └── main.jsx         # Punto de entrada
├── public/              # Archivos estáticos
└── index.html          # HTML base
```

## 🎨 Páginas

### Home (`/`)

Página principal que muestra:
- Estado del sistema (health check)
- Información de la API
- Scopes de OAuth2 disponibles
- Características del proyecto
- Botón para iniciar sesión

### Auth Success (`/auth/success`)

Página mostrada después de una autenticación exitosa:
- Confirmación de éxito
- Información del usuario autenticado
- Botón para ir al dashboard

### Auth Error (`/auth/error`)

Página mostrada cuando falla la autenticación:
- Mensaje de error
- Detalles del error
- Botón para reintentar

### Dashboard (`/dashboard`)

Dashboard del usuario autenticado:
- Información del usuario
- Datos de streaming (ejemplos)
- Scopes disponibles
- Botón de logout

## 🔌 Integración con Backend

La aplicación se conecta al backend a través del servicio API (`src/services/api.js`):

```javascript
import { authAPI, infoAPI } from './services/api';

// Obtener información del usuario
const userData = await authAPI.getUser();

// Cerrar sesión
await authAPI.logout();

// Iniciar login (redirección)
authAPI.login();

// Obtener información de la API
const apiInfo = await infoAPI.getInfo();
```

## 🛠️ Tecnologías

- **React 19** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **React Router DOM** - Enrutamiento
- **Axios** - Cliente HTTP
- **CSS3** - Estilos con gradientes y animaciones

## 📝 Desarrollo

### Agregar nueva página:

1. Crear el componente en `src/pages/`
2. Crear el archivo CSS correspondiente
3. Agregar la ruta en `src/App.jsx`

### Agregar nueva llamada a la API:

1. Agregar el método en `src/services/api.js`
2. Usar el método en el componente correspondiente

## 📄 Licencia

MIT
