import request from 'supertest';
import app from '../index'; // Assumindo que o Express app é exportado de 'app.ts'
import { User } from '../models/index';

describe('UserController', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('deve criar um novo usuário', async () => {
    const response = await request(app)
      .post('/usuario')
      .send({ nome: 'John Doe', email: 'john@example.com' })
      .expect(200);

    expect(response.body).toHaveProperty('_id');
    expect(response.body.nome).toBe('John Doe');
    expect(response.body.email).toBe('john@example.com');
  });

  it('deve listar usuários', async () => {
    await User.create({ nome: 'Jane Doe', email: 'jane@example.com' });

    const response = await request(app).get('/usuario').expect(200);

    expect(response.body.length).toBe(1);
    expect(response.body[0].nome).toBe('Jane Doe');
  });

  it('deve deletar um usuário', async () => {
    const user = await User.create({ nome: 'John Doe', email: 'john@example.com' });

    const response = await request(app)
      .delete('/usuario')
      .send({ id: user._id })
      .expect(200);

    expect(response.body).toHaveProperty('_id', user._id.toString());
  });

  it('deve atualizar o email do usuário', async () => {
    const user = await User.create({ nome: 'John Doe', email: 'john@example.com' });

    const response = await request(app)
      .put('/usuario/email')
      .send({ id: user._id, email: 'john.updated@example.com' })
      .expect(200);

    expect(response.body.email).toBe('john.updated@example.com');
  });

  it('deve retornar erro ao tentar criar usuário com email duplicado', async () => {
    await User.create({ nome: 'John Doe', email: 'john@example.com' });

    const response = await request(app)
      .post('/usuario')
      .send({ nome: 'Jane Doe', email: 'john@example.com' })
      .expect(409);

    expect(response.body.message).toBe('O e-mail john@example.com já está em uso');
  });
});
