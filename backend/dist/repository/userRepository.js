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
exports.authUser = exports.getUserById = exports.createUser = void 0;
const DBDuplicateException_1 = __importDefault(require("../exception/DBDuplicateException"));
const DBNotFoundException_1 = __importDefault(require("../exception/DBNotFoundException"));
const functions_1 = require("../utils/functions");
const _1 = __importDefault(require("./"));
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield _1.default.query("INSERT INTO users (id, username, full_name, secret_code) VALUES ($1, $2, $3, $4)", [
            user.id,
            user.username,
            user.fullName,
            yield (0, functions_1.cryptPassword)(user.secretCode),
        ]);
        console.log(`Added a user with the name ${user.fullName}`);
    }
    catch (e) {
        if (e.code === "23505")
            throw DBDuplicateException_1.default.of(e.detail, 400);
        throw e;
    }
});
exports.createUser = createUser;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield _1.default.query("SELECT * FROM users WHERE id = $1", [id]);
    if (res.rows.length === 0)
        throw DBNotFoundException_1.default.of("User not found!", 404);
    const record = res.rows[0];
    return {
        id: record.id,
        username: record.username,
        fullName: record.full_name,
    };
});
exports.getUserById = getUserById;
const authUser = (username, secretCode) => __awaiter(void 0, void 0, void 0, function* () {
    const pass = yield (0, functions_1.cryptPassword)(secretCode);
    console.log(pass);
    const res = yield _1.default.query("SELECT * FROM users WHERE username = $1 AND secret_code = $2", [username, pass]);
    if (res.rows.length === 0)
        throw DBNotFoundException_1.default.of("User not found!", 404);
    const record = res.rows[0];
    return {
        id: record.id,
        username: record.username,
        fullName: record.full_name,
    };
});
exports.authUser = authUser;
