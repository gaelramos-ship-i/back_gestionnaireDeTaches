const Project = require('../models/projectModel')

// Fournir tous les produits 
exports.getAllProjects = async (req, res) => {
    try {
        // Va chercher dans la bdd tous les produits
        const project = await Project.find()
        res.json(project)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.getProjectByID = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
        if(project == null){
            return res.status(404).json({message: "Projet non trouvé"})
        }
        res.json(project)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Créer un produit
exports.createProject = async (req, res) => {
    try {
        const project = new Project({
            title: req.body.title,
            desc: req.body.desc,
        })

        const newProject = await project.save()
        res.status(201).json(newProject)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

