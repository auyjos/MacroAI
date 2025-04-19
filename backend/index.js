
import express from 'express'
import { connectDB } from './db/connectDB.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.route.js'
const app = express()

const PORT = process.env.PORT || 3000
dotenv.config()

app.use(express.json()) // allows us to parse incoming requests into json requests:req.body
app.use(cookieParser()) //extracts coookies
app.listen(PORT, () => {
    connectDB()
    console.log(`App is listening on port ${PORT}`)
})



app.use('/api/auth', authRoutes);