const { admin } = require('./firebase')

module.exports = async (req,res) => {

    try{
       
        const token = req.headers.authorization.split(' ')[1];
        const usuario = await admin.auth().verifyIdToken(token);
        return {token: 'Token válido'};
    } catch (error) {
        res.code(401).send({token: 'Token inválido', error: error.message})
    }
}