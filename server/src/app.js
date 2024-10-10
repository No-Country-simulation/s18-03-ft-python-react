// app.js
import express from 'express'
import routes from './routes/index.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()

// Crear la aplicación de Express
const app = express()

// Middlewares
app.use(express.json())
app.use(cookieParser())

// Configurar rutas
app.use('/infinify', routes)

export default app
