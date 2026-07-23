const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectController')

router.get('/', projectController.getAllProjects)
router.get('/:id', projectController.getProjectByID)
router.post('/', projectController.createProject)

module.exports = router