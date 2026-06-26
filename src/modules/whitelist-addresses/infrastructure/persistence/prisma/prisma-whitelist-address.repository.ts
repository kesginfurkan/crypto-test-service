import {Injectable} from '@nestjs/common';

import {PrismaService} from '../../../../../shared/infrastructure/prisma/prisma.service';
import {WhitelistAddressAggregate} from '../../../domain/aggregates/whitelist-address.aggregate';
import {WhitelistAddressPrismaMapper} from '../../../../whitelist-addresses/infrastructure/persistence/mappers/whitelist-address-prisma.mapper';
import {WhitelistRepository} from '../../../domain/repositories/whitelist-address.repository';

@Injectable()
export class PrismaWhitelistAddressRepository implements WhitelistRepository {
    constructor(private readonly prisma:PrismaService) {}

    async save(address:WhitelistAddressAggregate): Promise<void> {
        const data = WhitelistAddressPrismaMapper.toPersistence(address);

        await this.prisma.whitelistAddress.upsert({
            where:{
                id:data.id,
            },
            create:data,
            update:data
        });
    }

    async findById(id:string): Promise<WhitelistAddressAggregate | null> {
        const address = await this.prisma.whitelistAddress.findUnique({
            where:{id},
        });

        if(!address) {
            return null;
        }

        return WhitelistAddressPrismaMapper.toDomain(address);
    }

    async findByUserId(userId:string): Promise<WhitelistAddressAggregate[]> {
        const addresses = await this.prisma.whitelistAddress.findMany({
            where: {userId, isActive:true},
            orderBy: {createdAt:'desc'},
        });

        return addresses.map(WhitelistAddressPrismaMapper.toDomain);
    }

    async findByAddress(address:string): Promise<WhitelistAddressAggregate | null> {
        const whitelistAddress = await this.prisma.whitelistAddress.findFirst({
            where:{address:address.toLowerCase(), isActive:true},
        });

        if(!whitelistAddress){
            return null;
        }

        return WhitelistAddressPrismaMapper.toDomain(whitelistAddress);
    }
}