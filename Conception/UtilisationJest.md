# Guide de Mise en Place des Tests Unitaires - TCG Écologise API

## 📋 Table des matières
1. [Installation](#installation)
2. [Structure des tests](#structure-des-tests)
3. [Configuration](#configuration)
4. [Exécution des tests](#exécution-des-tests)
5. [Couverture de code](#couverture-de-code)
6. [Bonnes pratiques](#bonnes-pratiques)

---

## 🚀 Installation

### Prérequis
- Node.js (v14 ou supérieur)
- npm ou yarn

### Étape 1 : Installer les dépendances de test

```bash
npm install --save-dev jest @types/jest ts-jest supertest @types/supertest
```

Les packages installés :
- **jest** : Framework de test JavaScript
- **@types/jest** : Types TypeScript pour Jest
- **ts-jest** : Transformateur TypeScript pour Jest
- **supertest** : Pour tester les endpoints HTTP
- **@types/supertest** : Types TypeScript pour Supertest

### Étape 2 : Mettre à jour package.json

Remplacez votre `package.json` avec celui fourni qui inclut les scripts de test :

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### Étape 3 : Créer la configuration Jest

Créez le fichier `jest.config.js` à la racine du projet avec la configuration fournie.

---

## 📁 Structure des tests

```
Testing/
├── unit/
│   ├── Controllers/
│   │   ├── AuthController.test.ts
│   │   ├── CardController.test.ts
│   │   └── UserController.test.ts
│   ├── Services/
│   │   ├── AuthService.test.ts
│   │   ├── CardService.test.ts
│   │   └── UserService.test.ts
│   ├── Models/
│   │   ├── User.test.ts
│   │   ├── Card.test.ts
│   │   └── CardModel.test.ts
│   └── Middleware/
│       └── authMiddleware.test.ts
└── README.md
```

---

## ⚙️ Configuration

### Configuration Jest (jest.config.js)

```javascript
module.exports = {
  preset: 'ts-jest',                    // Utilise ts-jest pour compiler TypeScript
  testEnvironment: 'node',              // Environnement Node.js
  roots: ['<rootDir>/Testing/unit'],    // Dossier racine des tests
  testMatch: ['**/*.test.ts'],          // Pattern pour trouver les fichiers de test
  collectCoverageFrom: [                // Fichiers à inclure dans la couverture
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts'
  ],
  coverageDirectory: 'coverage',        // Dossier de sortie de la couverture
  verbose: true                         // Mode verbeux pour plus de détails
};
```

---

## 🧪 Exécution des tests

### Commandes disponibles

#### Exécuter tous les tests
```bash
npm test
```

#### Exécuter les tests en mode watch (surveillance)
```bash
npm run test:watch
```
Le mode watch re-exécute automatiquement les tests lorsque vous modifiez un fichier.

#### Exécuter les tests avec la couverture de code
```bash
npm run test:coverage
```
Génère un rapport de couverture dans le dossier `coverage/`.

#### Exécuter un fichier de test spécifique
```bash
npm test -- AuthService.test.ts
```

#### Exécuter les tests d'un dossier spécifique
```bash
npm test -- Testing/unit/Services/
```

---

## 📊 Couverture de code

### Interpréter les résultats

Après avoir exécuté `npm run test:coverage`, vous verrez un rapport comme :

```
--------------------|---------|----------|---------|---------|
File                | % Stmts | % Branch | % Funcs | % Lines |
--------------------|---------|----------|---------|---------|
All files           |   85.23 |    78.45 |   89.12 |   85.67 |
 Controllers/       |   92.15 |    85.33 |   95.45 |   92.45 |
  AuthController.ts |   94.23 |    88.67 |   100   |   94.56 |
 Services/          |   88.45 |    82.12 |   91.23 |   89.12 |
  AuthService.ts    |   91.34 |    85.45 |   95.67 |   92.34 |
--------------------|---------|----------|---------|---------|
```

**Légende :**
- **% Stmts** : Pourcentage de déclarations exécutées
- **% Branch** : Pourcentage de branches conditionnelles testées
- **% Funcs** : Pourcentage de fonctions appelées
- **% Lines** : Pourcentage de lignes exécutées

### Rapport HTML

Ouvrez `coverage/lcov-report/index.html` dans un navigateur pour voir un rapport détaillé et interactif.

---

## 🎯 Bonnes pratiques

### 1. Organisation des tests

#### Structure AAA (Arrange-Act-Assert)
```typescript
it('devrait créer un utilisateur', async () => {
  // Arrange : Préparer les données
  const newUser = new User(0, 'Test', 'test@test.com', 'pass');
  
  // Act : Exécuter l'action
  await userService.create(newUser);
  
  // Assert : Vérifier le résultat
  expect(mockUserDAO.insert).toHaveBeenCalledWith(newUser);
});
```

### 2. Nommage des tests

Utilisez des descriptions claires :
```typescript
// ✅ Bon
it('devrait retourner une erreur 401 si le token est invalide', () => {});

// ❌ Mauvais
it('test token', () => {});
```

### 3. Tests isolés

Chaque test doit être indépendant :
```typescript
beforeEach(() => {
  // Réinitialiser les mocks avant chaque test
  jest.clearAllMocks();
});
```

### 4. Utilisation des mocks

```typescript
// Mock d'une dépendance
jest.mock('bcrypt');

// Configuration du comportement du mock
(bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

// Vérification des appels
expect(bcrypt.hash).toHaveBeenCalledWith('password', 12);
```

### 5. Tests asynchrones

```typescript
// Avec async/await
it('devrait créer un utilisateur', async () => {
  await userService.create(newUser);
  expect(mockUserDAO.insert).toHaveBeenCalled();
});

// Tester les rejets
it('devrait lever une erreur', async () => {
  await expect(userService.get(999))
    .rejects.toThrow('User not found');
});
```

### 6. Couverture de code

**Objectifs recommandés :**
- **Minimum** : 70% de couverture
- **Idéal** : 80-90% de couverture
- **Critique** : 100% pour le code critique (authentification, paiements, etc.)

### 7. Tests à écrire en priorité

1. **Services critiques** : AuthService, UserService
2. **Middleware** : authMiddleware, requireRole
3. **Controllers** : Validation des entrées/sorties
4. **Models** : Getters/setters, constructeurs
5. **DAOs** : Opérations de base de données

---

## 📝 Exemples de tests

### Test d'un Service

```typescript
describe('UserService', () => {
  let userService: UserService;
  let mockUserDAO: jest.Mocked<UserDAO>;

  beforeEach(() => {
    mockUserDAO = {
      findById: jest.fn(),
      insert: jest.fn(),
      // ... autres méthodes
    } as jest.Mocked<UserDAO>;
    
    userService = new UserService(mockUserDAO);
  });

  it('devrait trouver un utilisateur par ID', async () => {
    const mockUser = new User(1, 'Test', 'test@test.com');
    mockUserDAO.findById.mockResolvedValue(mockUser);

    const result = await userService.get(1);

    expect(result).toEqual(mockUser);
    expect(mockUserDAO.findById).toHaveBeenCalledWith(1);
  });
});
```

### Test d'un Controller

```typescript
describe('AuthController', () => {
  let authController: AuthController;
  let mockAuthService: jest.Mocked<AuthService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockAuthService = {
      login: jest.fn(),
    } as any;

    mockRequest = { body: {} };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    authController = new AuthController(mockAuthService);
  });

  it('devrait retourner un token', async () => {
    mockRequest.body = { email: 'test@test.com', password: 'pass' };
    mockAuthService.login.mockResolvedValue('token');

    await authController.login(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.json).toHaveBeenCalledWith({ token: 'token' });
  });
});
```

---

## 🔧 Dépannage

### Problème : Les tests ne trouvent pas les modules

**Solution :** Vérifiez que `tsconfig.json` a les bonnes configurations :
```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "moduleResolution": "node"
  }
}
```

### Problème : Erreur "Cannot find module 'src/...'"

**Solution :** Vérifiez la configuration des `roots` dans `jest.config.js`.

### Problème : Les mocks ne fonctionnent pas

**Solution :** Assurez-vous d'appeler `jest.mock()` avant l'import du module :
```typescript
jest.mock('bcrypt');  // Doit être avant l'import
import bcrypt from 'bcrypt';
```

---

## 📚 Ressources supplémentaires

- [Documentation Jest](https://jestjs.io/docs/getting-started)
- [Documentation ts-jest](https://kulshekhar.github.io/ts-jest/)
- [Documentation Supertest](https://github.com/visionmedia/supertest)
- [Guide des mocks Jest](https://jestjs.io/docs/mock-functions)

---

## 🎓 Prochaines étapes

1. ✅ Installer les dépendances
2. ✅ Configurer Jest
3. ✅ Créer les premiers tests
4. ⏭️ Ajouter des tests d'intégration
5. ⏭️ Mettre en place le CI/CD avec les tests
6. ⏭️ Viser 80%+ de couverture de code

---

**Bon testing ! 🚀**