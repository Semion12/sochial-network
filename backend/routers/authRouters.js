
import { Router } from 'express'
import { login, reqister } from '../controllers/auth.js'
import {validator} from '../middleWare/validator.js'

import upload from '../middleWare/file.js'
const route = Router()
route.post('/register', upload.single('avatar'),validator, reqister)
route.post('/login', login)

export default route