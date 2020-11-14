import express from 'express'
import http from 'http'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import callbackRoute from './routes/callback'
import loginRoute from './routes/login'
import refreshTokenRoute from './routes/refreshToken'
import { PORT } from './utils/envs'

const app = express()

app.use(express.static(__dirname + '/public')).use(cors()).use(cookieParser())
app.use(loginRoute)
app.use(callbackRoute)
app.use(refreshTokenRoute)

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`Plusfy server running on http://localhost:${PORT}`)
})
