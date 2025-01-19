"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.verifyUser = exports.userLogin = exports.userSignup = exports.getAllUsers = void 0;
var user_js_1 = require("../models/user.js");
var bcrypt_1 = require("bcrypt");
var auth_token_js_1 = require("../utils/auth-token.js");
var getAllUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_js_1.default.find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.status(200).json({ users: users })];
            case 2:
                err_1 = _a.sent();
                console.log(err_1);
                return [2 /*return*/, res.status(500).json({ msg: err_1.message })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
var userSignup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, email, password, ExistingUser, hashedPassword, user, token, expires, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, name_1 = _a.name, email = _a.email, password = _a.password;
                return [4 /*yield*/, user_js_1.default.findOne({ email: email })];
            case 1:
                ExistingUser = _b.sent();
                if (ExistingUser) {
                    return [2 /*return*/, res.status(401).json({ msg: "User Already Exists with the specified email.", ExistingUser: ExistingUser })];
                }
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 2:
                hashedPassword = _b.sent();
                user = new user_js_1.default({
                    name: name_1,
                    email: email,
                    password: hashedPassword
                });
                return [4 /*yield*/, user.save()];
            case 3:
                _b.sent();
                res.clearCookie("auth_token", { httpOnly: true, path: '/', domain: 'localhost', signed: true });
                token = (0, auth_token_js_1.createToken)(user._id.toString(), user.email);
                expires = new Date();
                expires.setDate(expires.getDate() + 7);
                res.cookie('auth_token', token, { httpOnly: true, path: '/', domain: 'localhost', expires: expires, signed: true });
                return [2 /*return*/, res.status(201).json({ msg: "User Created Successfully.", user: user })];
            case 4:
                err_2 = _b.sent();
                console.log(err_2);
                return [2 /*return*/, res.status(500).json({ msg: "Internal server error. Please try again later." })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.userSignup = userSignup;
var userLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, ExistingUser, isPasswordCorrect, token, expires, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, user_js_1.default.findOne({ email: email })];
            case 1:
                ExistingUser = _b.sent();
                if (!ExistingUser) {
                    return [2 /*return*/, res.status(401).json({ msg: "User does not exists with this email." })];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, ExistingUser.password)];
            case 2:
                isPasswordCorrect = _b.sent();
                if (!isPasswordCorrect) {
                    return [2 /*return*/, res.status(403).json({ msg: "Incorrect email or password." })];
                }
                res.clearCookie("auth_token", { httpOnly: true, path: '/', domain: 'localhost', signed: true });
                token = (0, auth_token_js_1.createToken)(ExistingUser._id.toString(), ExistingUser.email);
                expires = new Date();
                expires.setDate(expires.getDate() + 7);
                res.cookie('auth_token', token, { httpOnly: true, path: '/', domain: 'localhost', expires: expires, signed: true });
                return [2 /*return*/, res.status(201).json({ msg: "Login Successfull", user: ExistingUser })];
            case 3:
                err_3 = _b.sent();
                console.log(err_3);
                return [2 /*return*/, res.status(500).json({ msg: "Internal server error. Please try again later." })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.userLogin = userLogin;
var verifyUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = res.locals.jwtData.id;
                return [4 /*yield*/, user_js_1.default.findById(userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(401).send("Invalid Token.")];
                }
                if (user._id.toString() !== res.locals.jwtData.id) {
                    return [2 /*return*/, res.status(401).send("Unauthorized Access.")];
                }
                else {
                    return [2 /*return*/, res.status(200).json({ user: user })];
                }
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                return [2 /*return*/, res.status(500).send("Internal server error")];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.verifyUser = verifyUser;
var logoutUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            res.clearCookie("auth_token", { httpOnly: true, path: '/', domain: 'localhost', signed: true });
            return [2 /*return*/, res.status(200).json({ msg: "Logged out successfully" })];
        }
        catch (err) {
            return [2 /*return*/, res.status(500).json({ err: err })];
        }
        return [2 /*return*/];
    });
}); };
exports.logoutUser = logoutUser;
