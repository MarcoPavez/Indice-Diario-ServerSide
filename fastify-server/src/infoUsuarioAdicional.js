const { admin } = require('./firebase');

module.exports = async (req, res) => {
    switch (req.method) {
        case 'GET':
            return procesarGET(req, res);
        case 'POST':
            return procesarPOST(req, res);
        case 'PUT':
            return procesarPUT(req, res);
        case 'DELETE':
            return procesarDELETE(req, res);
        default:
            res.code(500).send({ error: "Método HTTP no soportado" })
    }
};

function getInfoAdicional() {
    return admin.firestore().collection('infoUsuarioAdicional')
}

async function procesarGET(req, res) {
    try {
        const querySnapshot = await getInfoAdicional().get();
        const documentos = querySnapshot.docs.map( d => {
            return d.data();
        });
        console.log(documentos)
        return documentos;
        
    } catch (error) {
        res.code(500).send({error:error.message})
    }
}

async function procesarPOST(req, res) {
    try {
        const { nombre, apellido, nombreUsuario, correo, genero, fechaNacimiento, paisResidencia } = req.body;
        const infoUsuario = {
            nombre,
            apellido,
            nombreUsuario,
            correo,
            genero,
            fechaNacimiento,
            paisResidencia,
        }
        const documento = await getInfoAdicional().doc();
        const id = documento.id;
        documento.set(infoUsuario);
        infoUsuario.id = id;
        return infoUsuario;

    } catch (error) {
        res.code(500).send({error: error.message})
    }
}

async function procesarPUT(req, res) {
    try {
        const { nombre, apellido, nombreUsuario, correo, genero, fechaNacimiento, paisResidencia } = req.body;
        const infoUsuario = {
            nombre,
            apellido,
            nombreUsuario,
            correo,
            genero,
            fechaNacimiento,
            paisResidencia,
        }
        const documento = await getInfoAdicional().doc(id);
        documento.update(infoUsuario);
        return infoUsuario;
    } catch (error) {
        res.code(500).send({error: error.message})
    }
}

async function procesarDELETE(req, res) {
    try {
        const id = req.query.id;
        const docRef = getInfoAdicional().doc(id);
        await docRef.delete();
        return {borrado: true}
    } catch(error){
        return {borrado: false, mensaje: error.message}
    }
}