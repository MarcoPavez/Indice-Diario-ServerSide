const { app } = require("./firebase");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth")


module.exports = async (req, res) => {
    const { correo, contrasena } = req.body;

    try {
        const usuario = await signInWithEmailAndPassword(getAuth(), correo, contrasena);
        return usuario;
    } catch (error) {
        switch( error.code ) {
            case 'auth/invalid-email':
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                return res.code(401).send({
                    codigo: error.code,
                    mensaje: error.message
                });
            default:
                res.code(500).send({
                    codigo: error.code,
                    mensaje: error.message
                })
        }
    }
}