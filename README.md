# PracticantesApp

## Descripción

PracticantesApp es una aplicación web diseñada para la gestión integral de practicantes o pasantes. Permite administrar información de los practicantes, sus carreras, asistencias, usuarios del sistema y más. La aplicación está construida con Node.js, Express, Sequelize y utiliza EJS para las vistas.

## Características Principales

- **Gestión de Practicantes:** CRUD completo para la información de los practicantes, incluyendo datos personales, académicos y de contacto.
- **Gestión de Carreras:** Administración de las carreras a las que pueden pertenecer los practicantes.
- **Registro de Asistencias:** Seguimiento de la asistencia de los practicantes.
- **Autenticación de Usuarios:** Sistema de inicio de sesión y registro para usuarios (administradores y practicantes).
- **Dashboard:** Panel de control con información relevante y accesos directos.
- **Gestión de Documentos:** (Inferido de `tipos_documentoModel.js`) Posibilidad de manejar diferentes tipos de documentos de identificación.
- **Subida de Archivos:** Funcionalidad para subir imágenes de perfil para practicantes y usuarios, e imágenes para carreras.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Base de Datos:** MySQL
- **ORM:** Sequelize
- **Motor de Plantillas:** EJS (Embedded JavaScript templates)
- **Autenticación:** Passport.js
- **Manejo de Archivos:** Multer (para subida de archivos)
- **Frontend:** HTML, CSS, JavaScript

## Estructura del Proyecto

```
practicantesapp/
├── app.js                # Archivo principal de la aplicación
├── package.json          # Dependencias y scripts del proyecto
├── .env                  # Archivo de variables de entorno (debe ser creado)
├── .gitignore            # Archivos y carpetas ignorados por Git
├── README.md             # Este archivo
└── src/
    ├── config/           # Configuración de base de datos (db.sql, sequelize.js) y scripts (script.sql)
    ├── controllers/      # Lógica de negocio y manejo de peticiones
    ├── middlewares/      # Middlewares personalizados (autenticación, subida de archivos)
    ├── models/           # Definiciones de los modelos de Sequelize
    ├── public/           # Archivos estáticos (CSS, JS, imágenes)
    ├── routes/           # Definición de las rutas de la API
    └── views/            # Plantillas EJS para la interfaz de usuario
```

## Instalación y Configuración

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local:

1.  **Clonar el Repositorio:**

    ```powershell
    git clone <URL_DEL_REPOSITORIO>
    cd practicantesapp
    ```

2.  **Instalar Dependencias:**

    ```powershell
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    Crea un archivo `.env` en la raíz del proyecto. Este archivo es ignorado por Git (ver `.gitignore`).
    Puedes basarte en un archivo `.env.example` si existe, o añadir las siguientes variables (ajusta los valores según tu configuración):

    ```env
    DB_HOST=localhost
    DB_USER=tu_usuario_db
    DB_PASSWORD=tu_contraseña_db
    DB_NAME=practicantesapp
    DB_PORT=3306
    SESSION_SECRET=tu_secreto_de_sesion
    PORT=3000 # O el puerto que prefieras
    ```

4.  **Configurar la Base de Datos:**

    - Asegúrate de tener un servidor MySQL en ejecución.
    - Crea la base de datos `practicantesapp` si aún no existe.
    - Ejecuta el script SQL para crear las tablas. Puedes encontrarlo en `src/config/db.sql`.
      ```sql
      -- Ejemplo de cómo ejecutarlo desde la línea de comandos de MySQL:
      -- mysql -u tu_usuario_db -p tu_contraseña_db practicantesapp < src/config/db.sql
      ```
    - Si tienes un script de inserción de datos iniciales (ej. `src/config/script.sql`), ejecútalo también.

5.  **Ejecutar la Aplicación:**

    ```powershell
    npm start
    ```

    O si usas `nodemon` para desarrollo:

    ```powershell
    npm run dev
    ```

    (Asegúrate de tener el script `dev` definido en tu `package.json`, ej: `"dev": "nodemon app.js"`)

    La aplicación debería estar disponible en `http://localhost:PUERTO` (donde `PUERTO` es el valor que configuraste en `.env` o el predeterminado).

## Uso

Una vez que la aplicación esté en ejecución:

- Accede a la URL en tu navegador.
- Regístrate como un nuevo usuario o inicia sesión si ya tienes credenciales.
- Explora las diferentes secciones para gestionar practicantes, carreras, asistencias, etc.

## Scripts SQL

- `src/config/db.sql`: Contiene las sentencias `CREATE TABLE` para definir la estructura de la base de datos.
- `src/config/script.sql`: (Si existe) Puede contener sentencias `INSERT` para poblar la base de datos con datos iniciales o de prueba.
