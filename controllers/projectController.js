const Project = require('../models/projectModel')
const User = require('../models/userModel')

// // Fournir tous les produits 
// exports.getAllProjects = async (req, res) => {
//     try {
//         // Va chercher dans la bdd tous les produits
//         const project = await Project.find()
//         res.json(project)
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// }

// exports.getProjectByID = async (req, res) => {
//     try {
//         const project = await Project.findById(req.params.id)
//         if(project == null){
//             return res.status(404).json({message: "Projet non trouvé"})
//         }
//         res.json(project)
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// }


// Créer un produit
exports.createProject = async (req, res) => {
    try {
        const project = new Project({
            title: req.body.title,
            desc: req.body.desc,
            author: req.user._id
        })

        const newProject = await project.save()
        res.status(201).json(newProject)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.getMail = async (req, res) => {
    try {

        const { email } = req.body
        if (!email) {
            return res.status(400).json({ message: "L'email est requis" })
        }

        const project = await Project.findById(req.params.id)
        if (!project) {
            return res.status(404).json({ message: "Projet non trouvé" })
        }

        const inviteUser = await User.findOne({ email })
        if (!inviteUser) {
            return res.status(404).json({ message: "Aucun utilisateur enregistré avec cet email" })
        }

        project.collaborator.push(inviteUser)

        const updateProject = await project.save()
        res.json(updateProject)

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}