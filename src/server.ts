import express from 'express'
import http from 'http'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import callbackRoute from './routes/callback'
import loginRoute from './routes/login'
import refreshTokenRoute from './routes/refreshToken'
import findTrack from './routes/findTrack'
import { PORT } from './utils/envs'
import {setGimmeKey} from 'gimme-the-song'

setGimmeKey(process.env.GIMME_KEY || '')

const app = express()

app.use(express.static(__dirname + '/public')).use(cors()).use(cookieParser())
app.use(bodyParser.json())
app.use(loginRoute)
app.use(callbackRoute)
app.use(refreshTokenRoute)
app.use(findTrack)

const server = http.createServer(app)

server.listen(PORT, () => console.log(`Plusfy server running on http://localhost:${PORT}`))