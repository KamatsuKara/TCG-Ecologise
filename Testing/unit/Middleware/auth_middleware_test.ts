import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authJWT, requireRole } from '../../../src/authMiddleware';

jest.mock('jsonwebtoken');

describe('authMiddleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    process.env.JWT_SECRET = 'test-secret';

    mockRequest = {
      headers: {},
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('authJWT', () => {
    it('devrait autoriser une requête avec un token valide', () => {
      const mockPayload = { sub: '1', role: 'USER' };
      mockRequest.headers = {
        authorization: 'Bearer valid.jwt.token',
      };

      (jwt.verify as jest.Mock).mockReturnValue(mockPayload);

      authJWT(mockRequest as Request, mockResponse as Response, mockNext);

      expect(jwt.verify).toHaveBeenCalledWith('valid.jwt.token', 'test-secret');
      expect(mockRequest.user).toEqual({ sub: '1', role: 'USER' });
      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('devrait rejeter une requête sans header authorization', () => {
      authJWT(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.send).toHaveBeenCalledWith('Missing token');
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('devrait rejeter un token sans préfixe Bearer', () => {
      mockRequest.headers = {
        authorization: 'invalid.jwt.token',
      };

      authJWT(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.send).toHaveBeenCalledWith('Invalid token format');
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('devrait rejeter un token invalide', () => {
      mockRequest.headers = {
        authorization: 'Bearer invalid.jwt.token',
      };

      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid token');
      });

      authJWT(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.send).toHaveBeenCalledWith('Invalid token');
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('devrait gérer un header authorization en tableau', () => {
      const mockPayload = { sub: '1', role: 'USER' };
      mockRequest.headers = {
        authorization: ['Bearer valid.jwt.token'],
      };

      (jwt.verify as jest.Mock).mockReturnValue(mockPayload);

      authJWT(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('requireRole', () => {
    beforeEach(() => {
      mockRequest.user = { sub: '1', role: 'USER' };
    });

    it('devrait autoriser un utilisateur avec le rôle requis', () => {
      const middleware = requireRole(['USER', 'ADMIN']);

      middleware(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('devrait rejeter un utilisateur sans le rôle requis', () => {
      mockRequest.user = { sub: '1', role: 'USER' };
      const middleware = requireRole(['ADMIN']);

      middleware(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.send).toHaveBeenCalledWith('Forbidden');
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('devrait rejeter une requête sans rôle défini', () => {
      mockRequest.user = { sub: '1', role: undefined as any };
      const middleware = requireRole(['USER']);

      middleware(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.send).toHaveBeenCalledWith('No Role');
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('devrait rejeter une requête sans objet user', () => {
      mockRequest.user = undefined;
      const middleware = requireRole(['USER']);

      middleware(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.send).toHaveBeenCalledWith('No Role');
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});