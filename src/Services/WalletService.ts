import { WalletDAO } from "../DAO/WalletDAO";
import { Wallet } from "../Models/Wallet";

export class WalletService {
    private walletDAO: WalletDAO;

    constructor(walletDAO: WalletDAO) {
        this.walletDAO = walletDAO;
    }

    async getWalletByUser(userId: number): Promise<Wallet[]> {
        return await this.walletDAO.findByUser(userId);
    }
}