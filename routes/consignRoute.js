import {Router} from  'express'
import {consign} from '../controllers/accountController.js'

const consignRouter=Router()

consignRouter.post('/',consign)

export default consignRouter 