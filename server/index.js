import { PORT } from './config.js'

import app from './src/app.js'
import dotenv from 'dotenv'

const access_token = app.session

dotenv.config()

app.listen(PORT, ()=> {
    console.log(`server listening at port: ${PORT}
        and user credentials: ${access_token || 'no token yet'}
        `)
})