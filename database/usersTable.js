import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


connection.query ("SELECT * FROM UsersTable");

connection.query(
    `CREATE TABLE IF NOT EXISTS UsersTable ( 
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_image VARCHAR(255)
    )`, (err) => {
        if(err) {
            console.log("Tabella non creata", err);
        } else {
            console.log("Tabella creata correttamente");
        }
    }
);