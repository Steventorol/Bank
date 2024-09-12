import {Router} from  'express'
import {withdraw} from '../controllers/accountController.js'

const withdrawRouter=Router()

withdrawRouter.post('/',withdraw)

export default withdrawRouter 