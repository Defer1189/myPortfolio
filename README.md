# MyPortfolio - Aplicación Full-Stack Profesional <a href="#"><img src="https://img.shields.io/badge/status-en%20desarrollo-orange?style=flat&logo=github" alt="Estado: En desarrollo"></a> <a href="https://github.com/Defer1189/myPortfolio"><img src="https://img.shields.io/github/repo-size/Defer1189/myPortfolio?style=flat&logo=github" alt="Tamaño del repositorio"></a> <a href="https://github.com/Defer1189/myPortfolio"><img src="https://img.shields.io/github/last-commit/Defer1189/myPortfolio?style=flat&logo=git" alt="Último commit"></a>

<a href="https://github.com/Defer1189/myPortfolio" target="_blank" title="Ver repositorio en GitHub">
  <img src="docs/images/logo(2).svg" alt="Logo de mi portafolio" width="100" height="100" align="right" loading="lazy">
</a>

¡Bienvenido a **MyPortfolio**!
Este es un proyecto **Full-Stack** profesional que presenta mi experiencia como analista y desarrollador de software. **MyPortfolio** nace como una plataforma de presentación personal para mostrar proyectos, habilidades y trayectoria profesional de forma elegante, interactiva y escalable.

<p align="center">
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-v22.14.0-brightgreen?style=flat&logo=node.js" alt="Node.js versión 22.14.0"></a>
  <a href="https://www.npmjs.com/"><img src="https://img.shields.io/badge/npm-v11.3.0-red?style=flat&logo=npm" alt="npm versión 11.3.0"></a>
  <a href="https://github.com/Defer1189/myPortfolio"><img src="https://img.shields.io/github/languages/top/Defer1189/myPortfolio?style=flat&logo=javascript" alt="Lenguaje principal"></a>
  <a href="https://github.com/Defer1189/myPortfolio/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Defer1189/myPortfolio?style=flat&logo=open-source-initiative" alt="Licencia MIT"></a>
</p>

---

## 📌 Visión General

Este proyecto está organizado como un **monorepo** y contiene:

- **Cliente (`client/`):** aplicación frontend en React + Vite.
- **Servidor (`server/`):** backend con Node.js, Express y MongoDB.

Incluye control de calidad, buenas prácticas de código, documentación de API y configuración para despliegue futuro.

---

## 🛠️ Tecnologías Principales

### Frontend

- React v19+
- Vite
- JavaScript (ESM, JSX)
- CSS

### Backend

- Node.js v22.14.0
- Express
- MongoDB con Mongoose
- JWT y bcrypt

### DevTools

- ESLint (Flat Config)
- Prettier
- Husky + lint-staged
- EditorConfig
- Swagger / OpenAPI

---

## ✅ Requisitos Previos

- [Node.js v22.14.0+](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

---

## 🚀 Instalación

1. **Clonar el repositorio:**

```bash
git clone https://github.com/Defer1189/myPortfolio.git
cd myPortfolio
```

2. **Instalar dependencias de la raíz (herramientas globales):**

```bash
npm install
```

3. **Instalar dependencias del cliente:**

```bash
cd client
npm install
cd ..
```

4. **Instalar dependencias del servidor:**

```bash
cd server
npm install
cd ..
```

---

## ⚙️ Configuración del Entorno (Servidor)

El servidor utiliza archivos `.env` para la configuración específica del entorno.

1. En la carpeta `server/`, crea un archivo `.env.development` para el entorno de desarrollo:

```ini
# server/.env.development
PORT=3000
DB_URI=mongodb://localhost:27017/myportfolio_dev
NODE_ENV=development
SWAGGER_SERVER=http://localhost:3000
```

2. Para producción, crea un archivo `server/.env.production` con las credenciales y URLs correspondientes (este archivo NO debe ser commiteado si contiene secretos):

```ini
# server/.env.production
PORT=PRODUCCION_PUERTO
DB_URI=MONGODB_ATLAS_URI
NODE_ENV=production
SWAGGER_SERVER=https://tu_dominio.com
# Añade otros secretos como JWT_SECRET si es necesario
```

3. _(Opcional)_ Crea `server/.env.staging` si planeas usar un entorno de pre-producción.

---

## 🖥️ Ejecución del Proyecto

- **Servidor Backend:**

  - Modo Desarrollo (desde `myPortfolio/server/`):

    ```bash
    npm run dev
    ```

    La API estará disponible en `http://localhost:3000` (o el puerto en `.env.development`).
    La documentación de Swagger estará en `http://localhost:3000/api-docs`.

  - Modo Producción (desde `myPortfolio/server/`):

    ```bash
    npm start
    ```

    La API se ejecutará con la configuración de `.env.production`.

- **Cliente Frontend:**

  - Modo Desarrollo (desde `myPortfolio/client/`):

    ```bash
    npm run dev
    ```

    La aplicación React estará disponible en `http://localhost:5173` (o el puerto por defecto de Vite).

- **(Opcional) Ejecutar ambos simultáneamente:**
  Puedes abrir dos terminales o usar una herramienta como `concurrently` (necesitarías instalarla en la raíz y configurar un script).

---

## 🧩 Scripts de Calidad de Código (Desde la raíz `myPortfolio/`)

- Formatear todo el código:
  ```bash
  npm run format
  ```
- Verificar formato:
  ```bash
  npm run format:check
  ```
- Ejecutar ESLint:
  ```bash
  npm run lint
  ```
- Ejecutar ESLint e intentar corregir problemas:
  ```bash
  npm run lint:fix
  ```
  Estos scripts también se ejecutan automáticamente antes de cada commit gracias a Husky y lint-staged.

---

## 🪪 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](https://github.com/Defer1189/myPortfolio/tree/main?tab=MIT-1-ov-file) para más detalles.

---

## 🤝 Contacto

¿Tienes preguntas, ideas o feedback?
¡Contáctame a través de [mi perfil de GitHub](https://github.com/Defer1189) o abre un issue!

---
