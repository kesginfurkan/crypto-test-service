import {WalletAggregate} from '../aggregates/wallet.aggregate';

export const WALLET_REPOSITORY = Symbol("WALLET_REPOSITORY");

export interface WalletRepository {
    save(wallet:WalletAggregate): Promise<void>;

    findById(id:string): Promise<WalletAggregate | null>;

    findByUserId(userId:string): Promise<WalletAggregate | null>;

    findByAddress(address:string): Promise<WalletAggregate | null>;
}