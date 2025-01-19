import { Router } from "express";
import { userSignup, getAllUsers, userLogin, verifyUser, logoutUser } from "../controllers/user-controller.js";
import {validateSignup, validateLogin } from "../utils/user-validator.js";
import validationRequestSchama from "../utils/validate-request-schema.js";
import { verifyToken } from "../utils/auth-token.js";

const userRouter = Router()

userRouter.get('/', getAllUsers)
userRouter.post('/signup',validateSignup, validationRequestSchama, userSignup)
userRouter.post('/login',validateLogin, validationRequestSchama, userLogin)
userRouter.get('/verify',verifyToken, verifyUser)

userRouter.get('/logout',logoutUser)

export default userRouter