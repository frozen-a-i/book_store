import { config } from "dotenv";

config();
//connect
export const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "Anush12345",
    database: "bookstore",
  },
  pool: { min: 0, max: 7 },
});

//check
knex.raw("SELECT VERSION()").then(() => {
  console.log("connection to db successfully");
});
