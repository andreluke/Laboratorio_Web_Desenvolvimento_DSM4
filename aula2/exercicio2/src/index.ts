import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import { connect } from "./models/connection";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express()

app.use(express.json());

app.use(cors());

connect();

app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}...`);
});

app.use(routes);