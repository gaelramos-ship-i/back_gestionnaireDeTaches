const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const projectController = require('../controllers/projectController')

// router.get('/', authMiddleware, projectController.getAllProjects)
// router.get('/:id', authMiddleware, projectController.getProjectByID)
router.post('/', authMiddleware, projectController.createProject)
router.post('/invite/:id', authMiddleware, projectController.setMail)
router.get('/:id', authMiddleware, projectController.getProject)

module.exports = router