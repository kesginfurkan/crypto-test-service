import {EthereumAddress} from '../../../../shared/domain/value-objects/ethereum-address.vo';
import {BlockchainNetwork} from '../../../transactions/domain/enums/blockchain-network.enum';

export type WhitelistAddressAggregateProps = {
    id:string;
    userId:string;
    label:string;
    address:EthereumAddress;
    network:BlockchainNetwork;
    isActive:boolean;
    createdAt:Date;
    updatedAt:Date;
};

export class WhitelistAddressAggregate {
    private constructor(private readonly props: WhitelistAddressAggregateProps) {}

    static create(props:{
        id:string;
        userId:string;
        label:string;
        address:string;
        network:BlockchainNetwork;
    }):WhitelistAddressAggregate {
        return new WhitelistAddressAggregate({
            id:props.id,
            userId:props.userId,
            label:props.label,
            address:EthereumAddress.create(props.address),
            network:props.network,
            isActive:true,
            createdAt:new Date(),
            updatedAt:new Date(),
        });
    }

    deactivate(): void {
        this.props.isActive = false;
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
            id:this.props.id,
            userId:this.props.userId,
            label:this.props.label,
            address: this.props.address.getValue(),
            network: this.props.network,
            isActive: this.props.isActive,
            createdAt: this.props.createdAt,
            updatedAt: this.props.updatedAt
        };
    }
}