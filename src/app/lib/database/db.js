import mysql from "mysql2/promise";
import { Config } from "@/app/lib/Config";

const db = mysql.createPool({
  host: Config.database.host,
  user: Config.database.user,
  port: Config.database.port,
  password: Config.database.password,
  database: Config.database.database,
});

export default db;
