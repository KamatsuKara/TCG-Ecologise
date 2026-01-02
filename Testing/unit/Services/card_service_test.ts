import { CardService } from '../../../src/Services/CardService';
import { CardDAO } from '../../../src/DAO/CardDAO';
import { Card } from '../../../src/Models/Card';
import { User } from '../../../src/Models/User';
import { CardModel } from '../../../src/Models/CardModel';
import { Rarity } from '../../../src/Models/Rarity';

describe('CardService', () => {
  let cardService: CardService;
  let mockCardDAO: jest.Mocked<CardDAO>;

  beforeEach(() => {
    mockCardDAO = {
      insert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      findByUser: jest.fn(),
      findByCardModel: jest.fn(),
      findByRarity: jest.fn(),
    } as jest.Mocked<CardDAO>;

    cardService = new CardService(mockCardDAO);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('devrait retourner toutes les cartes paginées', async () => {
      const mockCards: Card[] = [
        new Card(1),
        new Card(2),
        new Card(3),
        new Card(4),
        new Card(5),
      ];

      mockCardDAO.findAll.mockResolvedValue(mockCards);

      const result = await cardService.getAll(2, 1);

      expect(mockCardDAO.findAll).toHaveBeenCalled();
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
    });

    it('devrait retourner la deuxième page de résultats', async () => {
      const mockCards: Card[] = [
        new Card(1),
        new Card(2),
        new Card(3),
        new Card(4),
        new Card(5),
      ];

      mockCardDAO.findAll.mockResolvedValue(mockCards);

      const result = await cardService.getAll(2, 2);

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(3);
      expect(result[1].id).toBe(4);
    });

    it('devrait utiliser les valeurs par défaut (limit=10, page=1)', async () => {
      const mockCards: Card[] = Array.from({ length: 15 }, (_, i) => new Card(i + 1));

      mockCardDAO.findAll.mockResolvedValue(mockCards);

      const result = await cardService.getAll(10, 1);

      expect(result).toHaveLength(10);
    });
  });

  describe('get', () => {
    it('devrait retourner une carte par son ID', async () => {
      const mockCard = new Card(1, new User(), new CardModel(), new Rarity());

      mockCardDAO.findById.mockResolvedValue(mockCard);

      const result = await cardService.get(1);

      expect(mockCardDAO.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockCard);
    });

    it('devrait lever une erreur si la carte n\'existe pas', async () => {
      mockCardDAO.findById.mockResolvedValue(undefined);

      await expect(cardService.get(999)).rejects.toThrow('Card not found');
    });
  });

  describe('getByUser', () => {
    it('devrait retourner toutes les cartes d\'un utilisateur', async () => {
      const mockCards: Card[] = [new Card(1), new Card(2)];

      mockCardDAO.findByUser.mockResolvedValue(mockCards);

      const result = await cardService.getByUser(1);

      expect(mockCardDAO.findByUser).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockCards);
    });

    it('devrait lever une erreur si aucune carte n\'est trouvée', async () => {
      mockCardDAO.findByUser.mockResolvedValue(undefined as any);

      await expect(cardService.getByUser(999)).rejects.toThrow('Card not found');
    });
  });

  describe('create', () => {
    it('devrait créer une nouvelle carte avec les timestamps', async () => {
      const newCard = new Card(0, new User(1), new CardModel(1), new Rarity(1));
      const beforeTime = Date.now();

      mockCardDAO.insert.mockResolvedValue(undefined);

      await cardService.create(newCard);

      const afterTime = Date.now();

      expect(newCard.created).toBeGreaterThanOrEqual(beforeTime);
      expect(newCard.created).toBeLessThanOrEqual(afterTime);
      expect(newCard.obtened).toBeGreaterThanOrEqual(beforeTime);
      expect(newCard.obtened).toBeLessThanOrEqual(afterTime);
      expect(mockCardDAO.insert).toHaveBeenCalledWith(newCard);
    });
  });

  describe('delete', () => {
    it('devrait supprimer une carte par son ID', async () => {
      mockCardDAO.delete.mockResolvedValue(undefined);

      await cardService.delete(1);

      expect(mockCardDAO.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('devrait mettre à jour une carte', async () => {
      const updatedCard = new Card(1, new User(1), new CardModel(1), new Rarity(2));

      mockCardDAO.update.mockResolvedValue(undefined);

      await cardService.update(updatedCard);

      expect(mockCardDAO.update).toHaveBeenCalledWith(updatedCard);
    });
  });
});