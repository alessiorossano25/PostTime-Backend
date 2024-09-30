import {Sequelize} from "sequelize";
import dotenv from "dotenv"
dotenv.config();


const sequelize = new Sequelize (process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME, {
    host: process.env.DB_HOST,
    dialect : "mysql",
    dialectModule : "mysql2"
});

module.exports = sequelize;