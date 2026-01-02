import { User } from '../../../src/Models/User';

describe('User', () => {
  describe('constructor', () => {
    it('devrait créer un utilisateur avec les valeurs par défaut', () => {
      const user = new User();

      expect(user.id).toBe(0);
      expect(user.name).toBe('');
      expect(user.email).toBe('');
      expect(user.password).toBe('');
      expect(user.role).toBe('USER');
      expect(user.create).toBeLessThanOrEqual(Date.now());
    });

    it('devrait créer un utilisateur avec les valeurs fournies', () => {
      const timestamp = Date.now();
      const user = new User(
        1,
        'John Doe',
        'john@example.com',
        'hashedPassword123',
        'ADMIN',
        timestamp
      );

      expect(user.id).toBe(1);
      expect(user.name).toBe('John Doe');
      expect(user.email).toBe('john@example.com');
      expect(user.password).toBe('hashedPassword123');
      expect(user.role).toBe('ADMIN');
      expect(user.create).toBe(timestamp);
    });

    it('devrait créer un utilisateur avec le rôle USER par défaut', () => {
      const user = new User(1, 'Test User', 'test@example.com', 'password');

      expect(user.role).toBe('USER');
    });
  });

  describe('getters and setters', () => {
    let user: User;

    beforeEach(() => {
      user = new User();
    });

    it('devrait définir et récupérer l\'ID', () => {
      user.id = 42;
      expect(user.id).toBe(42);
    });

    it('devrait définir et récupérer le nom', () => {
      user.name = 'Alice';
      expect(user.name).toBe('Alice');
    });

    it('devrait définir et récupérer l\'email', () => {
      user.email = 'alice@example.com';
      expect(user.email).toBe('alice@example.com');
    });

    it('devrait définir et récupérer le mot de passe', () => {
      user.password = 'newPassword123';
      expect(user.password).toBe('newPassword123');
    });

    it('devrait définir et récupérer le rôle', () => {
      user.role = 'ADMIN';
      expect(user.role).toBe('ADMIN');
    });

    it('devrait définir et récupérer la date de création', () => {
      const timestamp = Date.now();
      user.create = timestamp;
      expect(user.create).toBe(timestamp);
    });
  });
});