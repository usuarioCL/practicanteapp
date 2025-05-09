INSERT INTO usuarios (nombre, email, password, rol)
VALUES ('admin', 'admin@example.com', '$10$EAZZ4LYqfdStZe7nK5Se7.JieWbFxdAthVCrwFFHNRcjZ0RGZHAB.', 'admin');
INSERT INTO usuarios (nombre, email, password, rol)
VALUES ('ed', 'ed01@ed.com', '$2b$10$EAZZ4LYqfdStZe7nK5Se7.JieWbFxdAthVCrwFFHNRcjZ0RGZHAB.', 'admin');

-- $10$AsVr7.f7idee1ZoKFRbls.cUBN67v9aKIrCXADcIfmteQ3ajbQi9i
select * from usuarios;
select * from usuarios;
select * from carreras;
INSERT INTO carreras (nombre) VALUES ('Ingeniería Civil'), ('Medicina'), ('Derecho');

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

INSERT INTO carreras (nombre, imagen) VALUES ('Nombre de prueba', 'imagen.jpg');