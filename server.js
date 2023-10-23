// npm install fastify
// npm install postgres
// teste

import { fastify } from 'fastify'
import { Database } from './database.js'

const server = fastify()
const database = new Database

server.addHook('onRequest', (req, res, done) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000/store')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    done()
})


server.post('/market', async(req, res) => {
    const { image, title, rate, cost, description } = req.body

    await database.create({
        image,
        title,
        rate,
        cost,
        description
    })

    return res.status(201).send()
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

    return res.status(204).send()
})

server.delete('/market/:id', async(req, res) => {
    const videoId = req.params.id

    await database.delete(videoId)

    return res.status(204).send()
})



server.listen({
    port: process.env.PORT ?? 3333,
    host: '0.0.0.0'
})