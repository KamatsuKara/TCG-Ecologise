import { Request, Response } from "express";
import { WalletService } from "../Services/WalletService";

export class WalletController {
    private walletService: WalletService;

    constructor(walletService: WalletService) {
        this.walletService = walletService;
    }

    async getWalletByMe(req: Request, res: Response): Promise<void> {
        const userId = Number(req.user?.sub);

        if (!userId) {
            res.status(400).json({ error: "User ID is missing" });
            return;
        }

        try {
            const wallet = await this.walletService.getWalletByUser(userId);
            res.json(wallet);
        } catch (error) {
            res.status(500).json({ error: "Failed to retrieve wallet" });
        }
    }
}