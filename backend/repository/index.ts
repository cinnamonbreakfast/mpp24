import { Pool } from "pg";

const pool = new Pool({
  user: process.env.PG_USERNAME,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: (process.env.PG_PORT && +process.env.PG_PORT) || 5432,
  host: process.env.PG_HOST,
});

pool.connect(() =>
  console.log(
    `Connected to Postgres ${process.env.PG_PORT} ${process.env.PG_HOST}`
  )
);

export default pool;
