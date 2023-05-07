import { Router } from "express";
import { addRemoveFriens, getUser, getUserFriends } from "../controllers/users.js";
import {verifyToken} from '../middleWare/verifyToken.js'
const router = Router()
router.get('/:id', verifyToken, getUser)
router.get('/:id/friends', verifyToken, getUserFriends)
router.patch('/:id/:friendsId', verifyToken, addRemoveFriens)
export default router