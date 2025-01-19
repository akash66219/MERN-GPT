import { Router } from "express";
import { verifyToken } from "../utils/auth-token.js";
import { generateImage } from "../controllers/image-controller.js";

const imageRouter = Router()

imageRouter.get('/',verifyToken, generateImage)

export default imageRouter