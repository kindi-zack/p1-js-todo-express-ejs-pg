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

    static findById(id) {
        Model.findById(id)
        .then(data => {
            View.findById(data)
        })
        .catch(err => {
            View.showErr(err)
        })     
    }

    static addTodo(todo) {
        Model.addTodo(todo)
        .then(data => {
            View.addTodo(data)
        })
        .catch(err => {
            View.showErr(err)
        })
    }

    static deltTodo(id) {
        Model.deltTodo(id)
        .then(delData => {
            View.deltTodo(delData)
        })
        .catch(err => {
           View.showErr(err)
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