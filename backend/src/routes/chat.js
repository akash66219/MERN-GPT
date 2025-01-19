"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_token_js_1 = require("../utils/auth-token.js");
var chat_controller_js_1 = require("../controllers/chat-controller.js");
var chatRouter = (0, express_1.Router)();
chatRouter.post('/new', auth_token_js_1.verifyToken, chat_controller_js_1.generateChatCompletion);
chatRouter.delete('/deleteChat', auth_token_js_1.verifyToken, chat_controller_js_1.deleteChat);
exports.default = chatRouter;
