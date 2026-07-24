const Project = require('../models/projectModel')
const User = require('../models/userModel')

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

exports.setMail = async (req, res) => {
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

        if (project.collaborator.includes(inviteUser.email)) {
            return res.status(400).json({ message: "Cet utilisateur est déjà collaborateur" })
        }

        project.collaborator.push(inviteUser.email)

        const updateProject = await project.save()
        res.json(updateProject)

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.getProject = async (req, res) => {
    try {
       
        const project = await Project.find({
            $or: [
                { author: req.user._id },
                { collaborator: req.user._id }
            ]
        })

        return res.status(200).json(project || [])

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}