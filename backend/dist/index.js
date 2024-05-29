"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./configs");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const getAllHandler_1 = require("./getAllHandler");
require("./socket");
const users_1 = require("./controller/users");
const globalErrorHandler_1 = require("./exception/globalErrorHandler");
// const  = studenthandler;
var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
const port = process.env.PORT;
app.use(express_1.default.json());
app.get("/", getAllHandler_1.getAll);
app.get("/one", getAllHandler_1.getOne);
app.post("/register", users_1.registerUser);
app.post("/login", users_1.loginUser);
app.get("/get/:id", users_1.getUser);
app.use(globalErrorHandler_1.globalErrorHandler);
app.listen(port, () => {
    console.group();
    console.log(`Server started at port ${port}`);
    console.groupEnd();
});
exports.default = app;
