import {AggregateRoot} from '../../../../shared/domain/core/aggregate-root';
import {UniqueEntityId} from '../../../../shared/domain/core/unique-entity-id'; 
import { EthereumAddress } from '../../../../shared/domain/value-objects/ethereum-address.vo';
import { BlockchainNetwork } from '../../../transactions/domain/enums/blockchain-network.enum';

export type WalletAggregateProps = {
    userId: string;
    address: EthereumAddress;
    network: BlockchainNetwork;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export class WalletAggregate extends AggregateRoot<WalletAggregateProps> {
    private constructor(props:WalletAggregateProps, id?:UniqueEntityId) {
        super(props,id);
    }

    static create(props: {
        id?: string;
        userId: string;
        address: string;
        network: BlockchainNetwork;
    }): WalletAggregate {
        return new WalletAggregate({
            userId: props.userId,
            address: EthereumAddress.create(props.address),
            network: props.network,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        props.id ? new UniqueEntityId(props.id) : undefined,
      );
    }

    static rehydrate(props:WalletAggregateProps, id:string): WalletAggregate {
        return new WalletAggregate(
            props,
            new UniqueEntityId(id),
        );
    }

    deactivate(): void {
        this.props.isActive = false;
        this.touch();
    }

    activate(): void {
        this.props.isActive = true;
        this.touch();
    }

    private touch():void {
        this.props.updatedAt = new Date();
    }

    get address(): string {
        return this.props.address.getValue();
    }

    get userId(): string {
        return this.props.userId;
    }

    get network(): BlockchainNetwork {
        return this.props.network;
    }

    get isActive(): boolean {
        return this.props.isActive = true;
    }

    toPrimitives() {
        return {
            id: this.id.toString(),
            userId: this.props.userId,
            address: this.props.address.getValue(),
            network: this.props.network,
            isActive: this.props.isActive,
            createdAt: this.props.createdAt,
            updatedAt: this.props.updatedAt,
        };
    }
}