import { CardModel } from "../Models/CardModel";

export interface CardModelDAO {
    insert(cardModel:CardModel):Promise<void>;
    update(cardModel:CardModel):Promise<void>;
    delete(cardModel:CardModel):Promise<void>;
    findAll():Promise<CardModel[]>;
    findById(id:number):Promise<CardModel|null>;
    findByName(name:string):Promise<CardModel|null>;
}