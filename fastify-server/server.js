const fastify = require('fastify')({ logger: true })
fastify.register(require('@fastify/cors'), {});

fastify.post('/registro', require('./src/registroServer'));
fastify.post('/ingreso', require('./src/ingresoServer'));
fastify.get('/usuario/verificarToken', require('./src/verificarToken')); 

fastify.route({
  method: ['GET', 'POST', 'PUT', 'DELETE'],
  url: '/registro-consultas',
  handler: require('./src/registroConsultas')
})

fastify.route({
  method: ['GET', 'POST', 'PUT', 'DELETE'],
  url: '/infoUsuarioAdicional',
  handler: require('./src/infoUsuarioAdicional')
})

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()