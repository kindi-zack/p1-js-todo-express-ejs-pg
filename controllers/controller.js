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
        let errMsg = req.query.msg

        if(errMsg) errMsg = [errMsg, 'contoh aja', 'gimana jadinya', 'kalau ada lebih', 'satu err msg']
        
        res.render('AddPage', { errMsg })
    }

    static postAdd(req, res) {
        let todo = req.body.todo
        Model.postAdd(todo)
        .then(data => {
            res.redirect('/')
            // res.send(data)
        })
        .catch(err => {
            console.log('## ERROR ##'+err)
            res.redirect(`/todos/add?msg=${err}`)
        })
    }

    static editTodo(req, res) {
        let id = req.params.id
        Model.editTodo(id)
        .then(data => {
            res.render('EditForm', { editData : data[0] })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static postEdit(req, res) {
        let id = req.params.id
        let todo = req.body.todo

        Model.postEdit(id, todo)
        .then(output => {
            res.redirect('/')
        })
        .catch(err => {
            res.send(err)
            // console.log(eer)
        })
    }


}

module.exports = Controller