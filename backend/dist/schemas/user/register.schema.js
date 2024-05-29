"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const registerSchema = joi_1.default.object()
    .keys({
    username: joi_1.default.string().alphanum().min(3).max(30).required(),
    fullName: joi_1.default.string().min(10).required(),
    secretCode: joi_1.default.string().min(4).max(6).required(),
})
    .strict();
exports.default = registerSchema;
