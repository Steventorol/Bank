import {Router} from 'express'
import { getAccount, postAccount, putAccount, deleteAccount } from '../controllers/accountController.js'


const accountRouter=Router()

accountRouter.get('/',getAccount)
accountRouter.post('/',postAccount)
accountRouter.put('/',putAccount)
accountRouter.delete('/:id',deleteAccount)


export default accountRouter

