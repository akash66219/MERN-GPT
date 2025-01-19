import { Request, Response } from "express"
import User from "../models/user.js"
import bcrypt from "bcrypt"
import {verifyToken, createToken} from "../utils/auth-token.js"

const getAllUsers = async(req : Request, res : Response) => {
    try{
        const users = await User.find()
        return res.status(200).json({users : users})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg : err.message})
    }
}

const userSignup = async(req : Request, res : Response) => { 
    try{
        let {name, email, password} = req.body
        let ExistingUser = await User.findOne({email : email})
        if(ExistingUser) {
            return res.status(401).json({msg : "User Already Exists with the specified email.", ExistingUser}) 
        }

        let hashedPassword = await bcrypt.hash(password, 10)
        let user = new User({
            name : name,
            email : email,
            password : hashedPassword
        })
        await user.save()

        res.clearCookie("auth_token", { httpOnly: true, path : '/', signed:true, sameSite:"none", secure:true }) 
        let token = createToken(user._id.toString(), user.email)
        const expires = new Date()
        expires.setDate(expires.getDate() + 7)
        res.cookie('auth_token', token , { httpOnly: true, path : '/', expires: expires, signed:true, sameSite:"none", secure:true })

        return res.status(201).json({msg : "User Created Successfully.", user : user})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg : "Internal server error. Please try again later."})
    }
}

const userLogin = async(req : Request, res : Response) => {
    try {
        let {email, password} = req.body 
        let ExistingUser = await User.findOne({email:email})
        if(!ExistingUser) {
            return res.status(401).json({msg : "User does not exists with this email."}) 
        }

        let isPasswordCorrect = await bcrypt.compare(password, ExistingUser.password)
        if (!isPasswordCorrect) {
            return res.status(403).json({msg : "Incorrect email or password."})
        }

        res.clearCookie("auth_token", { httpOnly: true, path : '/', signed:true, sameSite:"none", secure:true })
        let token = createToken(ExistingUser._id.toString(), ExistingUser.email)
        const expires = new Date()
        expires.setDate(expires.getDate() + 7)
        res.cookie('auth_token', token , { httpOnly: true, path : '/', expires: expires, signed:true, sameSite:"none", secure:true })

        return res.status(201).json({msg : "Login Successfull", user : ExistingUser})
    } catch (err) {
        console.log(err)
        return res.status(500).json({msg : "Internal server error. Please try again later."})
    }
} 

const verifyUser = async(req : Request, res : Response) => {
    try{
        let userId = res.locals.jwtData.id;
        let user = await User.findById(userId)
        if(!user){
            return res.status(401).send("Invalid Token.")
        }
        if(user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Unauthorized Access.")
        }else{
            return res.status(200).json({user:user})
        }
    }catch(err){
        return res.status(500).send("Internal server error")
    }
}

const logoutUser = async(req : Request, res : Response) => {
    try{
        res.clearCookie("auth_token", { httpOnly: true, path : '/', signed:true, sameSite:"none", secure:true })
        return res.status(200).json( { msg:"Logged out successfully" });
    }catch(err){
        return res.status(500).json({ err:err });
    }
}



export {getAllUsers, userSignup, userLogin, verifyUser, logoutUser}  