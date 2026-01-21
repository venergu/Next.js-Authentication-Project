import mysql from "mysql2/promise";
import { Config } from "@/app/lib/Config";
export const db = mysql.createConnection({
  host: Config.database.host,
  user: Config.database.user,
  password: Config.database.password,
  database: Config.database.database,
});
