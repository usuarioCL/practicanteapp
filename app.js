// Importar módulos y dependencias
const express = require('express');
const session = require('express-session');
const passport = require('./src/middlewares/passport'); // Asegúrate de que la ruta sea correcta
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const bcrypt = require('bcryptjs');
const methodOverride = require('method-override');
const path = require('path');

// Importar rutas
const authRoutes = require('./src/routes/authRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');
const carreraRoutes = require('./src/routes/carreraRoutes');
const practicanteRoutes = require('./src/routes/practicanteRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');

// Importar modelos
const Usuario = require('./src/models/usuarioModel');

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
    secret: 'mi_secreto',
    resave: false,
    saveUninitialized: false
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
        const user = await Usuario.findByEmail(email);

        if (!user) {
            return done(null, false, { message: 'Correo no registrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Contraseña incorrecta' });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

// Middleware para pasar mensajes flash y el rol del usuario a las vistas
app.use((req, res, next) => {
   
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.userRole = req.user ? req.user.rol : null; // Asegúrate de usar "rol"
    next();
});

// Usar las rutas de la aplicación
app.use('/', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/carreras', carreraRoutes);
app.use('/practicantes', practicanteRoutes);
app.use('/usuarios', usuarioRoutes);

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});