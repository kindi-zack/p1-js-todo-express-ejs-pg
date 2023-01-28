const {Model} = require('../models/model')
const View = require('../views/view')

class Controller {
    static list(req, res) {
        Model.list()
        .then(data => {
            res.render('Home', { data: data.rows })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static findById(req, res) {
        let id = req.params.id

        Model.findById(id)
        .then(({rows}) => {

            res.render('Find', { rows: rows[0] })
        })
        .catch(err => {
            res.send(err)
        })     
    }

    static deltTodo(req, res) {
        let { id } = req.params
        Model.deltTodo(id)
        .then(delData => {
            res.redirect('/')
        })
        .catch(err => {
           res.send(err)
        })
    }


    static addTodo(req, res) {
        res.render('AddPage')
    }

    static postAdd(req, res) {
        let todo = req.body.todo
        Model.postAdd(todo)
        .then(data => {
            res.redirect('/')
            // res.send(data)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
    }

    static editTodo(inputs) {
        Model.editTodo(inputs, (err, dataEdit) => {
            if(err) {
                View.showErr(err)
            }else {
                View.editTodo(dataEdit)
            }
        })
    }


}

module.exports = Controller