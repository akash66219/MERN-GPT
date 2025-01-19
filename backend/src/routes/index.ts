import { Router } from "express";
import chatRouter from "./chat.js";
import userRouter from "./user.js";
import imageRouter from "./image.js";

const appRouter = Router()

appRouter.use('/user', userRouter)
appRouter.use('/chat', chatRouter)
appRouter.use('/image', imageRouter)

export default appRouter