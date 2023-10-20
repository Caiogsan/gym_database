import { sql } from "./db.js";

sql`
    CREATE TABLE itens (
        id TEXT PRIMARY KEY,
        image TEXT,
        title TEXT,
        rate INTEGER,
        cost NUMERIC,
        description TEXT
    )
`.then(() => {
    console.log('tabela criada')
})