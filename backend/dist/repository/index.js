"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: process.env.PG_USERNAME,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: (process.env.PG_PORT && +process.env.PG_PORT) || 5432,
    host: process.env.PG_HOST,
});
console.log(process.env.PG_USERNAME, process.env.PG_DATABASE, process.env.PG_PASSWORD, process.env.PG_PORT);
exports.default = pool;
