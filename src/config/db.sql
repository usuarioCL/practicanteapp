-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS practicantesapp;
-- Usar la base de datos
USE practicantesapp;

-- Tabla: carreras
CREATE TABLE IF NOT EXISTS carreras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    imagen VARCHAR(255) NOT NULL,
    descripcion TEXT DEFAULT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla: tipos_documento
CREATE TABLE IF NOT EXISTS tipos_documento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla: practicantes
CREATE TABLE IF NOT EXISTS practicantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo_documento_id INT NOT NULL,  -- Relación con la tabla tipos_documento
    numero_documento VARCHAR(20) NOT NULL UNIQUE,  -- Número del documento
    email VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(20) DEFAULT NULL,
    centro_estudio VARCHAR(255) DEFAULT NULL,
    direccion VARCHAR(255) DEFAULT NULL,
    genero ENUM('masculino', 'femenino', 'otro') DEFAULT NULL,
    fecha_nacimiento DATE DEFAULT NULL,
    carrera_id INT NOT NULL,  -- Relación con la tabla carreras
	fecha_inicio DATE NOT NULL,
   fecha_fin DATE DEFAULT NULL,
   foto_perfil VARCHAR(255) DEFAULT NULL,
   observaciones TEXT DEFAULT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
   creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (carrera_id) REFERENCES carreras(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (tipo_documento_id) REFERENCES tipos_documento(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT chk_fecha_inicio_fin CHECK (fecha_fin IS NULL OR fecha_fin > fecha_inicio)  -- Validación de fecha_fin > fecha_inicio
);

-- Tabla: usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,  -- Deberás encriptar la contraseña en tu aplicación antes de almacenarla
    rol ENUM('admin', 'practicante') NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    token_recuperacion VARCHAR(255) DEFAULT NULL,
    expiracion_token DATETIME DEFAULT NULL,  -- Campo para expiración del token
    intentos_recuperacion INT DEFAULT 0,     -- Intentos de recuperación de contraseña
    imagen_perfil VARCHAR(255) DEFAULT NULL, -- Campo para almacenar la ruta de la imagen de perfil
    practicante_id INT DEFAULT NULL,         -- Relación opcional con la tabla practicantes
    FOREIGN KEY (practicante_id) REFERENCES practicantes(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- Tabla: tipos_permiso
CREATE TABLE IF NOT EXISTS tipos_permiso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla: asistencias
CREATE TABLE IF NOT EXISTS asistencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    practicante_id INT NOT NULL,
    fecha DATE NOT NULL,
    hora_entrada TIME NOT NULL,
    hora_salida TIME DEFAULT NULL,
    estado ENUM('presente', 'ausente', 'tarde', 'permiso') NOT NULL DEFAULT 'presente',
    tipo_permiso_id INT NOT NULL,  -- Relación con tipos_permiso
    hora_entrada_modificada TIME DEFAULT NULL,  -- Campo para registrar si la hora de entrada fue modificada
    observaciones TEXT DEFAULT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (practicante_id) REFERENCES practicantes(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (tipo_permiso_id) REFERENCES tipos_permiso(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    UNIQUE (practicante_id, fecha)  -- Unicidad de registros por día
);

-- Tabla: evidencias
CREATE TABLE IF NOT EXISTS evidencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    practicante_id INT NOT NULL,
    archivo VARCHAR(255) NOT NULL,
    tipo ENUM('pdf', 'imagen') NOT NULL,  -- Solo archivos PDF o imagen
    descripcion TEXT DEFAULT NULL,
    fecha DATE NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (practicante_id) REFERENCES practicantes(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
-- Tabla: permisos
-- ed
-- ed@ed.com
-- $10$EAZZ4LYqfdStZe7nK5Se7.JieWbFxdAthVCrwFFHNRcjZ0RGZHAB.

SELECT * FROM usuarios;
INSERT INTO usuarios (id, nombre, email, password,rol) VALUES (1, "Eduardo", "ed@ed.com", "$2b$10$EAZZ4LYqfdStZe7nK5Se7.JieWbFxdAthVCrwFFHNRcjZ0RGZHAB.", "admin");

INSERT INTO carreras (nombre) VALUES 
('Marketing'),
('Ingeniería de Software'),
('Diseño Gráfico'),
('Administración de Empresas');

INSERT INTO practicantes (nombre, email, carrera_id, fecha_inicio)
VALUES
('Juan Pérez', 'juan.perez@example.com', (SELECT id FROM carreras WHERE nombre = 'Marketing'), '2023-01-15'),
('Ana Gómez', 'ana.gomez@example.com', (SELECT id FROM carreras WHERE nombre = 'Marketing'), '2023-02-01'),
('Carlos López', 'carlos.lopez@example.com', (SELECT id FROM carreras WHERE nombre = 'Ingeniería de Software'), '2023-03-10'),
('María Rodríguez', 'maria.rodriguez@example.com', (SELECT id FROM carreras WHERE nombre = 'Ingeniería de Software'), '2023-04-05'),
('Luis Fernández', 'luis.fernandez@example.com', (SELECT id FROM carreras WHERE nombre = 'Diseño Gráfico'), '2023-05-20'),
('Sofía Martínez', 'sofia.martinez@example.com', (SELECT id FROM carreras WHERE nombre = 'Diseño Gráfico'), '2023-06-15'),
('Pedro Sánchez', 'pedro.sanchez@example.com', (SELECT id FROM carreras WHERE nombre = 'Administración de Empresas'), '2023-07-10'),
('Laura Torres', 'laura.torres@example.com', (SELECT id FROM carreras WHERE nombre = 'Administración de Empresas'), '2023-08-01'),
('Jorge Ramírez', 'jorge.ramirez@example.com', (SELECT id FROM carreras WHERE nombre = 'Ingeniería de Software'), '2023-09-12'),
('Claudia Morales', 'claudia.morales@example.com', (SELECT id FROM carreras WHERE nombre = 'Marketing'), '2023-10-05');

