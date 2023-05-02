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

function getRegistroConsultas() {
    return admin.firestore().collection('registroConsultas')
}

async function procesarGET(req, res) {
    try {
        const querySnapshot = await getRegistroConsultas().get();
        const documentos = querySnapshot.docs.map( d => {
            return d.data();
        });
        return documentos;
    } catch (error) {
        res.code(500).send({error:error.message})
    }
}

async function procesarPOST(req, res) {
    try {
        const { nombreIndicador, fechaConsultada } = req.body;
        const consulta = {
            nombreIndicador,
            fechaConsultada
        }
        const documento = await getRegistroConsultas().doc();
        const id = documento.id;
        documento.set(consulta);
        consulta.id = id;
        return consulta;

    } catch (error) {
        res.code(500).send({error: error.message})
    }
}

async function procesarPUT(req, res) {
    try {
        const { nombreIndicador, fechaConsultada, id } = req.body;
        const consulta = {
            nombreIndicador,
            fechaConsultada
        }
        const documento = await getRegistroConsultas().doc(id);
        documento.update(consulta);
        return consulta;
    } catch (error) {
        res.code(500).send({error: error.message})
    }
}

async function procesarDELETE(req, res) {
    try {
        const id =req.query.id;
        const docRef = getRegistroConsultas().doc(id);
        await docRef.delete();
        return {borrado: true}
    } catch(error){
        return {borrado: false, mensaje: error.message}
    }
}