const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const projectController = require('../controllers/projectController')

router.post('/:id', authMiddleware, projectController.getMail)

module.exports = router