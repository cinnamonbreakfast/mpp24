"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.getOne = void 0;
const getOne = (req, res) => {
    res
        .status(200)
        .json({
        name: "Student",
    })
        .send();
};
exports.getOne = getOne;
const getAll = (req, res) => {
    //res.send("All good!");
    res
        .status(200)
        .json({ string: "Hello" })
        .setHeader("Access-Control-Allow-Origin", "*");
};
exports.getAll = getAll;
exports.default = {
    getOne: exports.getOne,
    getAll: exports.getAll,
};
