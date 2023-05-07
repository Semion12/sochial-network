import express from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import authRouter from './routers/authRouters.js'
import usersRouter from './routers/userRouter.js'
import postsRouter from './routers/postsRouters.js'
import path from 'path'
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(cors())
app.use('/images', express.static(path.join('images')))
mongoose.set('strictQuery', true);
const PORT = process.env.PORT
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/posts', postsRouter)

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('DB ok')
}).catch((e) => {
    console.log(e)
})

app.listen(PORT, () => {
    console.log('SERVER Port:', PORT)
})

