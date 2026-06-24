import {TransactionAggregate} from '../aggregates/transaction.aggregate';

export const TRANSACTION_REPOSITORY = Symbol("TRANSACTION_REPOSITORY");

export interface TransactionRepository {
    save(transaction: TransactionAggregate): Promise<void>;
    findById(id:string): Promise<TransactionAggregate | null>;
    findByUserId(userId:string): Promise<TransactionAggregate[]>;
}