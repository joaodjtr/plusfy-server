import request from 'request'
import { Router } from "express"
import {client_id, client_secret} from "../utils/envs"
const routes = Router()

routes.get('/refresh_token', (req, res) => {
    const refresh_token = req.query.refresh_token
    const authOptions = {
        url: "https://accounts.spotify.com/api/token",
        headers: {
            Authorization: "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64"),
        },
        form: {
            grant_type: "refresh_token",
            refresh_token: refresh_token,
        },
        json: true,
    }

    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token
            res.send({access_token: access_token})
        }
    })
})

export default routes