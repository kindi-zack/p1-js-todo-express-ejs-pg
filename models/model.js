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
                data = JSON.parse(data)
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
                let id = rows.length === 0 ? 1 : rows[rows.length - 1].id + 1

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
    }


    static editTodo(id) {
        return new Promise((resolve, rejects) => {
            this.findById(id)
            .then(data => {
                let editData = data.rows
                return resolve(editData)
            })
            .catch(err => {
                return rejects(err)
            })
        }) 
    }
    
    static postEdit(id, todo) {
        return new Promise((resolve, rejects) => {

            if(!todo) return rejects('todo tidak boleh kosong')

            let newEditData = new Todo(id, todo)
            let { todo: newTodo, createdAt} = newEditData
            createdAt = JSON.stringify(createdAt)
            let updateQ = `UPDATE todos SET todo = '${newTodo}', createdAt = '${createdAt}' WHERE id = ${id};`

            return pool.query(updateQ)
            .then(data => {
                return resolve(data)
            })
            .catch(err => {
                return rejects(err)
            })
        })
    }

}

module.exports = {Model, Todo}