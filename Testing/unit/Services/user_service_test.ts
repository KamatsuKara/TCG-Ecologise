import { UserService } from '../../../src/Services/UserService';
import { UserDAO } from '../../../src/DAO/UserDAO';
import { User } from '../../../src/Models/User';
import bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('UserService', () => {
  let userService: UserService;
  let mockUserDAO: jest.Mocked<UserDAO>;

  beforeEach(() => {
    mockUserDAO = {
      insert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
    } as jest.Mocked<UserDAO>;

    userService = new UserService(mockUserDAO);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('devrait retourner tous les utilisateurs paginés', async () => {
      const mockUsers: User[] = [
        new User(1, 'User1', 'user1@test.com'),
        new User(2, 'User2', 'user2@test.com'),
        new User(3, 'User3', 'user3@test.com'),
      ];

      mockUserDAO.findAll.mockResolvedValue(mockUsers);

      const result = await userService.getAll(2, 1);

      expect(mockUserDAO.findAll).toHaveBeenCalled();
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
    });
  });

  describe('get', () => {
    it('devrait retourner un utilisateur par son ID sans le mot de passe', async () => {
      const mockUser = new User(1, 'Test User', 'test@test.com', 'hashedPassword123', 'USER');

      mockUserDAO.findById.mockResolvedValue(mockUser);

      const result = await userService.get(1);

      expect(mockUserDAO.findById).toHaveBeenCalledWith(1);
      expect(result.password).toBe('');
      expect(result.name).toBe('Test User');
    });

    it('devrait lever une erreur si l\'utilisateur n\'existe pas', async () => {
      mockUserDAO.findById.mockResolvedValue(undefined);

      await expect(userService.get(999)).rejects.toThrow('User not found');
    });
  });

  describe('create', () => {
    it('devrait créer un utilisateur avec un mot de passe hashé', async () => {
      const newUser = new User(0, 'New User', 'new@test.com', 'plainPassword');
      const hashedPassword = 'hashedPassword123';

      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      mockUserDAO.insert.mockResolvedValue(undefined);

      await userService.create(newUser);

      expect(bcrypt.hash).toHaveBeenCalledWith('plainPassword', 12);
      expect(newUser.password).toBe(hashedPassword);
      expect(newUser.create).toBeLessThanOrEqual(Date.now());
      expect(mockUserDAO.insert).toHaveBeenCalledWith(newUser);
    });
  });

  describe('delete', () => {
    it('devrait supprimer un utilisateur', async () => {
      mockUserDAO.delete.mockResolvedValue(undefined);

      await userService.delete(1);

      expect(mockUserDAO.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un utilisateur', async () => {
      const updatedUser = new User(1, 'Updated Name', 'updated@test.com');

      mockUserDAO.update.mockResolvedValue(undefined);

      await userService.update(updatedUser);

      expect(mockUserDAO.update).toHaveBeenCalledWith(updatedUser);
    });
  });
});