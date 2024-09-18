import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import { connect } from "./db/connection";
dotenv.config();

// será usado 3000 se a variável de ambiente não tiver sido definida
const PORT = process.env.PORT || 3000;

const app = express(); // cria o servidor e coloca na variável app

// suportar parâmetros JSON no body da requisição
app.use(express.json());

// configura o servidor para receber requisições de qualquer domínio
app.use(cors());

// define a rota para o pacote /routes
app.use(routes);

// conecta ao MongoDB no início da aplicação
connect();

// inicializa o servidor na porta especificada
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Rodando na porta ${PORT}...`);
    });
}

export default app;
