"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
var Exceptions;
(function (Exceptions) {
    Exceptions[Exceptions["DBNotFoundException"] = 0] = "DBNotFoundException";
    Exceptions[Exceptions["DBDuplicateException"] = 1] = "DBDuplicateException";
})(Exceptions || (Exceptions = {}));
function globalErrorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    if ((err === null || err === void 0 ? void 0 : err.name) in Exceptions) {
        res.json({ error: err.message }).status(err.statusCode);
        return;
    }
    res.status(500);
    res.json({ error: err });
}
exports.globalErrorHandler = globalErrorHandler;
