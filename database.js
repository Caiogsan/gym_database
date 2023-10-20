import { randomUUID } from "node:crypto"
import { sql } from "./db.js"

export class Database {
    #itens = new Map()

    async list(search){
        let itens

        if(search){
            itens = await sql`select * from itens where ilike ${'%' + search + '%'}`
        } else {
            itens = await sql`select * from itens`
        }   
        
        return itens

    }

    async create(item){

        const itemId = randomUUID()

        const { image, title, rate, cost, description} = item

        await sql`insert into itens (id, image, title, rate, cost, description) VALUES (${itemId, image, title, rate, cost, description})`
    }

    async update(id, item){
        const { image, title, rate, cost, description } = item

        await sql`update itens set image = ${image}, title = ${title}, rate = ${rate}, cost = ${cost}, description = ${description}`
    }
    
    async delete(id){
        await sql`delete from itens where id = ${id}`
    }
}