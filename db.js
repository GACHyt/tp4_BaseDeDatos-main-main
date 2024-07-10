import mysql from "mysql2/promise";

const config = {
    user: "root",
    password: "rootroot",
    host: "localhost",
    database: "spoticfy"
}

export const conn = await mysql.createConnection(config);