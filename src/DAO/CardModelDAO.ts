import { CardModel } from "../Models/CardModel";

export interface CardModelDAO {
    insert(cardModel:CardModel):Promise<void>;
    update(cardModel:CardModel):Promise<void>;
    delete(id:number):Promise<void>;
    findAll():Promise<CardModel[]>;
    findById(id:number):Promise<CardModel|undefined>;
}