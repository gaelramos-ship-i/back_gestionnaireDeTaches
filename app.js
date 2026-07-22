const express = require('express')
const app = express()
const port = 3000

require('dotenv').config()
require('./config/db')

const authRoutes = require('./routes/authRoutes')

app.use(express.json())
app.use('/api/v1/auth', authRoutes)

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon API RESTful !')
})

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`)
})