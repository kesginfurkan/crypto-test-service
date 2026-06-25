import {Injectable} from '@nestjs/common';

import {PrismaService} from '../../../../../shared/infrastructure/prisma/prisma.service';

import {WalletPrismaMapper} from '../mappers/wallet-prisma.mapper';
import {WalletAggregate} from '../../../domain/aggregates/wallet.aggregate';
import {WalletRepository} from '../../../domain/repositories/wallet.repository';

@Injectable()
export class PrismaWalletRepository implements WalletRepository {
    constructor(private readonly prisma: PrismaService) {}

    async save(wallet:WalletAggregate): Promise<void> {
        const data = WalletPrismaMapper.toPersistence(wallet);

        await this.prisma.wallet.upsert({
            where: {
                id: data.id,
            },
            create: data,
            update: data,
        });
    }

    async findById(id:string): Promise<WalletAggregate | null> {
        const wallet = await this.prisma.wallet.findUnique({
            where:{id},
        })

        if(!wallet) {
            return null;
        }

        return WalletPrismaMapper.toDomain(wallet);
    }

    async findByUserId(userId:string): Promise<WalletAggregate | null> {
        const wallet = await this.prisma.wallet.findFirst({
            where:{
                userId,
                isActive:true,
            },
        });

        if(!wallet) {
            return null;
        }

        return WalletPrismaMapper.toDomain(wallet);
    }

    async findByAddress(address:string): Promise<WalletAggregate | null> {
        const wallet = await this.prisma.wallet.findFirst({
            where:{
                address: address.toLowerCase(),
            },
        });

        if(!wallet) {
            return null;
        }

        return WalletPrismaMapper.toDomain(wallet);
    }
}