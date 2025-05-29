// Importar módulos y dependencias
const express = require('express');
const session = require('express-session');
const passport = require('./src/middlewares/passport');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const path = require('path');

// Importar Sequelize y modelos
const sequelize = require('./src/config/sequelize'); // Configuración de Sequelize
const { Usuario } = require('./src/models'); // Importar modelos desde el archivo centralizado

// Importar rutas
const authRoutes = require('./src/routes/authRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');
const carreraRoutes = require('./src/routes/carreraRoutes');
const practicanteRoutes = require('./src/routes/practicanteRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const asistenciaRoutes = require('./src/routes/asistenciaRoutes');

// Inicializar la aplicación
const app = express();

// Configurar el motor de vistas
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Configurar archivos estáticos
app.use(express.static(path.join(__dirname, './src/public')));

// Middleware para sobrescribir métodos HTTP
app.use(methodOverride('_method'));

// Middleware para analizar datos del formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar sesiones
app.use(session({
    secret: 'mi_secreto_seguro',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 día   
    }
}));

// Configurar connect-flash
app.use(flash());

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware para pasar mensajes flash y datos del usuario a las vistas
app.use((req, res, next) => {
    res.locals.errorMessage = req.flash('error');
    res.locals.successMessage = req.flash('success');
    res.locals.userRole = req.user ? req.user.rol : null; // Pasa el rol del usuario si está autenticado
    next();
});

// Usar las rutas de la aplicación
app.use('/', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/carreras', carreraRoutes);
app.use('/practicantes', practicanteRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/asistencias', asistenciaRoutes);

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
    res.status(404).render('404', { title: 'Página no encontrada' });
});

// Middleware para manejar errores del servidor
app.use((err, req, res, next) => {
    console.error('Error del servidor:', err);
    res.status(500).render('500', { title: 'Error del servidor', error: err.message });
});

// Usar las rutas de autenticación
app.use('/', authRoutes); 
app.use('/dashboard', dashboardRoutes);
app.use('/carreras', carreraRoutes);
app.use('/practicantes', practicanteRoutes);
app.use('/asistencias', asistenciaRoutes);
app.use('/usuarios', usuarioRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});