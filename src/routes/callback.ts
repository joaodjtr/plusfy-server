import {Router} from 'express'
import { stateKey, client_id, client_secret, client_redirect_url, redirect_uri } from '../utils/envs'
import request from 'request'
import querystring from 'querystring'

const routes = Router()

interface IbodyResponse{
  id: string,
  uri: string
}

routes.get('/callback', (req, res) => {
    const code = req.query.code || null
    const state = req.query.state || null
    const storedState = req.cookies ? req.cookies[stateKey] : null
  
    if (state === null || state !== storedState) {
        res.redirect('/#' + querystring.stringify({error: 'state_mismatch'}))
    } 
    else {
      res.clearCookie(stateKey)
      
      const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))},
        json: true
      }
  
      request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const access_token = body.access_token
          const refresh_token = body.refresh_token

          const optionsRequest = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          }

          request.get(optionsRequest, (error, _, body: IbodyResponse) => {
            if(error){
              res.redirect('/#' + querystring.stringify({error: 'invalid_token'}))
            }

            res.redirect(`${client_redirect_url}/#` + querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
              user_id: body.id
            }))
          })

        }
        else {
          res.redirect('/#' + querystring.stringify({error: 'invalid_token'}))
        }
      })
    }
})

export default routes