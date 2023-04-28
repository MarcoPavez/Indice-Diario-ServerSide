const { admin } = require("./firebase")

module.exports = async (req, res) => {

    const {correo, contrasena } = req.body

    try {

        const usuario = await admin.auth().createUser({
            email: correo,
            password: contrasena,
        });

        return usuario;
        
    } catch (error) {
        res.code(500).send({error: "error al crear usuario"})
    }
}