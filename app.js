// Importar módulos y dependencias
const express = require('express');
const session = require('express-session');
const passport = require('./src/middlewares/passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const bcrypt = require('bcryptjs');
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

// Configuración de la estrategia local de Passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await Usuario.findOne({ where: { correo: email } }); // Usar Sequelize para buscar al usuario
        if (!user) return done(null, false, { message: 'El correo no está registrado.' });
        if (!user.contrasena) return done(null, false, { message: 'El usuario no tiene una contraseña configurada.' });

        const isMatch = await bcrypt.compare(password, user.contrasena);
        if (!isMatch) return done(null, false, { message: 'La contraseña es incorrecta.' });

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

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

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
    res.status(404).render('404', { title: 'Página no encontrada' });
});

// Middleware para manejar errores del servidor
app.use((err, req, res, next) => {
    console.error('Error del servidor:', err);
    res.status(500).render('500', { title: 'Error del servidor', error: err.message });
});


// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});