/*
* Fastify API Engine
*/

const fastify = require('fastify')({ logger: true });

fastify.get('/', async (request, reply) => { reply.code(200).send({ response: 'Hello World' }); });

const start = async () => {
  try {
    await fastify.listen(4000);
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};


module.exports = start;
