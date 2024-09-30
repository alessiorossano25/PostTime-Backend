import bcrypt from "bcrypt";
import {Op} from "sequelize";
import jwt from "jsonwebtoken"; 
import User from "../models/user.js"

const userController = {

    userList: async (req, res) => {
        const userId = req.params.id
        try {
            const getUsers = await User.findAll(userId)
            res.status(200).json(getUsers)
        } catch (err) {
            res.status(500).json({ error: 'Impossibile ricevere la lista', err })
        }
    },

    singleUser: async (req, res) => {
        const userId = req.params.userId
        try {
            const getUser = await User.findByPk(userId)
            if (getUser) {
                res.json(getUser)
            } else {
                res.status(404).json({ message: "Utente non trovato" })
            }
        } catch (err) {
            console.error(err);
        }
    },

    signup: async (req, res) => {
        const { name, surname, username, email, password } = req.body
        try {
            const existingUser = await User.findOne({ where: { [Op.or]: [{ email }] } });
            if (existingUser) {
                return res.status(400).json({ error: "Utente già registrato" })
            }
            const newUser = await User.create({ name, surname, username, email, password })
            //creazione token 
            const token = jwt.sign(
                { userId: newUser.id }, 
                process.env.JWT_SECRET, 
                { expiresIn: "24h" } 
            );
            req.session.auth = true
            res.status(201).json({ message: "Registrazione effettuata con successo", newUser, token })
        } catch (err) {
            console.error("Errore durante la creazione dell'utente");
            res.status(500).json({ error: "Errore interno del server", err })
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body
        try {
            const existingUser = await User.findOne({ where: { [Op.or]: [{ email }] } })
            if (existingUser) {
                const passwordMatch = await bcrypt.compare(password, existingUser.password)
                if (passwordMatch) {
                    const token = jwt.sign(
                        { userId: existingUser.id }, 
                        process.env.JWT_SECRET, 
                        { expiresIn: '1h' } 
                    );
                    req.session.auth = true
                    res.status(200).json({ message: "Accesso effettuato", token })
                } else {
                    return res.status(401).json({ message: "Dati non corretti" })
                }
            } else {
                return res.status(401).json({ error: "Dati non corretti" })
            }
        } catch (err) {
            console.error("Errore durante l'accesso");
            return res.status(500).json({ error: "Errore interno del server" })
        }
    },

    logout: async (req, res) => {
        req.session.auth = false
        try {
            res.status(200).json({ message: "Logout effettuato con successo" })
        } catch (err) {
            res.status(500).json({ error: "Errore nel tentativo di disconnessione" })
        }
    },

    auth: async (req, res) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ authenticated: false, error: "Errore nell'autenticazione" });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ authenticated: false, error: "Errore nell'autenticazione" });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const existingUser = await User.findByPk(decoded.userId);
            if (existingUser) {
                return res.status(200).json({ authenticated: true, message: "Autenticato" });
            } else {
                return res.status(401).json({ authenticated: false, error: "Errore nell'autenticazione" });
            }
        } catch (err) {
            console.error("Errore durante l'autenticazione", err);
            return res.status(401).json({ authenticated: false, error: "Errore nell'autenticazione" });
        }
    },

    profile: async (req, res) => {
        const { id } = req.params;
        const { username, email, profile_image } = req.body;
        db.query('UPDATE users SET username = ?, email = ?, profile_image = ? WHERE id = ?', [username, email, profile_image, id], (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Profilo aggiornato correttamente" });
        });
    },

    deleteProfile: async (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Account eliminato" });
    });
    }

}

export default userController;