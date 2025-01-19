"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var mongoose_1 = require("mongoose");
var morgan_1 = require("morgan");
var index_js_1 = require("./routes/index.js");
var cookie_parser_1 = require("cookie-parser");
var cors_1 = require("cors");
var app = (0, express_1.default)();
dotenv_1.default.config();
var PORT = process.env.PORT || 3000;
var MONGODB_URL = process.env.MONGODB_URL;
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin) {
            return callback(null, true);
        }
        callback(null, true);
    },
    credentials: true
}));
app.use(index_js_1.default);
mongoose_1.default.connect(MONGODB_URL)
    .then(function () {
    app.listen(PORT, function () {
        console.log("Server live at http://localhost:".concat(PORT));
    });
})
    .catch(function (err) {
    console.log(err);
    throw new Error(err);
});
// res.cookie function is used to automatically set cookie in the browser cookie storage!!
