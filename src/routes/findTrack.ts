import {Router} from 'express'
import * as findTrackController from '../controllers/findTrackController'

const routes = Router() 

routes.post('/find-track', findTrackController.find)

export default routes 