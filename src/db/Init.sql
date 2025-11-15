PRAGMA foreign_keys = ON;

CREATE TABLE User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    creation DATETIME
);

CREATE TABLE Card (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_user INT NOT NULL,
    id_cardmodel INT NOT NULL,
    id_rarity INT NOT NULL,
    obtened DATETIME,
    created DATETIME,
    CONSTRAINT fk_cards_owner FOREIGN KEY (id_user) REFERENCES User(id),
    CONSTRAINT fk_cards_model FOREIGN KEY (id_cardmodel) REFERENCES CardModel(id),
    CONSTRAINT fk_cards_rarity FOREIGN KEY (id_rarity) REFERENCES Rarity(id)
);

CREATE TABLE CardModel (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    image VARCHAR(100) DEFAULT NULL,
    description TEXT DEFAULT NULL,
    effect TEXT DEFAULT NULL
);

CREATE TABLE Rarity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE CardHist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_card INT NOT NULL,
    id_user INT NOT NULL,
    obtened DATETIME,
    CONSTRAINT fk_cardshist_card FOREIGN KEY (id_card) REFERENCES Card(id),
    CONSTRAINT fk_cardshist_user FOREIGN KEY (id_user) REFERENCES User(id)
);