import { CardHist } from "../Models/CardHist";

export interface CardHistDAO {
    insert(cardHist:CardHist):Promise<void>;
    update(cardHist:CardHist):Promise<void>;
    delete(cardHist:CardHist):Promise<void>;
    findAll():Promise<CardHist[]>;
    findById(id:number):Promise<CardHist|null>;
    findByCard(cardId:number):Promise<CardHist[]>;
    findByUser(userId:number):Promise<CardHist[]>;
}