import { CardModel } from '../../../src/Models/CardModel';

describe('CardModel', () => {
  describe('constructor', () => {
    it('devrait créer un CardModel avec les valeurs par défaut', () => {
      const cardModel = new CardModel();

      expect(cardModel.id).toBe(0);
      expect(cardModel.name).toBe('');
      expect(cardModel.image).toBe('');
      expect(cardModel.description).toBe('');
      expect(cardModel.effect).toBe('');
    });

    it('devrait créer un CardModel avec les valeurs fournies', () => {
      const cardModel = new CardModel(
        1,
        'Forêt Ancienne',
        'forest.png',
        'Une forêt millénaire',
        'Régénère 2 PV'
      );

      expect(cardModel.id).toBe(1);
      expect(cardModel.name).toBe('Forêt Ancienne');
      expect(cardModel.image).toBe('forest.png');
      expect(cardModel.description).toBe('Une forêt millénaire');
      expect(cardModel.effect).toBe('Régénère 2 PV');
    });
  });

  describe('getters and setters', () => {
    let cardModel: CardModel;

    beforeEach(() => {
      cardModel = new CardModel();
    });

    it('devrait définir et récupérer l\'ID', () => {
      cardModel.id = 42;
      expect(cardModel.id).toBe(42);
    });

    it('devrait définir et récupérer le nom', () => {
      cardModel.name = 'Montagne Sacrée';
      expect(cardModel.name).toBe('Montagne Sacrée');
    });

    it('devrait définir et récupérer l\'image', () => {
      cardModel.image = 'mountain.png';
      expect(cardModel.image).toBe('mountain.png');
    });

    it('devrait définir et récupérer la description', () => {
      cardModel.description = 'Une montagne sacrée';
      expect(cardModel.description).toBe('Une montagne sacrée');
    });

    it('devrait définir et récupérer l\'effet', () => {
      cardModel.effect = '+3 défense';
      expect(cardModel.effect).toBe('+3 défense');
    });
  });
});