"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DBDuplicateException extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 0;
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
    }
    static of(message, code) {
        const instance = new DBDuplicateException(message);
        instance.setStatusCode(code);
        return instance;
    }
    setMessage(message) {
        this.message = message;
        return this;
    }
    setStatusCode(code) {
        this.statusCode = code;
        return this;
    }
}
exports.default = DBDuplicateException;
