import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import morgan from 'morgan'
import appRouter from './routes/index.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
dotenv.config()
const PORT = process.env.PORT || 3000
const MONGODB_URL = process.env.MONGODB_URL

app.use(express.json())
app.use(morgan("dev"))
app.set("trust proxy", 1)
app.use(cookieParser(process.env.COOKIE_SECRET))
const corsOptions = {
  origin: function (origin, callback) {
     // Allow requests with no origin (like mobile apps or curl requests)
     if (!origin) return callback(null, true);
     // Specify the allowed origins
     const allowedOrigins = ['https://poseidon0070.github.io', 'https://shikharreyya.is-a.dev','http://localhost:5173', 'https://master--mern-bot.netlify.app'];
     if (allowedOrigins.includes(origin)) {
       return callback(null, true);
     }
     return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
 };
 
 app.use(cors(corsOptions));
app.use(appRouter) 

mongoose.connect(MONGODB_URL)
.then(() => {
  app.listen(PORT, () => { 
    console.log(`Server live at http://localhost:${PORT}`) 
  }) 
})
.catch(err => { 
  console.log(err)
  throw new Error(err)
}) 

// res.cookie function is used to automatically set cookie in the browser cookie storage!!