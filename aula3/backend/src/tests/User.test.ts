import { User } from '../models/index';

describe('User Model', () => {
  it('deve criar um usuário com nome e email válidos', async () => {
    const user = await User.create({ nome: 'John Doe', email: 'john@example.com' });

    expect(user).toHaveProperty('_id');
    expect(user.nome).toBe('John Doe');
    expect(user.email).toBe('john@example.com');
  });

  it('não deve permitir criar usuário sem nome', async () => {
    try {
      await User.create({ email: 'john@example.com' });
    } catch (error: any) {
      expect(error.errors.nome).toBeDefined();
    }
  });

  it('não deve permitir criar usuário sem email', async () => {
    try {
      await User.create({ nome: 'John Doe' });
    } catch (error: any) {
      expect(error.errors.email).toBeDefined();
    }
  });

  it('não deve permitir criar usuário com email duplicado', async () => {
    await User.create({ nome: 'John Doe', email: 'john@example.com' });

    try {
      await User.create({ nome: 'Jane Doe', email: 'john@example.com' });
    } catch (error: any) {
      expect(error.code).toBe(11000); // Código para chave duplicada
    }
  });
});
