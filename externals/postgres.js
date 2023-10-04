import pkg from "pg";
import "dotenv/config";
const Pool = pkg.Pool;

const { DB_USER, DB_NAME, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

export const pool = new Pool({
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
  host: DB_HOST,
});
