import mongoose from "mongoose";


const uri = "mongodb://localhost:27017/dbatividade3";

const db = mongoose;

export function connect() {
    db.connect(uri, {
        serverSelectionTimeoutMS: 12000,
        maxPoolSize: 10,
    })
    .then(() => console.log("Conectando ao MongoDB"))
    .catch((e) => {
        console.error("Erro ao conectar ao MongoDB:", e.message);
    });

    process.on("SIGINT", async () => {
        try{
            console.log("Conexão com o MongoDB fechada");
            await mongoose.connection.close();
            process.exit(0);
        } catch(error) {
            console.error("Erro ao fechar a conexão com o MongoDB:", error);
            process.exit(1);
        }
    });
}

export async function disconnect() {
    console.log("Conexão com o MongoDB encerrada");
    await db.disconnect();
}