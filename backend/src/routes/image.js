"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_token_js_1 = require("../utils/auth-token.js");
var image_controller_js_1 = require("../controllers/image-controller.js");
var imageRouter = (0, express_1.Router)();
imageRouter.get('/', auth_token_js_1.verifyToken, image_controller_js_1.generateImage);
exports.default = imageRouter;
