import express from 'express'
// import supabase from '../db'

import { getAppToken } from '../controllers/authControllers/getAppToken.js'

const routes = express.Router()

routes.get('/', (req, res) => {
  res.send('main route')
})

routes.get('/app-token', getAppToken)

export default routes
