import { NextFunction, Response, Request } from "express";
import { validationResult } from "express-validator";

let validationRequestSchama = (req : Request, res : Response, next : NextFunction) => {
    let error = validationResult(req)
    if(!error.isEmpty()) {
        return res.status(403).json({error : error.array()})
    }
    next()
}

export default validationRequestSchama