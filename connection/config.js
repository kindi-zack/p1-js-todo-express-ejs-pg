const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    database: 'jstodo_list',
    password: 'kinyobi',
    user: 'postgres',
    idleTimeoutMillis: 3000,
    connectionTimeoutMillis:2000,
    max: 20
})

// pool.query('SELECT NOW()')
//     .then(res => {
//         console.log(res)
//     })
//     .catch(err => {
//         console.log(err)
//     })

module.exports = {
    pool
}