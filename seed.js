const { pool } = require('./connection/config')
const { Model} = require('./models/model')

Model.list()
    .then(data => {
        
        let values = data.map(item => {
            let {id, todo, complete, createdAt } = item

            return `(${id}, '${todo}', '${complete}', '${createdAt}')`
        })

        let todosVal = `INSERT INTO todos (id, todo, complete, createdAt) VALUES ${values};
        `

        return todosVal
    })
    .then(todosVal => {
        return pool.query(todosVal)
    })
    .then(res => {
        console.log('### SEEDING SUCCESS ###')
        // console.log(res)
    })
    .catch(err => {
        console.log('++++ ERROR ++++')
        // console.log(err)
    })

