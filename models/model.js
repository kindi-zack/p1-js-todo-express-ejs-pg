const fs = require('fs')
const { pool } = require('../connection/config')

class Todo {
    constructor(id, todo, complete, createdAt) {
        this.id = +id
        this.todo = todo
        this.complete = complete || "❌"
        this.createdAt = createdAt || new Date()
    }
}

class Model {
    static readJson() {
        // //CARA PENDEK
        // return fs.promises.readFile('./data.json', 'utf8')

        // //CARA PANJANG
        return new Promise((resoleve, rejects) => {
            fs.promises.readFile('./data.json', 'utf-8')
            .then(data => {
                return resoleve(data)
            })
            .catch(err => {
                return rejects(err)
            })
        })
    }

    static list() {
        let listQuery = `SELECT * FROM todos`

        return pool.query(listQuery)
    }

    static findById(id) {
        let findQuery = `SELECT * FROM todos WHERE id = ${id}`
        
        return pool.query(findQuery)
    }


    static deltTodo(id) {
        let delQuery = `DELETE FROM todos WHERE id = ${id}`

        return pool.query(delQuery)
    }


    static postAdd(todo) {
        return new Promise((resoleve, rejects) => {
           return this.list()
            .then(({ rows }) => {
                let id = rows.length === 0 ? 0 : rows[rows.length - 1].id + 1

                if(!todo) return rejects('todo can not be empty !!!')

                let value = new Todo(id, todo)
                let createdat = JSON.stringify(value.createdAt)

                let insert = `INSERT INTO todos (id, todo, complete, createdat) VALUES 
                (${value.id},'${value.todo}', '${value.complete}', '${createdat}');`

                // console.log(insert +" ================== "+ JSON.stringify(value.createdAt))
                return pool.query(insert)
            })
            .then(dataPool => {
                resoleve(dataPool)
            })
            .catch(err => {
                rejects(err)
            })
        })
        

        let value = new Todo()


    
        // return new Promise((resoleve, rejects) => {
        //     if(!todo) return rejects('Masukkan Input')
            
        //     this.list()
        //     .then(dataJson => {
        //         let id = dataJson.length === 0 ? 1: dataJson[dataJson.length - 1].id + 1 
        //         let instTodo = new Todo(id, todo)
        //         dataJson.push(instTodo)

        //         this.writeToDb(dataJson)
        //         return instTodo
        //     })
        //     .then((instTodo) => {
        //         // this.writeToDb(dataJson)
        //         return resoleve(instTodo) 
        //     })
        //     .catch(err => {
        //         return rejects(err)
        //     })
        // })
    }


    // static editTodo(inputs, cb) {
    //     let [id, todo] = inputs
    //     //ginama kalau id bukan number
    //     id = +id

    //     this.list((err, dataJson) => {
    //         if(err) {
    //             cb(err)
    //         }else {
    //             let newTodo;
                
    //             this.list((err, dataJson) => {
    //                 dataJson = dataJson.map(item => {
    //                                 if(item.id == id) {
    //                                     newTodo = item
    //                                     return new Todo(id, todo)
    //                                 }else {
    //                                     return item
    //                                 }
    //                             })

    //                 if(!newTodo) return cb(`id ${id} tidak ditemukan`)                
                
    //                 this.writeToDb(dataJson, (err, res) => {
    //                     if(err) {
    //                         cb(err)
    //                     }
    //                 })
    //                 cb(null, newTodo)  
    //             })         
    //         }
    //     })
    // }
}

module.exports = {Model, Todo}