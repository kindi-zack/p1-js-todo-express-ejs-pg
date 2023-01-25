const { pool } = require('./connection/config')

let todosTable = `
    DROP TABLE IF EXISTS todos;
    CREATE TABLE IF NOT EXISTS todos (
        id INTEGER UNIQUE,
        todo VARCHAR(255),
        complete VARCHAR(255),
        createdAt DATE
    );
`

pool.query(todosTable)
.then(res => {
    // console.log(res)
    console.log('todos table created !!!')
})
.catch(err => {
    console.log(err)
})