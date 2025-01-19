import { body } from "express-validator";

let validateLogin = [
    body('email').isEmail().withMessage("Email is not valid"),
    body('password').trim().isLength({min:6}).withMessage("Password must be 6 character long")
]
let validateSignup = [
    body('name').exists({checkFalsy:true}).withMessage("Name field cannot be empty"),
    ...validateLogin
]

export {validateSignup, validateLogin} 