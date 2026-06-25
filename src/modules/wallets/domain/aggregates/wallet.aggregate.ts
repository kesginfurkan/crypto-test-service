import { Block } from 'ethers';
import { EthereumAddress } from '../../../../shared/domain/value-objects/ethereum-address.vo';
import { BlockchainNetwork } from '../../../transactions/domain/enums/blockchain-network.enum';

export type WalletAggregateProps = {
    id: string;
    userId: string;
    address: EthereumAddress;
    network: BlockchainNetwork;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export class WalletAggregate {
    private constructor(private readonly props: WalletAggregateProps) { }

    static create(props: {
        id: string;
        userId: string;
        address: string;
        network: BlockchainNetwork;
    }): WalletAggregate {
        return new WalletAggregate({
            id: props.id,
            userId: props.userId,
            address: EthereumAddress.create(props.address),
            network: props.network,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    static rehydrate(props:WalletAggregateProps): WalletAggregate {
        return new WalletAggregate(props);
    }

    deactivate(): void {
        this.props.isActive = false;
        this.props.updatedAt = new Date();
    }

    activate(): void {
        this.props.isActive = true;
        this.props.updatedAt = new Date();
    }

    get address(): string {
        return this.props.address.getValue();
    }

    get userId(): string {
        return this.props.userId;
    }

    toPrimitives() {
        return {
            id: this.props.id,
            userId: this.props.userId,
            address: this.props.address.getValue(),
            network: this.props.network,
            isActive: this.props.isActive,
            createdAt: this.props.createdAt,
            updatedAt: this.props.updatedAt,
        };
    }
}