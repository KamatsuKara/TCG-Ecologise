import { AuthService } from '../../../src/Services/AuthService';
import { UserDAO } from '../../../src/DAO/UserDAO';
import { User } from '../../../src/Models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Mock des dépendances
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('AuthService', () => {
  let authService: AuthService;
  let mockUserDAO: jest.Mocked<UserDAO>;

  beforeEach(() => {
    // Création d'un mock du UserDAO
    mockUserDAO = {
      insert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
    } as jest.Mocked<UserDAO>;

    authService = new AuthService(mockUserDAO);

    // Configuration de l'environnement
    process.env.JWT_SECRET = 'test-secret';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('devrait retourner un token JWT valide pour des identifiants corrects', async () => {
      const mockUser = new User(1, 'Test User', 'test@example.com', 'hashedPassword', 'USER', Date.now());
      const mockToken = 'mock.jwt.token';

      mockUserDAO.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue(mockToken);

      const result = await authService.login('test@example.com', 'password123');

      expect(mockUserDAO.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(jwt.sign).toHaveBeenCalledWith(
        { sub: 1, role: 'USER' },
        'test-secret',
        { expiresIn: '1h' }
      );
      expect(result).toBe(mockToken);
    });

    it('devrait lever une erreur si l\'utilisateur n\'existe pas', async () => {
      mockUserDAO.findByEmail.mockResolvedValue(undefined);

      await expect(authService.login('wrong@example.com', 'password123'))
        .rejects.toThrow('User incorrect');

      expect(mockUserDAO.findByEmail).toHaveBeenCalledWith('wrong@example.com');
      expect(bcrypt.compare).not.toHaveBeenCalled();
    });

    it('devrait lever une erreur si le mot de passe est incorrect', async () => {
      const mockUser = new User(1, 'Test User', 'test@example.com', 'hashedPassword', 'USER', Date.now());

      mockUserDAO.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(authService.login('test@example.com', 'wrongPassword'))
        .rejects.toThrow('User incorrect');

      expect(bcrypt.compare).toHaveBeenCalledWith('wrongPassword', 'hashedPassword');
      expect(jwt.sign).not.toHaveBeenCalled();
    });
  });

  describe('register', () => {
    it('devrait créer un nouvel utilisateur avec un mot de passe hashé', async () => {
      const newUser = new User(0, 'New User', 'new@example.com', 'plainPassword');
      const hashedPassword = 'hashedPassword123';

      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      mockUserDAO.insert.mockResolvedValue(undefined);

      await authService.register(newUser);

      expect(bcrypt.hash).toHaveBeenCalledWith('plainPassword', 12);
      expect(newUser.password).toBe(hashedPassword);
      expect(newUser.role).toBe('USER');
      expect(newUser.create).toBeLessThanOrEqual(Date.now());
      expect(mockUserDAO.insert).toHaveBeenCalledWith(newUser);
    });

    it('devrait définir le rôle sur USER par défaut', async () => {
      const newUser = new User(0, 'New User', 'new@example.com', 'plainPassword', 'ADMIN');

      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      mockUserDAO.insert.mockResolvedValue(undefined);

      await authService.register(newUser);

      expect(newUser.role).toBe('USER');
    });
  });
});