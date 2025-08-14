#!/bin/bash

# ======== DIAGNÓSTICO INICIAL ========
echo "=== ENTORNO ==="
echo "PORT: $PORT"
echo "NODE_ENV: $NODE_ENV"
echo "RUTA: $(pwd)"
echo "USER: $(whoami)"
echo "NODE: $(node -v)"
echo "NPM: $(npm -v)"
echo "================================"

# ======== VALIDACIÓN DB_URI ========
if [[ -z "${DB_URI}" ]]; then
  echo "❌ ERROR CRÍTICO: DB_URI no definida"
  exit 1
elif [[ ! "${DB_URI}" =~ ^mongodb\+srv://.* ]]; then
  echo "❌ ERROR: Formato inválido de DB_URI"
  exit 1
fi

# ======== INSTALACIÓN DEPENDENCIAS ========
cd /home/site/wwwroot
if [ ! -d "node_modules" ]; then
  echo "Instalando dependencias..."
  npm install --production
  echo "✅ Dependencias instaladas"
else
  echo "🔍 Dependencias existentes"
fi

# ======== CORRECCIÓN DE PERMISOS ========
echo "Corrigiendo permisos en node_modules..."
chmod -R 755 node_modules
echo "✅ Permisos corregidos"

# ======== EJECUCIÓN ========
echo "Iniciando aplicación..."
node src/index.js