import { DataTypes } from "sequelize";
import database from "../database/connectDB.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const User = database.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            const hashedPassword = bcrypt.hashSync(value, 10);
            this.setDataValue('password', hashedPassword); // Corretto a 'password'
        }
    }
}, {
    tableName: 'users',
    timestamps: false
});

export default User;