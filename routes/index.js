const router = require('express').Router()
const Controller  = require('../controllers/controller')

router.get('/', Controller.list)
router.get('/todos/:id', Controller.findById)

module.exports = router