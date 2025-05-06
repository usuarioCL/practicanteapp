const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const authRoutes = require('./src/routes/authRoutes'); 
const Usuario = require('./src/models/usuarioModel'); 
const bcrypt = require('bcryptjs'); 
const dashboardRoutes = require('./src/routes/dashboardRoutes');
const carreraRoutes = require('./src/routes/carreraRoutes');
const practicanteRoutes = require('./src/routes/practicanteRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');


const app = express();

const methodOverride = require('method-override');

// Middleware para sobrescribir métodos HTTP
app.use(methodOverride('_method'));

// Configurar el motor de vistas
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('./src/public')); // Carpeta para archivos estáticos

// Middleware para analizar datos del formulario
app.use(express.urlencoded({ extended: true }));

// Configurar sesiones
app.use(session({
    secret: 'mi_secreto',
    resave: false,
    saveUninitialized: true
}));

// Configurar connect-flash
app.use(flash());

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Configuración de la estrategia local
passport.use(new LocalStrategy({
    usernameField: 'email', 
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        // Busca al usuario por correo
        const user = await Usuario.findByEmail(email);
        if (!user) {
            return done(null, false, { message: 'Correo no registrado' });
        }

        // Verifica la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Contraseña incorrecta' });
        }

        // Si todo es correcto, retorna el usuario
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

// Serializar el usuario (guardar el ID en la sesión)
passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
});

// Deserializar el usuario (buscar el usuario por ID)
passport.deserializeUser(async (id, done) => {
    try {
        const usuario = await Usuario.findById(id); // Busca el usuario por ID
        done(null, usuario);
    } catch (error) {
        done(error);
    }
});

// Usar las rutas de autenticación
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