import mysql from "mysql2";

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.query ("SELECT * FROM postTable");

connection.query(
    `CREATE TABLE IF NOT EXISTS UsersTable ( 
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`, (err) => {
        if(err) {
            console.log("Tabella non creata", err);
        } else {
            console.log("Tabella creata correttamente");
        }
    }
);