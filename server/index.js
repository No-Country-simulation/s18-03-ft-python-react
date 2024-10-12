import { PORT } from './config.js'

import app from './src/app.js'
import dotenv from 'dotenv'

dotenv.config()

app.listen(PORT, ()=> {
    console.log(`server listening at port: ${PORT}`)
})