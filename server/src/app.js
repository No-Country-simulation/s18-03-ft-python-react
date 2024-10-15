// app.js
import express from 'express'
import routes from './routes/index.js'
import dotenv from 'dotenv'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

// Crear la aplicación de Express
const app = express()

// Middlewares
app.use(express.json())
app.use(cookieParser())

// Configure CORS
app.use(
  cors({
    origin: 'http://localhost:3000', 
    credentials: true, 
  })
);

// Configurar rutas
app.use('/infinify', routes)

export default app
