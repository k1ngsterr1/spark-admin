import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: "SPARK_ADMIN",
  password: process.env.DB_BASS,
  port: 5432,
});

export default pool;
