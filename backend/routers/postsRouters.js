import { Router } from "express";
import { createPosts, getMyposts, getUserPosts, createComment} from "../controllers/posts.js";
import {verifyToken} from '../middleWare/verifyToken.js'
import upload from '../middleWare/file.js'
const router = Router()

router.get('/', verifyToken, getMyposts)
router.get('/:userId/posts', verifyToken, getUserPosts)
router.post('/', upload.single('avatar'), verifyToken, createPosts)
router.post('/comments/:id', verifyToken,createComment )

export default router