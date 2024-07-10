import { config } from "./dbconfig.js";
import mysql from "mysql2/promise";

let connection = await mysql.createConnection(config)

try {
    const [results, fields] = await connection.query(
        "SELECT * from albumes"
    );

    console.log(results);
    console.log(fields);
} catch (err) {
    console.log (err);
}

process.exit();
