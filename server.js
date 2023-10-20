// npm install fastify
// npm install postgres

import { fastify } from 'fastify'
import { Database } from './database.js'

const server = fastify()
const database = new Database


server.post('/market', async(req, res) => {
    const { image, title, rate, cost, description } = req.body

    await database.create({
        image,
        title,
        rate,
        cost,
        description
    })

    return RemotePlayback.status(201).send()
})

server.get('/market', async (req) => {
    const search = req.query.search

    const videos = await database.list(search)

    return videos
})

server.put('/market/:id', async(req, res) => {
    const videoId = request.params.id
    const { image, title, rate, cost, description } = req.body

    await database.update(videoId, {
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