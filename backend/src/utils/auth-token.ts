import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

let createToken = (id : String, email : String) => {
    let token = jwt.sign({id, email}, process.env.JWT_SECRET, {
        expiresIn : "7d"
    })
    return token;
}

let verifyToken = async (req:Request, res: Response, next: NextFunction) => {
    console.log(req.path)
    const token = req.signedCookies['auth_token']
    if(!token || token.trim() === ""){
        return res.status(401).send("No token found")
    }
    let data = jwt.verify(token,process.env.JWT_SECRET)
    if(data){
        res.locals.jwtData = data
        return next()
    }else{
        return res.status(403).send('Invalid Token')
    }
}

export {verifyToken, createToken}