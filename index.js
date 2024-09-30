import dotenv from "dotenv";
import express from "express";
import session from "cookie-session";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "../routes/userRouter.js";

dotenv.config();


const app = express();


app.use(cors())
app.use(bodyParser.json());
app.use(session({
    name: 'session',
    keys: [process.env.JWT_SECRET],
    maxAge: 24 * 60 * 60 * 1000
}));

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api', userRouter);

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Il server è attivo alla porta ${PORT}`);
})