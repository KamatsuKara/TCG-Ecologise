import { Trade } from "../Models/Trade";
import { TradeDAO } from "../DAO/TradeDAO";

export class TradeService {
    constructor(private tradeDAO: TradeDAO){}

    async getAll(limit:number, page:number):Promise<Trade[]>{
        var trades:Trade[] = await this.tradeDAO.findAll();
        trades = trades.slice((page-1)*limit, page*limit);
        return trades;
    }

    async get(id: number):Promise<Trade>{
        const trade = await this.tradeDAO.findById(id);
        if(!trade){
            throw new Error("Trade not found");
        }
        return trade;
    }

    async create(trade:Trade):Promise<void>{
        
        this.tradeDAO.insert(trade);
    }

    async delete(id:number):Promise<void>{
        await this.tradeDAO.delete(id);
    }

    async update(data:Trade):Promise<void>{
        await this.tradeDAO.update(data);
    }
}