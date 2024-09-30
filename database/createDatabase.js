import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


connection.query(
    "CREATE DATABASE IF NOT EXISTS database", (err) => {
        if(err) {
            console.log("Database non creato", err);
        } else {
            console.log("Database creato");
        }
    }
);