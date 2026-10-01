
const { Pool } = require("pg");

const pool = new Pool({
  user: "neondb_owner",
  host: "ep-weathered-mud-aq9u6f7j-pooler.c-8.us-east-1.aws.neon.tech",
  database: "neondb",
  password: "npg_EdGZ9VAHzP2M",
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;