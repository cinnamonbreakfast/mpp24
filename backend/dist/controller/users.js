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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.loginUser = exports.registerUser = void 0;
const crypto_1 = require("crypto");
const userRepository_1 = require("../repository/userRepository");
const register_schema_1 = __importDefault(require("../schemas/user/register.schema"));
const login_schema_1 = __importDefault(require("../schemas/user/login.schema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let validation;
    try {
        validation = yield register_schema_1.default.validateAsync(req.body);
    }
    catch (e) {
        res
            .json({
            errors: e.details,
        })
            .status(400);
        return;
    }
    try {
        const id = (0, crypto_1.randomUUID)();
        yield (0, userRepository_1.createUser)(Object.assign(Object.assign({}, validation), { id }));
        res
            .json({
            data: {
                user: { id },
            },
        })
            .status(204);
    }
    catch (e) {
        next(e);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let validation;
    try {
        validation = yield login_schema_1.default.validateAsync(req.body);
        const user = yield (0, userRepository_1.authUser)(validation.username, validation.secretCode);
        if (user) {
            console.log(process.env.SECRET_JWT);
            const token = jsonwebtoken_1.default.sign(user, process.env.SECRET_JWT);
            res.json({
                response: {
                    token,
                    user,
                },
            });
        }
    }
    catch (e) {
        res
            .json({
            errors: e.details,
        })
            .status(400);
        return;
    }
});
exports.loginUser = loginUser;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userRepository_1.getUserById)(req.params.id);
        res
            .send({
            data: user,
        })
            .status(200);
    }
    catch (e) {
        next(e);
    }
});
exports.getUser = getUser;
