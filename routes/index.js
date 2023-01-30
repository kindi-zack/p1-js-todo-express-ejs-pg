const router = require('express').Router()
const Controller  = require('../controllers/controller')

router.get('/', Controller.list)
router.get('/todos/add', Controller.addTodo)
router.post('/todos/add', Controller.postAdd)

router.get('/todos/:id', Controller.findById)
router.get("/todos/delete/:id", Controller.deltTodo)

router.get('/todos/:id/edit', Controller.editTodo)
router.post('/todos/:id/edit', Controller.postEdit)


module.exports = router