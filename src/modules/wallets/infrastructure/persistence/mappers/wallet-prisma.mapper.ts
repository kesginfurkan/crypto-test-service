import {Wallet} from '@prisma/client';

import {WalletAggregate, WalletAggregateProps} from '../../../domain/aggregates/wallet.aggregate';

import {BlockchainNetwork} from '../../../../transactions/domain/enums/blockchain-network.enum';
import {EthereumAddress} from '../../../../../shared/domain/value-objects/ethereum-address.vo';

export class WalletPrismaMapper {
    static toDomain(record:Wallet):WalletAggregate {
        const props:WalletAggregateProps = {
            userId:record.userId,
            address:EthereumAddress.create(record.address),
            network: record.network as BlockchainNetwork,
            isActive: record.isActive,
            createdAt: record.createdAt,
            updatedAt: record.updatedAt
        };

        return WalletAggregate.rehydrate(props, record.id);
    } 

    static toPersistence(wallet:WalletAggregate) {
        const primitives = wallet.toPrimitives();

        return {
            id: primitives.id,
            userId: primitives.userId,
            address: primitives.address,
            network: primitives.network,
            isActive: primitives.isActive,
            createdAt: primitives.createdAt,
            updatedAt: primitives.updatedAt,
        };
    }
}