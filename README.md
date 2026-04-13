# TP2 - Sistema de Gestión de Tareas (React + Node.js)

Este repositorio contiene una aplicación fullstack para la gestión de tareas, compuesta por un backend en Node.js/Express y un frontend en React. El objetivo es permitir el registro, autenticación y gestión de tareas de usuarios, con roles diferenciados (admin/user).

---

## Tabla de Contenidos

- [TP2 - Sistema de Gestión de Tareas (React + Node.js)](#tp2---sistema-de-gestión-de-tareas-react--nodejs)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Características](#características)
  - [Requisitos](#requisitos)
  - [Instalación](#instalación)
    - [1. Clonar el repositorio](#1-clonar-el-repositorio)
    - [2. Backend](#2-backend)
    - [3. Frontend](#3-frontend)
  - [Configuración](#configuración)
    - [Backend](#backend)
  - [Ejecución](#ejecución)
    - [1. Iniciar el backend](#1-iniciar-el-backend)
    - [2. Poblar la base de datos (opcional, crea usuarios y datos de ejemplo)](#2-poblar-la-base-de-datos-opcional-crea-usuarios-y-datos-de-ejemplo)
    - [3. Iniciar el frontend](#3-iniciar-el-frontend)
  - [Pruebas de la API](#pruebas-de-la-api)
  - [Estructura del Proyecto](#estructura-del-proyecto)
  - [Notas y Consejos](#notas-y-consejos)

---

## Características

- Backend RESTful con Express, Sequelize y autenticación JWT
- Frontend moderno con React, Vite y TailwindCSS
- Registro, login, gestión de tareas, roles y permisos
- Scripts para poblar la base de datos y actualizar contraseñas
- Colección Postman para probar la API

---

## Requisitos

- Node.js >= 18.x
- npm >= 9.x
- Base de datos MySQL o PostgreSQL

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd TP2
```

### 2. Backend

```bash
cd backend
npm install
```

### 3. Frontend

```bash
cd ../frontend/frontend
npm install
```

---

## Configuración

### Backend

1. Copia el archivo `.env.example` a `.env` y completa los datos de tu base de datos y JWT:

   ```
   cp .env.example .env
   # Edita .env con tus credenciales
   ```

   Ejemplo:

   ```
   DB_NAME=tp2_db
   DB_USER=root
   DB_PASSWORD=tu_password
   DB_HOST=localhost
   DB_DIALECT=mysql
   DB_PORT=3306
   JWT_SECRET=un_secreto_seguro
   PORT=3001
   ```

2. Crea la base de datos vacía en tu gestor (MySQL o PostgreSQL).

---

## Ejecución

### 1. Iniciar el backend

```bash
cd backend
npm run dev
```

### 2. Poblar la base de datos (opcional, crea usuarios y datos de ejemplo)

```bash
npm run db:seed
```

### 3. Iniciar el frontend

```bash
cd ../frontend/frontend
npm run dev
```

- El frontend estará disponible en: http://localhost:5173
- El backend por defecto en: http://localhost:3001

---

## Pruebas de la API

- Usa el archivo `backend/postman_collection.json` para importar la colección en Postman y probar los endpoints de autenticación y tareas.

---

## Estructura del Proyecto

```
TP2/
├── backend/
│   ├── app.js
│   ├── package.json
│   ├── .env.example
│   ├── postman_collection.json
│   ├── scripts/
│   └── src/
└── frontend/
    └── frontend/
        ├── package.json
        ├── src/
        └── ...
```

---

## Notas y Consejos

- El script `db:seed` crea usuarios admin y user por defecto:
  - admin / admin123
  - user / user123
- Puedes actualizar todas las contraseñas con el script `update-passwords.mjs`.
- El backend soporta CORS solo para localhost por defecto.
- Si cambias el puerto o la URL, actualízalo en el frontend si es necesario.
- Para producción, recuerda cambiar las variables sensibles y usar HTTPS.

---
