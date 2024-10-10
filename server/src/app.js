// app.js
import express from 'express'
import routes from './routes/index.js'
import dotenv from 'dotenv'

dotenv.config()

// Crear la aplicación de Express
const app = express()

// Middlewares
app.use(express.json())

// Configurar rutas
app.use('/infinify', routes)

export default app
