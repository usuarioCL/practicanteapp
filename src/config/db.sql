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

-- ed
-- ed@ed.com
-- $10$EAZZ4LYqfdStZe7nK5Se7.JieWbFxdAthVCrwFFHNRcjZ0RGZHAB.