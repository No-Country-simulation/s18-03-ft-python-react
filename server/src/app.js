// app.js
import express from 'express'
import routes from './routes/index.js'
import dotenv from 'dotenv'
import session from 'express-session'
import cookieParser from 'cookie-parser'

dotenv.config()

// Crear la aplicación de Express
const app = express()

// Middlewares
app.use(express.json())
app.use(cookieParser())

app.use(
    session({
      secret: process.env.SESSION_SECRET || 'your_session_secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === 'production', // Use true in production with HTTPS
        httpOnly: true,
        maxAge: 3600000, // 1 hour
      },
    })
  );

// Configurar rutas
app.use('/infinify', routes)

export default app
