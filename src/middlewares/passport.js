// Serialización del usuario
passport.serializeUser((user, done) => {
    done(null, user.id); // Serializa solo el ID del usuario
});

// Deserialización del usuario
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id); // Asegúrate de que este método obtenga al usuario completo, incluyendo el campo `rol`
        done(null, user); // Agrega el usuario completo a req.user
    } catch (err) {
        done(err, null);
    }
});