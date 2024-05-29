"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptPassword = exports.randomIntFromInterval = void 0;
const argon2_1 = __importDefault(require("argon2"));
const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
};
exports.randomIntFromInterval = randomIntFromInterval;
const cryptPassword = (password) => argon2_1.default.verify(process.env.SECRET_HASH, "password");
exports.cryptPassword = cryptPassword;
