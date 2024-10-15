// app.js
import express from 'express'
import routes from './routes/index.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import session from 'express-session'
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

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key', // Use a strong secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // Session expires after 1 day
    },
  })
);

// Configurar rutas
app.use('/infinify', routes)

export default app
