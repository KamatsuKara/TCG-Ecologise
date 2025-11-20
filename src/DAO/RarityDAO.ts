import { Rarity } from "../Models/Rarity";

export interface RarityDAO {
    insert(rarity:Rarity):Promise<void>;
    update(rarity:Rarity):Promise<void>;
    delete(id:number):Promise<void>;
    findAll():Promise<Rarity[]>;
    findById(id:number):Promise<Rarity|undefined>;
}