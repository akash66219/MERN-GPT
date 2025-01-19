"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateSignup = void 0;
var express_validator_1 = require("express-validator");
var validateLogin = [
    (0, express_validator_1.body)('email').isEmail().withMessage("Email is not valid"),
    (0, express_validator_1.body)('password').trim().isLength({ min: 6 }).withMessage("Password must be 6 character long")
];
exports.validateLogin = validateLogin;
var validateSignup = __spreadArray([
    (0, express_validator_1.body)('name').exists({ checkFalsy: true }).withMessage("Name field cannot be empty")
], validateLogin, true);
exports.validateSignup = validateSignup;
