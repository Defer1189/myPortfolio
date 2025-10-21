# Guía de Configuración - KICK API Integration

## 📋 Pasos para Configurar el Proyecto

### 1. Obtener Credenciales de KICK

Para poder usar esta integración, necesitas credenciales OAuth2 de KICK:

1. Ve al **KICK Developer Portal** (la URL específica depende de la plataforma KICK)
2. Crea una nueva aplicación OAuth2
3. Configura la **Redirect URI**: `http://localhost:3001/api/auth/callback`
   - Para producción, usa tu dominio real: `https://tudominio.com/api/auth/callback`
4. Selecciona los siguientes **scopes**:
   - `user:read`
   - `channel:read`
   - `channel:write`
   - `chat:write`
   - `streamkey:read`
   - `events:subscribe`
   - `moderation:ban`
5. Copia el **Client ID** y **Client Secret**

### 2. Configurar el Backend

```bash
# Navegar a la carpeta backend
cd backend

# Instalar dependencias
npm install

# Crear archivo .env desde el ejemplo
cp .env.example .env
```

Edita el archivo `.env` y configura las siguientes variables:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# KICK OAuth2 Configuration
KICK_CLIENT_ID=tu_client_id_aqui        # ← Pegar tu Client ID
KICK_CLIENT_SECRET=tu_client_secret_aqui # ← Pegar tu Client Secret
KICK_REDIRECT_URI=http://localhost:3001/api/auth/callback

# OAuth Scopes (NO cambiar, a menos que sepas lo que haces)
KICK_SCOPES=user:read channel:read channel:write chat:write streamkey:read events:subscribe moderation:ban

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Cookie Secret (generar uno seguro para producción)
COOKIE_SECRET=cambia_esto_por_un_string_aleatorio_muy_largo_y_seguro

# Session Configuration
SESSION_MAX_AGE=3600000
```

**⚠️ Importante:**

- El `COOKIE_SECRET` debe ser un string aleatorio y seguro
- Puedes generar uno con: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### 3. Configurar el Frontend

```bash
# Navegar a la carpeta frontend
cd ../frontend

# Instalar dependencias
npm install
```

Si necesitas cambiar la URL del backend, crea un archivo `.env`:

```bash
cp .env.example .env
```

Y edita:

```env
VITE_API_URL=http://localhost:3001
```

### 4. Ejecutar la Aplicación

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

Deberías ver:

```
🚀 Server running on port 3001
📚 Environment: development
🔗 Health check: http://localhost:3001/health
🔗 API info: http://localhost:3001/api/info
🔗 OAuth login: http://localhost:3001/api/auth/login
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

Deberías ver:

```
  VITE v7.1.11  ready in XXX ms

  ➜  Local:   http://localhost:5173/
```

### 5. Probar la Aplicación

1. Abre tu navegador en `http://localhost:5173`
2. Verifica que se muestra la página principal con:
   - Estado del sistema (verde = OK)
   - Información de la API
   - Scopes de OAuth2
3. Haz click en **"🔐 Iniciar Sesión con KICK"**
4. Serás redirigido a KICK para autorizar la aplicación
5. Después de autorizar, serás redirigido de vuelta a la aplicación
6. Deberías ver la página de éxito con tu información de usuario
7. Haz click en **"Ir al Dashboard"** para ver el panel completo

## 🔧 Solución de Problemas

### Error: "Missing required environment variables"

**Causa:** No has configurado las variables de entorno en el backend.

**Solución:**

1. Asegúrate de tener el archivo `backend/.env`
2. Verifica que contiene todas las variables requeridas
3. Reinicia el servidor backend

### Error: "CORS"

**Causa:** La URL del frontend no coincide con `FRONTEND_URL` en el backend.

**Solución:**

1. Verifica que `FRONTEND_URL=http://localhost:5173` en `backend/.env`
2. Reinicia el servidor backend

### Error: "Invalid state"

**Causa:** Problema con las cookies o el state de OAuth2.

**Solución:**

1. Asegúrate de que las cookies están habilitadas en tu navegador
2. Verifica que `COOKIE_SECRET` está configurado en `backend/.env`
3. Intenta limpiar las cookies del navegador
4. Reinicia ambos servidores

### Error: "Authentication failed" al autorizar

**Causa:** Credenciales de KICK incorrectas o redirect URI no coincide.

**Solución:**

1. Verifica que `KICK_CLIENT_ID` y `KICK_CLIENT_SECRET` son correctos
2. Verifica que la Redirect URI en KICK Developer Portal es exactamente: `http://localhost:3001/api/auth/callback`
3. Asegúrate de que los scopes solicitados están autorizados en tu aplicación KICK

### El frontend no carga

**Causa:** El backend no está corriendo o hay un error de configuración.

**Solución:**

1. Verifica que el backend está corriendo en el puerto 3001
2. Prueba acceder a `http://localhost:3001/health` directamente
3. Revisa los logs del backend en la consola
4. Verifica que todas las dependencias están instaladas

## 📚 Recursos Adicionales

- [Documentación Técnica Completa](./TECHNICAL_DOCS.md)
- [Backend README](../backend/README.md)
- [Frontend README](../frontend/README.md)
- [README Principal](../README_KICK.md)

## 🚀 Siguiente Paso: Producción

Para desplegar en producción, consulta la sección "Guía de Despliegue" en la [Documentación Técnica](./TECHNICAL_DOCS.md).

Puntos clave:

- Usar HTTPS
- Configurar `NODE_ENV=production`
- Generar `COOKIE_SECRET` seguro y único
- Actualizar URLs a dominios de producción
- Configurar `secure: true` en las cookies
- Implementar rate limiting
- Configurar logging y monitoreo

---

¿Tienes problemas? Abre un issue en el repositorio o consulta la documentación técnica.
