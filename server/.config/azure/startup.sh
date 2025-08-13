#!/bin/bash

# Verificar versión de Node.js
echo "=== VERSIÓN DE NODE.JS ==="
node -v
echo "==========================="

# Validar versión mínima de Node.js
NODE_MAJOR=$(node -v | cut -d'.' -f1 | tr -d 'v')
if [ "$NODE_MAJOR" -lt 22 ]; then
    echo "❌ ERROR: Se requiere Node.js versión 22 o superior."
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