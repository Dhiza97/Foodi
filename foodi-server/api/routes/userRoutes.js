const express = require('express')
const router = express.Router()

const userController = require('../controllers/userControllers')

router.get('/', userController.getAllUsers)
router.post('/', userController.createUser)
router.delete('/:id', userController.deleteUser)
router.get('/admin/:email', userController.getAdmin)
router.put('/admin/:id', userController.makeAdmin)

module.exports = router