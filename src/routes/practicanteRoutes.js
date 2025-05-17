const express = require('express');
const practicanteController = require('../controllers/practicanteController');
const { isAuthenticated, isAdmin } = require('../middlewares/isAdmin'); // Middlewares de autenticación y autorización
const router = express.Router();
const multer = require('multer');
const path = require('path');
// Configuración de almacenamiento personalizado
const practicantes_img = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/practicantes')); // Carpeta de destino
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname); // Nombre único para el archivo
    }
});
const upload = multer({storage: practicantes_img });

// Rutas para los practicantes
router.get('/', isAuthenticated, practicanteController.list); // Listar todos los practicantes
router.get('/create', isAuthenticated, isAdmin, practicanteController.renderCreateForm); // Renderizar formulario de creación
router.get('/:id', isAuthenticated, practicanteController.show); // Mostrar detalles de un practicante
router.get('/edit/:id',isAuthenticated, practicanteController.edit);

router.post('/',upload.single('foto_perfil'), isAuthenticated,practicanteController.create); // Crear un nuevo practicante
router.put('/update/:id',upload.single('foto_perfil'), isAuthenticated, isAdmin, practicanteController.update); // Actualizar un practicante
router.delete('/delete/:id', isAuthenticated, isAdmin, practicanteController.delete); // Eliminar un practicante
router.post('/:id/toggle', practicanteController.toggleState); // Cambiar el estado de un practicante

module.exports = router;
