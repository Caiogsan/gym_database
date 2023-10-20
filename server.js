// npm install fastify
// npm install postgres
// teste

import { fastify } from 'fastify'
import { Database } from './database.js'

const server = fastify()
const database = new Database


server.post('/market', async(request, reply) => {
    const { image, title, rate, cost, description } = request.body

    await database.create({
        image,
        title,
        rate,
        cost,
        description
    })

    return reply.status(201).send()
})

server.get('/market', async (request) => {
    const search = request.query.search

    const itens = await database.list(search)

    return itens
})

server.put('/market/:id', async(req, res) => {
    const itemId = request.params.id
    const { image, title, rate, cost, description } = req.body

    await database.update(itemId, {
        image,
        title,
        rate,
        cost,
        description
    })

    return replay.status(204).send()
})

server.delete('/market/:id', () => {
    return 'carai'
})



server.listen({
    port: process.env.PORT ?? 3333,
    host: '0.0.0.0'
})