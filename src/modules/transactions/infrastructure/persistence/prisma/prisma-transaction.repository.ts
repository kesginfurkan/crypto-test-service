import {Injectable} from '@nestjs/common';

import {PrismaService} from '../../../../../shared/infrastructure/prisma/prisma.service';
import {TransactionAggregate} from '../../../domain/aggregates/transaction.aggregate';
import {TransactionPrismaMapper} from '../mappers/transaction-prisma.mapper';
import {TransactionRepository} from '../../../domain/repositories/transaction.repository';

@Injectable()
export class PrismaTransactionRepository implements TransactionRepository {
    constructor(private readonly prisma:PrismaService) {}

    async save(transaction: TransactionAggregate): Promise<void> {
        const data = TransactionPrismaMapper.toPersistence(transaction);

        await this.prisma.transaction.upsert({
            where: {
                id: data.id
            },
            create: data,
            update: data
        });
    }

    async findById(id: string): Promise<TransactionAggregate | null> {
        const transaction = await this.prisma.transaction.findUnique({
            where: {
                id,
            },
        });

        if(!transaction) {
            return null;
        }

        return TransactionPrismaMapper.toDomain(transaction);
    }

    async findByUserId(userId:string): Promise<TransactionAggregate[]> {
        const transactions = await this.prisma.transaction.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return transactions.map(TransactionPrismaMapper.toDomain);
    }
}