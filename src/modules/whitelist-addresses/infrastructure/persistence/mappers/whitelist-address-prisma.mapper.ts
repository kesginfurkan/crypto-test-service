import type {WhitelistAddress} from '@prisma/client';

import {
    WhitelistAddressAggregate,
    WhitelistAddressAggregateProps,
} from '../../../domain/aggregates/whitelist-address.aggregate';

import {BlockchainNetwork} from '../../../../transactions/domain/enums/blockchain-network.enum';
import {EthereumAddress} from '../../../../../shared/domain/value-objects/ethereum-address.vo';

export class WhitelistAddressPrismaMapper {
    static toDomain(record:WhitelistAddress):WhitelistAddressAggregate {
        const props = {
            id:record.id,
            userId: record.userId,
            label:record.label,
            address: EthereumAddress.create(record.address),
            network: record.network as BlockchainNetwork,
            isActive:record.isActive,
            createdAt: record.createdAt,
            updatedAt: record.updatedAt,
        };

        return WhitelistAddressAggregate.rehydrate(props);
    }

    static toPersistence(address:WhitelistAddressAggregate) {
        const primitives = address.toPrimitives();

        return {
            id:primitives.id,
            userId:primitives.userId,
            label:primitives.label,
            address:primitives.address,
            network:primitives.network,
            isActive:primitives.isActive,
            createdAt:primitives.createdAt,
            updatedAt:primitives.updatedAt,
        };
    }
}