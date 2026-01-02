import { Request, Response } from 'express';
import { AuthController } from '../../../src/Controllers/AuthController';
import { AuthService } from '../../../src/Services/AuthService';

describe('AuthController', () => {
  let authController: AuthController;
  let mockAuthService: jest.Mocked<AuthService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockAuthService = {
      login: jest.fn(),
      register: jest.fn(),
    } as any;

    authController = new AuthController(mockAuthService);

    mockRequest = {
      body: {},
    };

    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('devrait retourner un token en cas de connexion réussie', async () => {
      const mockToken = 'mock.jwt.token';
      mockRequest.body = {
        email: 'test@example.com',
        password: 'password123',
      };

      mockAuthService.login.mockResolvedValue(mockToken);

      await authController.login(mockRequest as Request, mockResponse as Response);

      expect(mockAuthService.login).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(mockResponse.json).toHaveBeenCalledWith({ token: mockToken });
    });

    it('devrait retourner une erreur 500 en cas d\'échec', async () => {
      mockRequest.body = {
        email: 'test@example.com',
        password: 'wrongPassword',
      };

      const error = new Error('User incorrect');
      mockAuthService.login.mockRejectedValue(error);

      await authController.login(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'User incorrect' });
    });

    it('devrait gérer les champs manquants avec des valeurs par défaut', async () => {
      mockRequest.body = {};
      mockAuthService.login.mockResolvedValue('token');

      await authController.login(mockRequest as Request, mockResponse as Response);

      expect(mockAuthService.login).toHaveBeenCalledWith('Error', 'Error');
    });
  });

  describe('register', () => {
    it('devrait enregistrer un nouvel utilisateur avec succès', async () => {
      mockRequest.body = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      mockAuthService.register.mockResolvedValue(undefined);

      await authController.register(mockRequest as Request, mockResponse as Response);

      expect(mockAuthService.register).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.json).toHaveBeenCalledWith('Register done');
    });

    it('devrait retourner une erreur 500 en cas d\'échec d\'enregistrement', async () => {
      mockRequest.body = {
        name: 'Test User',
        email: 'existing@example.com',
        password: 'password123',
      };

      const error = new Error('Email already exists');
      mockAuthService.register.mockRejectedValue(error);

      await authController.register(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Email already exists' });
    });
  });
});