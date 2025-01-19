"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatOptions = void 0;
var g4f_1 = require("g4f");
var g4f = new g4f_1.G4F();
var chatOptions = {
    provider: g4f.providers.GPT,
    model: "gpt-4",
    debug: true,
    proxy: ""
};
exports.chatOptions = chatOptions;
