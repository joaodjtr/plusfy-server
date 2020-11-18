import {generateRandomString} from "../helpers/generateRandomString"
import querystring from "querystring"
import {Router} from 'express'
import { authorizations, client_id, redirect_uri, stateKey } from "../utils/envs"

const routes = Router()

routes.get('/login', (_, res) => {
    const state = generateRandomString(16)
    res.cookie(stateKey, state)

    const scope = authorizations
    res.redirect("https://accounts.spotify.com/authorize?" +
        querystring.stringify({
            response_type: "code",
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state,
        })
    )
})

export default routes