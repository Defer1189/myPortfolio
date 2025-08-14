#!/bin/bash

# Información del sistema
echo "=== INFORMACIÓN DEL SISTEMA ==="
echo "Fecha y hora: $(date)"
echo "Directorio actual: $(pwd)"
echo "Usuario: $(whoami)"
echo "==============================="

# Validar versión de Node.js
NODE_VERSION=$(node -v)
echo "=== VERSIÓN DE NODE.JS ==="
echo $NODE_VERSION
echo "==========================="

# Extraer la versión mayor de Node.js
NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1 | tr -d 'v')

# Validar versión mínima de Node.js
if [ "$NODE_MAJOR" -lt 22 ]; then
    echo "❌ ERROR: Se requiere Node.js versión 22 o superior."
    echo "Versión actual: $NODE_VERSION"
    echo "WEBSITE_NODE_DEFAULT_VERSION=${WEBSITE_NODE_DEFAULT_VERSION}"
    echo "Por favor, verifique la configuración en Azure Portal"
    exit 1
fi

# Navegar al directorio de la aplicación
cd /home/site/wwwroot

# Instalar dependencias si no existen
if [ ! -d "node_modules" ]; then
  echo "Instalando dependencias faltantes..."
  npm install --production
else
  echo "Dependencias ya instaladas. Saltando npm install."
fi

# Establecer variables críticas
export PORT=8080
export NODE_ENV=staging

# Mensaje de diagnóstico
echo "=== VARIABLES DE ENTORNO ==="
echo "PORT: $PORT"
echo "NODE_ENV: $NODE_ENV"
echo "DB_URI: ${DB_URI:0:20}..."
echo "============================="

# Iniciar la aplicación
echo "Iniciando la aplicación..."
node src/index.js