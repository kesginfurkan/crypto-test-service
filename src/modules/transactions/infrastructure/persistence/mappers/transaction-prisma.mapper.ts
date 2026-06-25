import {Transaction} from '@prisma/client';

import {TransactionAggregate, TransactionAggregateProps} from '../../../domain/aggregates/transaction.aggregate';

import {BlockchainNetwork} from '../../../domain/enums/blockchain-network.enum';
import {TransactionStatus} from '../../../domain/enums/transaction-status.enum';
import {TransactionType} from '../../../domain/enums/transaction-type.enum';

import {CryptoAmount} from '../../../../../shared/domain/value-objects/crypto-amount.vo';
import {EthereumAddress} from '../../../../../shared/domain/value-objects/ethereum-address.vo';
import { stat } from 'fs';

export class TransactionPrismaMapper {
    static toDomain(record: Transaction): TransactionAggregate {
        const props = {
            id: record.id,
            userId: record.userId,
            type: record.type as TransactionType,
            status: record.status as TransactionStatus,
            fromAddress: EthereumAddress.create(record.fromAddress),
            toAddress: EthereumAddress.create(record.toAddress),
            amount: CryptoAmount.create(record.amount.toString()),
            network: record.network as BlockchainNetwork,
            txHash: record.txHash,
            failureReason: record.failureReason,
            createdAt: record.createdAt,
            updatedAt: record.updatedAt
        };

        return TransactionAggregate.rehydrate(props);
    }


    static toPersistence(transaction: TransactionAggregate) {
        const primitives = transaction.toPrimitives();

        return {
            id: primitives.id,
            userId: primitives.userId,
            type: primitives.type,
            status: primitives.status,
            fromAddress: primitives.fromAddress,
            toAddress: primitives.toAddress,
            amount: primitives.amount,
            network: primitives.network,
            txHash: primitives.txHash,
            failureReason: primitives.failureReason,
            createdAt: primitives.createdAt,
            updatedAt: primitives.updatedAt
        }
    }
}