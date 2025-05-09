-- Crear la base de datos
CREATE DATABASE practicantesapp;
-- Usar la base de datos
USE practicantesapp;

-- Tabla: usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'practicante') NOT NULL
);

-- Tabla: carreras
CREATE TABLE carreras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla: practicantes
CREATE TABLE practicantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    carrera_id INT NOT NULL,
    FOREIGN KEY (carrera_id) REFERENCES carreras(id)
        ON DELETE CASCADE
);
ALTER TABLE practicantes ADD COLUMN fecha_inicio DATE;

-- Tabla: asistencias
CREATE TABLE asistencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    practicante_id INT NOT NULL,
    fecha DATE NOT NULL,
    hora_entrada TIME NOT NULL,
    hora_salida TIME,
    FOREIGN KEY (practicante_id) REFERENCES practicantes(id)
        ON DELETE CASCADE
);

-- Tabla: evidencias
CREATE TABLE evidencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    practicante_id INT NOT NULL,
    archivo VARCHAR(255) NOT NULL,
    tipo ENUM('pdf', 'imagen') NOT NULL,
    fecha DATE NOT NULL,
    FOREIGN KEY (practicante_id) REFERENCES practicantes(id)
        ON DELETE CASCADE
);

<<<<<<< HEAD
-- ed
-- ed@ed.com
-- $10$EAZZ4LYqfdStZe7nK5Se7.JieWbFxdAthVCrwFFHNRcjZ0RGZHAB.
=======
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
>>>>>>> 1ea313e (Asistencias)
