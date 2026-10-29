
# Sistema de Gestión de Soporte Técnico

Aplicación web desarrollada para registrar, consultar, editar y eliminar tickets de soporte técnico. El sistema permite administrar solicitudes, visualizar su información y actualizar su prioridad y estado.

## Tecnologías utilizadas

- Angular 22
- Node.js
- Express
- MySQL / MariaDB
- TypeScript
- HTML y CSS

## Funcionalidades

- Registrar nuevos tickets de soporte.
- Consultar los tickets registrados.
- Editar la información de un ticket.
- Eliminar tickets con confirmación.
- Asignar categorías a las solicitudes.
- Definir prioridades: Alta, Media y Baja.
- Gestionar estados: Pendiente, En proceso y Finalizado.
- Validar los campos del formulario.

## Requisitos previos

Para ejecutar el proyecto se necesita tener instalado:

- Node.js y npm.
- Angular CLI.
- XAMPP con MySQL o MariaDB.
- Visual Studio Code (recomendado).

## Configuración de la base de datos

1. Iniciar el servidor MariaDB o MySQL.
2. Crear una base de datos llamada `soporte_tecnico`.
3. Ejecutar el siguiente código SQL para crear la tabla:

```sql
CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asunto VARCHAR(150) NOT NULL,
    solicitante VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    prioridad ENUM('Alta', 'Media', 'Baja') NOT NULL,
    estado ENUM('Pendiente', 'En proceso', 'Finalizado')
        NOT NULL DEFAULT 'Pendiente',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Configuración del backend

1. Abrir una terminal dentro de la carpeta `backend`.
2. Instalar las dependencias:

```bash
npm install
```

3. Crear el archivo `.env` con la configuración de la base de datos:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3308
DB_USER=root
DB_PASSWORD=
DB_NAME=soporte_tecnico
```

4. Iniciar el servidor:

```bash
node server.js
```

El backend estará disponible en `http://localhost:3000`.

**Nota:** La configuración anterior corresponde al entorno local utilizado durante el desarrollo. Si se utiliza otro puerto o contraseña, se deben modificar los valores del archivo `.env`.

## Configuración del frontend

1. Abrir otra terminal dentro de la carpeta `frontend`.
2. Instalar las dependencias:

```bash
npm install
```

3. Iniciar Angular:

```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200`.

## Pruebas realizadas

Se probaron las operaciones principales del sistema:

- GET: consultar los tickets registrados.
- POST: registrar un nuevo ticket.
- PUT: modificar los datos de un ticket.
- DELETE: eliminar un ticket.

También se verificó que los cambios realizados desde la aplicación se reflejaran correctamente en la base de datos.

## Estructura del proyecto

```text
sistema-soporte-tecnico/
│
├── backend/
│   ├── database.js
│   ├── server.js
│   └── .env
│
├── database/
│
├── frontend/
│   └── src/
│       └── app/
│           ├── components/
│           └── services/
│
└── README.md
```

## Uso de Inteligencia Artificial

Durante el desarrollo del proyecto se utilizó ChatGPT como herramienta de apoyo para resolver dudas, recibir orientación paso a paso, comprender partes del código, corregir errores y revisar configuraciones y documentación.

Las sugerencias recibidas fueron revisadas, adaptadas e implementadas durante el desarrollo. Además, se realizaron pruebas para comprobar el funcionamiento de las funcionalidades y la conexión con la base de datos.

## Estado del proyecto

En desarrollo.
