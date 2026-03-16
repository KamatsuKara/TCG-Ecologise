import { Card } from "../Models/Card";
import { CardDAO } from "../DAO/CardDAO";
import { WalletDAO } from '../DAO/WalletDAO';
import { CardMarketDAO } from '../DAO/CardMarketDAO';

import { Wallet } from "../Models/Wallet";
import { User } from "../Models/User";
import { Currency } from "../Models/Currency";

export class CardService {
    constructor(
        private cardDAO: CardDAO,
        private walletDAO: WalletDAO,
        private cardMarketDAO: CardMarketDAO
    ) {}

    async getAll(limit:number, page:number):Promise<Card[]>{
        var cards:Card[] = await this.cardDAO.findAll();
        cards = cards.slice((page-1)*limit, page*limit);
        return cards;
    }

    async get(id:number):Promise<Card>{
        const card = await this.cardDAO.findById(id);
        if(!card){
            throw new Error("Card not found");
        }
        return card;
    }

    async getByUser(id:number):Promise<Card[]>{
        const card = await this.cardDAO.findByUser(id);
        if(!card){
            throw new Error("Card not found");
        }
        return card;
    }

    async create(card:Card):Promise<void>{
        card.created = Date.now();
        card.obtened = Date.now();
        this.cardDAO.insert(card);
    }

    async delete(id:number):Promise<void>{
        await this.cardDAO.delete(id);
    }

    async update(data:Card):Promise<void>{
        await this.cardDAO.update(data);
    }

    async sellCard(userId: number, cardId: number) {
        const card = await this.cardDAO.findById(cardId);
        if (!card || card.owner.id !== userId) { // Fixed type mismatch
            throw new Error('Card does not belong to the user');
        }

        const cardMarket = await this.cardMarketDAO.findByCard(cardId);
        if (!cardMarket) {
            throw new Error('Card price not found in the market');
        }

        const price = cardMarket.price;

        await this.walletDAO.update(new Wallet(price, new User(userId), new Currency(1))); // Fixed method name
        await this.cardDAO.delete(cardId);

        return { message: 'Card sold successfully', price };
    }
}