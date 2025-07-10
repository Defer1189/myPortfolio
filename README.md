# MyPortfolio - Aplicación Full-Stack Profesional <a href="#"><img src="https://img.shields.io/badge/status-en%20desarrollo-orange?style=flat&logo=github" alt="Estado: En desarrollo"></a> <a href="https://github.com/Defer1189/myPortfolio"><img src="https://img.shields.io/github/repo-size/Defer1189/myPortfolio?style=flat&logo=github" alt="Tamaño del repositorio"></a> <a href="https://github.com/Defer1189/myPortfolio"><img src="https://img.shields.io/github/last-commit/Defer1189/myPortfolio?style=flat&logo=git" alt="Último commit"></a>

<a href="https://github.com/Defer1189/myPortfolio" target="_blank" title="Visita mi Portafolio Web">
  <img src="docs/images/logo.svg" alt="Logo de mi portafolio" width="100" height="100" align="left" loading="lazy">
</a>

¡Bienvenido a **MyPortfolio**!
Este es un proyecto **Full-Stack** profesional que presenta mi experiencia como analista y desarrollador de software. **MyPortfolio** nace como una plataforma de presentación personal para mostrar proyectos, habilidades y trayectoria profesional de forma elegante, interactiva y escalable.

<p align="center">
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-v22.14.0-brightgreen?style=flat&logo=node.js" alt="Node.js versión 22.14.0"></a>
  <a href="https://www.npmjs.com/"><img src="https://img.shields.io/badge/npm-v11.3.0-red?style=flat&logo=npm" alt="npm versión 11.3.0"></a>
  <a href="https://github.com/Defer1189/myPortfolio/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Defer1189/myPortfolio?style=flat&logo=open-source-initiative" alt="Licencia MIT"></a>
</p>

---

## 📌 Visión General

Este proyecto está organizado como un **monorepo** y contiene:

- **Cliente (`client/`):** Aplicación frontend en React + Vite, diseñada para ser interactiva y visualmente atractiva, incluyendo un logotipo animado personalizado.
- **Servidor (`server/`):** backend con Node.js, Express y MongoDB.

Incluye control de calidad, buenas prácticas de código, documentación de API y configuración para despliegue futuro.

---

## 🛠️ Tecnologías Principales

### Frontend

- React v19+ [![React v19+](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev/)
- Vite [![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
- JavaScript (ESM, JSX) [![JavaScript](https://img.shields.io/badge/JavaScript-ESM%2C%20JSX-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
- CSS (con variables y animaciones) [![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)

### Backend

- Node.js [![Node.js](https://img.shields.io/badge/Node.js-v22.14.0-brightgreen?style=flat&logo=node.js)](https://nodejs.org/)
- Express [![Express](https://img.shields.io/badge/Express-404D59?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
- MongoDB con Mongoose [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
- JWT y bcrypt [![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=json-web-tokens&logoColor=white)](https://jwt.io/) [![bcrypt](https://img.shields.io/badge/bcrypt-000000?style=flat&logo=hashicorp&logoColor=white)](https://www.npmjs.com/package/bcrypt)

### DevTools

- ESLint (Flat Config) [![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=flat&logo=eslint&logoColor=white)](https://eslint.org/)
- Prettier [![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier&logoColor=black)](https://prettier.io/)
- Husky + lint-staged [![Husky](https://img.shields.io/badge/Husky-000000?style=flat&logo=husky&logoColor=white)](https://typicode.github.io/husky/#/)
- EditorConfig [![EditorConfig](https://img.shields.io/badge/EditorConfig-000000?style=flat&logo=editorconfig&logoColor=white)](https://editorconfig.org/)
- Swagger / OpenAPI [![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat&logo=swagger&logoColor=black)](https://swagger.io/)

---

## ✅ Requisitos Previos

- [Node.js v22.14.0+](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

---

## 🚀 Instalación

Sigue estos pasos para configurar y ejecutar el proyecto localmente:

1. **Clonar el repositorio:**

```bash
git clone https://github.com/Defer1189/myPortfolio.git
cd myPortfolio
```

2. **Instalar dependencias de la raíz (herramientas globales como Husky, Prettier, ESLint):**

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

Puedes ejecutar el cliente y el servidor de forma independiente, o ambos simultáneamente:

- **Ejecutar ambos (Cliente y Servidor) simultáneamente (recomendado para desarrollo):**
  Desde la raíz del proyecto (`myPortfolio/`), ejecuta:

  ```bash
  npm run dev
  ```

  Ambos servidores se iniciarán en paralelo.

- **Servidor Backend (independiente):**

  - Modo Desarrollo (desde `myPortfolio/server/`):

    ```bash
    npm run dev
    ```

    La API estará disponible en `http://localhost:3000` (o el puerto configurado en `.env.development`).
    La documentación de Swagger estará en `http://localhost:3000/api-docs`.

  - Modo Producción (desde `myPortfolio/server/`):
    ```bash
    npm start
    ```
    La API se ejecutará con la configuración de `.env.production`.

- **Cliente Frontend (independiente):**
  - Modo Desarrollo (desde `myPortfolio/client/`):
    ```bash
    npm run dev
    ```
    La aplicación React estará disponible en `http://localhost:5173` (o el puerto por defecto de Vite).

---

## 🌐 Demo en Vivo (Próximamente)

¡Visita la aplicación desplegada para verla en acción!

[Enlace a la demo en vivo](https://tu-dominio-de-despliegue.com)

---

## 📸 Capturas de Pantalla / GIF (Próximamente)

Aquí encontrarás capturas de pantalla o un GIF animado del logotipo y las secciones clave de la aplicación.

_(Se añadirán imágenes aquí una vez estén disponibles.)_

---

## 🪪 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](https://github.com/Defer1189/myPortfolio/tree/main?tab=MIT-1-ov-file) para más detalles.

---

## 🤝 Contribuciones

¡Tus contribuciones son bienvenidas! Si deseas contribuir a este proyecto, por favor, consulta la guía de contribución en [CONTRIBUTING.md](CONTRIBUTING.md) para más detalles sobre cómo empezar y las pautas a seguir.

---

## 🤝 Contacto

¿Tienes preguntas, ideas o feedback?
¡Contáctame a través de [mi perfil de GitHub](https://github.com/Defer1189) o abre un issue!

---
