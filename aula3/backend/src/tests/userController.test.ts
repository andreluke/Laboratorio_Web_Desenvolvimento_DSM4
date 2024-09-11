import request from "supertest";
import app from "../index"; // O app Express
import { connect, disconnect } from "../models/connection"; // Conexão ao banco de dados

beforeAll(async () => {
    connect(); // Conecta ao banco antes de todos os testes
});

afterAll(async () => {
    await disconnect(); // Desconecta após todos os testes
});

describe("Rotas de Usuários", () => {
    it("Deve criar um novo usuário", async () => {
        const response = await request(app)
            .post("/usuario")
            .send({ nome: "Usuário Teste", email: "teste@example.com" });
        expect(response.status).toBe(200);
        expect(response.body.nome).toBe("Usuário Teste");
    });

    it("Deve listar os usuários", async () => {
        const response = await request(app).get("/usuario");
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("Deve atualizar o e-mail do usuário", async () => {
        // Crie um usuário primeiro
        const user = await request(app)
            .post("/usuario")
            .send({ nome: "Usuário Teste", email: "teste2@example.com" });
        
        const response = await request(app)
            .put("/usuario/email")
            .send({ id: user.body._id, email: "novoemail@example.com" });

        expect(response.status).toBe(200);
        expect(response.body.email).toBe("novoemail@example.com");
    });

    it("Deve deletar um usuário", async () => {
        // Crie um usuário primeiro
        const user = await request(app)
            .post("/usuario")
            .send({ nome: "Usuário Deletável", email: "delete@example.com" });

        const response = await request(app)
            .delete("/usuario")
            .send({ id: user.body._id });

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe("Usuário Deletável");
    });
});
