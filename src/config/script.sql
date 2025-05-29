
INSERT INTO usuarios (nombre, correo, contrasena, rol, activo, creado_en, actualizado_en, token_recuperacion, expiracion_token, intentos_recuperacion, imagen_perfil, practicante_id) 
VALUES ('ed', 'ed@ed.com', '$2b$10$EAZZ4LYqfdStZe7nK5Se7.JieWbFxdAthVCrwFFHNRcjZ0RGZHAB.', 'admin', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, NULL, 0, NULL, NULL);

select * from practicantes;
select * from carreras;

INSERT INTO carreras (nombre, imagen, descripcion, activo) 
VALUES 
('Ingeniería en Sistemas', 'sistemas.jpg', 'Carrera enfocada en el desarrollo de software y sistemas informáticos.', TRUE),
('Administración de Empresas', 'administracion.jpg', 'Carrera orientada a la gestión y administración de recursos empresariales.', TRUE),
('Diseño Gráfico', 'diseno.jpg', 'Carrera centrada en la creación de contenido visual y diseño digital.', TRUE),
('Contaduría Pública', 'contaduria.jpg', 'Carrera especializada en la gestión financiera y contable de organizaciones.', TRUE),
('Ingeniería Civil', 'civil.jpg', 'Carrera dedicada al diseño y construcción de infraestructura y obras civiles.', TRUE);

INSERT INTO tipos_documento (id, tipo) 
VALUES 
(1, 'DNI'),
(2, 'Cédula de Ciudadanía'),
(3, 'Pasaporte'),
(4, 'Cédula de Extranjería'),
(5, 'Otro');

INSERT INTO practicantes (
    id, nombre, tipo_documento_id, numero_documento, email, telefono, 
    centro_estudio, direccion, genero, fecha_nacimiento, carrera_id, 
    fecha_inicio, fecha_fin, foto_perfil, observaciones, activo
) 
VALUES 
(1, 'Juan Pérez', 1, '123456789', 'juan.perez@example.com', '555-1234', 
    'Universidad Nacional', 'Calle 123 #45-67', 'masculino', '1995-05-10', 1, 
    '2025-01-15', NULL, 'juan.jpg', 'Practicante destacado en desarrollo web.', TRUE),
(2, 'María Gómez', 2, '987654321', 'maria.gomez@example.com', '555-5678', 
    'Universidad de los Andes', 'Carrera 10 #20-30', 'femenino', '1998-03-22', 2, 
    '2025-02-01', '2025-06-30', 'maria.jpg', 'Interesada en gestión empresarial.', TRUE),
(3, 'Carlos López', 3, '1122334455', 'carlos.lopez@example.com', '555-9876', 
    'Universidad Javeriana', 'Avenida 50 #60-70', 'masculino', '1997-07-15', 1, 
    '2025-03-01', NULL, 'carlos.jpg', 'Especialista en bases de datos.', TRUE),
(4, 'Ana Martínez', 4, '5566778899', 'ana.martinez@example.com', '555-4321', 
    'Universidad del Norte', 'Calle 80 #90-100', 'femenino', '1999-11-05', 3, 
    '2025-04-01', '2025-08-31', 'ana.jpg', 'Creativa en diseño gráfico.', TRUE),
(5, 'Laura Torres', 1, '2233445566', 'laura.torres@example.com', '555-1111', 
    'Universidad Nacional', 'Calle 12 #34-56', 'femenino', '1996-02-14', 2, 
    '2025-01-10', NULL, 'laura.jpg', 'Interesada en inteligencia artificial.', TRUE),
(6, 'Pedro Castillo', 2, '3344556677', 'pedro.castillo@example.com', '555-2222', 
    'Universidad de Antioquia', 'Carrera 15 #25-35', 'masculino', '1995-08-20', 1, 
    '2025-02-01', '2025-07-31', 'pedro.jpg', 'Especialista en redes y seguridad.', TRUE),
(7, 'Sofía Ramírez', 3, '4455667788', 'sofia.ramirez@example.com', '555-3333', 
    'Universidad del Valle', 'Avenida 40 #50-60', 'femenino', '1997-12-05', 3, 
    '2025-03-01', NULL, 'sofia.jpg', 'Apasionada por el desarrollo móvil.', TRUE),
(8, 'Diego Vargas', 4, '5566778890', 'diego.vargas@example.com', '555-4444', 
    'Universidad de los Andes', 'Calle 70 #80-90', 'masculino', '1996-06-18', 2, 
    '2025-04-01', '2025-09-30', 'diego.jpg', 'Interesado en análisis de datos.', TRUE),
(9, 'Valeria Cruz', 1, '6677889901', 'valeria.cruz@example.com', '555-5555', 
    'Universidad Javeriana', 'Carrera 20 #30-40', 'femenino', '1998-01-25', 1, 
    '2025-05-01', NULL, 'valeria.jpg', 'Especialista en marketing digital.', TRUE),
(10, 'Luis Gómez', 2, '7788990012', 'luis.gomez@example.com', '555-6666', 
    'Universidad del Norte', 'Avenida 60 #70-80', 'masculino', '1995-03-10', 3, 
    '2025-06-01', '2025-11-30', 'luis.jpg', 'Interesado en desarrollo de videojuegos.', TRUE),
(11, 'Camila Fernández', 3, '8899001123', 'camila.fernandez@example.com', '555-7777', 
    'Universidad Nacional', 'Calle 90 #100-110', 'femenino', '1999-09-15', 2, 
    '2025-07-01', NULL, 'camila.jpg', 'Apasionada por la robótica.', TRUE),
(12, 'Andrés Pérez', 4, '9900112234', 'andres.perez@example.com', '555-8888', 
    'Universidad de Antioquia', 'Carrera 25 #35-45', 'masculino', '1997-04-22', 1, 
    '2025-08-01', '2025-12-31', 'andres.jpg', 'Especialista en sistemas embebidos.', TRUE),
(13, 'Isabella López', 1, '1122334456', 'isabella.lopez@example.com', '555-9999', 
    'Universidad del Valle', 'Avenida 50 #60-70', 'femenino', '1996-11-30', 3, 
    '2025-09-01', NULL, 'isabella.jpg', 'Interesada en diseño UX/UI.', TRUE),
(14, 'Javier Morales', 2, '2233445567', 'javier.morales@example.com', '555-0000', 
    'Universidad de los Andes', 'Calle 100 #110-120', 'masculino', '1998-07-10', 2, 
    '2025-10-01', '2026-03-31', 'javier.jpg', 'Apasionado por la inteligencia empresarial.', TRUE);
INSERT INTO practicantes (
    id, nombre, tipo_documento_id, numero_documento, email, telefono, 
    centro_estudio, direccion, genero, fecha_nacimiento, carrera_id, 
    fecha_inicio, fecha_fin, foto_perfil, observaciones, activo
) 
VALUES 
(15, 'Gabriela Torres', 1, '3344556678', 'gabriela.torres@example.com', '555-1010', 
    'Universidad Nacional', 'Calle 15 #20-25', 'femenino', '1997-05-12', 1, 
    '2025-01-01', NULL, 'gabriela.jpg', 'Interesada en inteligencia artificial.', TRUE),
(16, 'Fernando Castillo', 2, '4455667789', 'fernando.castillo@example.com', '555-2020', 
    'Universidad de Antioquia', 'Carrera 30 #40-50', 'masculino', '1996-08-15', 2, 
    '2025-02-01', '2025-07-31', 'fernando.jpg', 'Especialista en redes y seguridad.', TRUE),
(17, 'Lucía Ramírez', 3, '5566778891', 'lucia.ramirez@example.com', '555-3030', 
    'Universidad del Valle', 'Avenida 60 #70-80', 'femenino', '1998-12-10', 3, 
    '2025-03-01', NULL, 'lucia.jpg', 'Apasionada por el desarrollo móvil.', TRUE),
(18, 'Daniel Vargas', 4, '6677889902', 'daniel.vargas@example.com', '555-4040', 
    'Universidad de los Andes', 'Calle 80 #90-100', 'masculino', '1995-06-20', 1, 
    '2025-04-01', '2025-09-30', 'daniel.jpg', 'Interesado en análisis de datos.', TRUE),
(19, 'Carolina Cruz', 1, '7788990013', 'carolina.cruz@example.com', '555-5050', 
    'Universidad Javeriana', 'Carrera 50 #60-70', 'femenino', '1999-01-25', 2, 
    '2025-05-01', NULL, 'carolina.jpg', 'Especialista en marketing digital.', TRUE),
(20, 'Miguel Gómez', 2, '8899001124', 'miguel.gomez@example.com', '555-6060', 
    'Universidad del Norte', 'Avenida 70 #80-90', 'masculino', '1996-03-10', 3, 
    '2025-06-01', '2025-11-30', 'miguel.jpg', 'Interesado en desarrollo de videojuegos.', TRUE),
(21, 'Paula Fernández', 3, '9900112235', 'paula.fernandez@example.com', '555-7070', 
    'Universidad Nacional', 'Calle 100 #110-120', 'femenino', '1998-09-15', 1, 
    '2025-07-01', NULL, 'paula.jpg', 'Apasionada por la robótica.', TRUE),
(22, 'Andrés Morales', 4, '1122334457', 'andres.morales@example.com', '555-8080', 
    'Universidad de Antioquia', 'Carrera 60 #70-80', 'masculino', '1997-04-22', 2, 
    '2025-08-01', '2025-12-31', 'andres.jpg', 'Especialista en sistemas embebidos.', TRUE),
(23, 'Isabel López', 1, '2233445568', 'isabel.lopez@example.com', '555-9090', 
    'Universidad del Valle', 'Avenida 80 #90-100', 'femenino', '1996-11-30', 3, 
    '2025-09-01', NULL, 'isabel.jpg', 'Interesada en diseño UX/UI.', TRUE),
(24, 'Javier Pérez', 2, '3344556679', 'javier.perez@example.com', '555-0101', 
    'Universidad de los Andes', 'Calle 120 #130-140', 'masculino', '1998-07-10', 1, 
    '2025-10-01', '2026-03-31', 'javier.jpg', 'Apasionado por la inteligencia empresarial.', TRUE),
(25, 'Natalia Torres', 1, '4455667780', 'natalia.torres@example.com', '555-1112', 
    'Universidad Nacional', 'Calle 140 #150-160', 'femenino', '1997-05-12', 2, 
    '2025-01-01', NULL, 'natalia.jpg', 'Interesada en inteligencia artificial.', TRUE),
(26, 'Carlos Castillo', 2, '5566778892', 'carlos.castillo@example.com', '555-2223', 
    'Universidad de Antioquia', 'Carrera 170 #180-190', 'masculino', '1996-08-15', 3, 
    '2025-02-01', '2025-07-31', 'carlos.jpg', 'Especialista en redes y seguridad.', TRUE),
(27, 'Sofía Vargas', 3, '6677889903', 'sofia.vargas@example.com', '555-3334', 
    'Universidad del Valle', 'Avenida 200 #210-220', 'femenino', '1998-12-10', 1, 
    '2025-03-01', NULL, 'sofia.jpg', 'Apasionada por el desarrollo móvil.', TRUE),
(28, 'Diego Ramírez', 4, '7788990014', 'diego.ramirez@example.com', '555-4445', 
    'Universidad de los Andes', 'Calle 230 #240-250', 'masculino', '1995-06-20', 2, 
    '2025-04-01', '2025-09-30', 'diego.jpg', 'Interesado en análisis de datos.', TRUE),
(29, 'Valeria Cruz', 1, '8899001125', 'valeria.cruz2@example.com', '555-5556', 
    'Universidad Javeriana', 'Carrera 260 #270-280', 'femenino', '1999-01-25', 3, 
    '2025-05-01', NULL, 'valeria2.jpg', 'Especialista en marketing digital.', TRUE),
(30, 'Luis Gómez', 2, '9900112236', 'luis.gomez2@example.com', '555-6667', 
    'Universidad del Norte', 'Avenida 290 #300-310', 'masculino', '1996-03-10', 1, 
    '2025-06-01', '2025-11-30', 'luis2.jpg', 'Interesado en desarrollo de videojuegos.', TRUE),
(31, 'Camila Fernández', 3, '1122334458', 'camila.fernandez2@example.com', '555-7778', 
    'Universidad Nacional', 'Calle 320 #330-340', 'femenino', '1998-09-15', 2, 
    '2025-07-01', NULL, 'camila2.jpg', 'Apasionada por la robótica.', TRUE),
(32, 'Andrés Pérez', 4, '2233445569', 'andres.perez2@example.com', '555-8889', 
    'Universidad de Antioquia', 'Carrera 350 #360-370', 'masculino', '1997-04-22', 3, 
    '2025-08-01', '2025-12-31', 'andres2.jpg', 'Especialista en sistemas embebidos.', TRUE),
(33, 'Isabella López', 1, '3344556680', 'isabella.lopez2@example.com', '555-9990', 
    'Universidad del Valle', 'Avenida 380 #390-400', 'femenino', '1996-11-30', 1, 
    '2025-09-01', NULL, 'isabella2.jpg', 'Interesada en diseño UX/UI.', TRUE),
(34, 'Javier Morales', 2, '4455667781', 'javier.morales2@example.com', '555-0001', 
    'Universidad de los Andes', 'Calle 410 #420-430', 'masculino', '1998-07-10', 2, 
    '2025-10-01', '2026-03-31', 'javier2.jpg', 'Apasionado por la inteligencia empresarial.', TRUE);
INSERT INTO practicantes (
    id, nombre, tipo_documento_id, numero_documento, email, telefono, 
    centro_estudio, direccion, genero, fecha_nacimiento, carrera_id, 
    fecha_inicio, fecha_fin, foto_perfil, observaciones, activo
) 
VALUES
(36, 'Javi Morales', 2, '452567781', 'javier.morales22222@example.com', '5552-0001', 
    'Universidad de los Andes', 'Calle 410 #420-430', 'masculino', '1998-07-10', 2, 
    '2025-10-01', '2026-03-31', 'javier2.jpg', 'Apasionado por la inteligencia empresarial.', FALSE);

INSERT INTO tipos_permiso (id, tipo) 
VALUES 
(1, 'Permiso por enfermedad'),
(2, 'Permiso personal'),
(3, 'Permiso académico'),
(4, 'Permiso por calamidad doméstica'),
(5, 'Permiso sin justificación');

INSERT INTO asistencias (
    practicante_id, fecha, hora_entrada, hora_salida, estado, tipo_permiso_id, hora_entrada_modificada, observaciones
) 
VALUES 
(1, '2025-05-10', '08:00:00', '16:00:00', 'presente', 1, NULL, 'Asistencia normal.'),
(2, '2025-05-10', '08:15:00', '16:00:00', 'tarde', 1, '08:00:00', 'Llegó tarde, pero se justificó.'),
(3, '2025-05-10', NULL, NULL, 'permiso', 2, NULL, 'Permiso personal solicitado.'),
(4, '2025-05-10', NULL, NULL, 'ausente', 1, NULL, 'No asistió y no justificó.');

INSERT INTO evidencias (
    practicante_id, archivo, tipo, descripcion, fecha, activo
) 
VALUES 
(1, 'tarea1.pdf', 'pdf', 'Evidencia de la primera tarea entregada.', '2025-05-10', TRUE),
(2, 'proyecto_final.jpg', 'imagen', 'Imagen del proyecto final presentado.', '2025-05-09', TRUE),
(3, 'informe.pdf', 'pdf', 'Informe de actividades realizadas.', '2025-05-08', TRUE),
(4, 'diseño.jpg', 'imagen', 'Diseño gráfico entregado como evidencia.', '2025-05-07', TRUE);


