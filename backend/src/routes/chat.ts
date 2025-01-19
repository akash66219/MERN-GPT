import { Router } from "express";
import { verifyToken } from "../utils/auth-token.js";
import { deleteChat, generateChatCompletion } from "../controllers/chat-controller.js";
import { verifyUser } from "../controllers/user-controller.js";

const chatRouter = Router()

chatRouter.post('/new',verifyToken, generateChatCompletion)
chatRouter.delete('/deleteChat',verifyToken, deleteChat)

export default chatRouter