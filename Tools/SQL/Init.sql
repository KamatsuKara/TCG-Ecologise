PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    discord_username VARCHAR(100) DEFAULT NULL,
    email VARCHAR(50) NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(15) NOT NULL CHECK (role IN ('USER', 'ADMIN')) DEFAULT 'USER',
    creation DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS RefreshToken (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token_hash UUID UNIQUE NOT NULL,
    id_user INT NOT NULL,
    expiration_date DATETIME NOT NULL,
    revoked BOOLEAN DEFAULT True,
    CONSTRAINT fk_refreshToken_user FOREIGN KEY (id_user) REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS Card (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_user INT NOT NULL,
    id_cardmodel INT NOT NULL,
    id_rarity INT NOT NULL,
    obtened DATETIME NOT NULL,
    created DATETIME NOT NULL,
    CONSTRAINT fk_card_user FOREIGN KEY (id_user) REFERENCES User(id),
    CONSTRAINT fk_card_cardmodel FOREIGN KEY (id_cardmodel) REFERENCES CardModel(id),
    CONSTRAINT fk_card_rarity FOREIGN KEY (id_rarity) REFERENCES Rarity(id)
);

CREATE TABLE IF NOT EXISTS CardModel (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    image VARCHAR(100) DEFAULT NULL,
    category TEXT DEFAULT '[]' NOT NULL,
    description TEXT DEFAULT NULL,
    effect TEXT DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS Rarity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS CardHist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_card INT NOT NULL,
    id_user INT NOT NULL,
    obtened DATETIME NOT NULL,
    CONSTRAINT fk_cardhist_card FOREIGN KEY (id_card) REFERENCES Card(id),
    CONSTRAINT fk_cardhist_user FOREIGN KEY (id_user) REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS Booster (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    seed INT NOT NULL,
    id_boostermodel INT NOT NULL,
    id_user INT NOT NULL,
    obtened DATETIME NOT NULL,
    created DATETIME NOT NULL,
    CONSTRAINT fk_booster_user FOREIGN KEY (id_user) REFERENCES User(id),
    CONSTRAINT fk_booster_boostermodel FOREIGN KEY (id_boostermodel) REFERENCES BoosterModel(id)
);

CREATE TABLE IF NOT EXISTS BoosterModel (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) DEFAULT 'NO NAME',
    nmbCard INT DEFAULT 5,
    category TEXT DEFAULT '[]' NOT NULL
);

CREATE TABLE IF NOT EXISTS BoosterDropRate (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_rarity INT NOT NULL,
    id_boostermodel INT NOT NULL,
    guarantee INT DEFAULT 0,
    drop_rate DECIMAL(5,2) DEFAULT 20,
    CONSTRAINT fk_boosterdroprate_boostermodel FOREIGN KEY (id_boostermodel) REFERENCES BoosterModel(id),
    CONSTRAINT fk_boosterdroprate_rarity FOREIGN KEY (id_rarity) REFERENCES Rarity(id)
);

CREATE TABLE IF NOT EXISTS Trade (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_sender INT NOT NULL,
    id_receiver INT NOT NULL,
    status VARCHAR(15) NOT NULL CHECK (status IN ('PENDING', 'ACCEPTED', 'DECLINED', 'CANCELLED')) DEFAULT 'PENDING',
    created_at DATETIME NOT NULL,
    updated_at DATETIME DEFAULT NULL,
    CONSTRAINT fk_trade_user_sender FOREIGN KEY (id_sender) REFERENCES User(id),
    CONSTRAINT fk_trade_user_receiver FOREIGN KEY (id_receiver) REFERENCES User(id)
);

CREATE TABLE IF NOT EXISTS CardTrade (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_trade INT NOT NULL,
    id_card INT NOT NULL,
    id_owner INT NOT NULL,
    PRIMARY KEY (id_trade, id_card),
    CONSTRAINT fk_cardtrade_trade FOREIGN KEY (id_trade) REFERENCES Trade(id),
    CONSTRAINT fk_cardtrade_card FOREIGN KEY (id_card) REFERENCES Card(id),
    CONSTRAINT fk_cardtrade_user FOREIGN KEY (id_owner) REFERENCES User(id)
);