import database from "../database/connectDB";
import bcrypt from "bcrypt";


const User = database.define('User', {
    nickname: {
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
            const hashedPassword = bcrypt.hashSync(value, 10)
            this.setDataValue('passwordCript', hashedPassword)
        }
    }
}, {
    tableName: 'users',
    timestamps: false
})

module.exports = User