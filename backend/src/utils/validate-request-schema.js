"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var validationRequestSchama = function (req, res, next) {
    var error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.status(403).json({ error: error.array() });
    }
    next();
};
exports.default = validationRequestSchama;
