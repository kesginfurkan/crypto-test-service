import { CryptoAmount } from '../../../../shared/domain/value-objects/crypto-amount.vo';
import { EthereumAddress } from '../../../../shared/domain/value-objects/ethereum-address.vo';
import { BusinessRuleException } from '../../../../shared/domain/errors/business-rule.exception';
import { BlockchainNetwork } from '../enums/blockchain-network.enum';
import { TransactionStatus } from '../enums/transaction-status.enum';
import { TransactionType } from '../enums/transaction-type.enum';

export type TransactionAggregateProps = {
    id: string;
    userId: string;
    type: TransactionType;
    status: TransactionStatus;
    fromAddress: EthereumAddress;
    toAddress: EthereumAddress;
    amount: CryptoAmount;
    network: BlockchainNetwork;
    txHash?: string | null;
    failureReason?: string | null;
    createdAt: Date;
    updatedAt: Date;
};

export class TransactionAggregate {
    private constructor(private readonly props: TransactionAggregateProps) { }

    static createWithdraw(props: {
        id: string;
        userId: string;
        fromAddress: string;
        toAddress: string;
        amount: string;
        network: BlockchainNetwork;
    }): TransactionAggregate {
        return new TransactionAggregate({
            id: props.id,
            userId: props.userId,
            type: TransactionType.WITHDRAW,
            status: TransactionStatus.CREATED,
            fromAddress: EthereumAddress.create(props.fromAddress),
            toAddress: EthereumAddress.create(props.toAddress),
            amount: CryptoAmount.create(props.amount),
            network: props.network,
            txHash: null,
            failureReason: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }


    static createDeposit(props: {
        id: string;
        userId: string;
        fromAddress: string;
        toAddress: string;
        amount: string;
        network: BlockchainNetwork;
        txHash: string;
    }): TransactionAggregate {
        return new TransactionAggregate({
            id: props.id,
            userId: props.userId,
            type: TransactionType.DEPOSIT,
            status: TransactionStatus.CONFIRMED,
            fromAddress: EthereumAddress.create(props.fromAddress),
            toAddress: EthereumAddress.create(props.toAddress),
            amount: CryptoAmount.create(props.amount),
            network: props.network,
            txHash: props.txHash,
            failureReason: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    static rehydrate(props: TransactionAggregateProps): TransactionAggregate {
        return new TransactionAggregate(props);
    }

    markAsPending(): void {
        this.ensureStatus(TransactionStatus.CREATED);
        this.props.status = TransactionStatus.PENDING;
        this.touch();
    }

    markAsBroadcasted(txHash: string): void {
        this.ensureStatus(TransactionStatus.PENDING);

        if (!txHash) {
            throw new BusinessRuleException('Transaction hash is required');
        }

        this.props.status = TransactionStatus.BROADCASTED;
        this.props.txHash = txHash;
        this.touch();
    }

    markAsConfirmed(): void {
        if (
            this.props.status !== TransactionStatus.BROADCASTED &&
            this.props.status !== TransactionStatus.PENDING
        ) {
            throw new BusinessRuleException('Transaction cannot be confirmed');
        }

        this.props.status = TransactionStatus.CONFIRMED;
        this.touch();
    }

    markAsFailed(reason: string): void {
        if (!reason) {
            throw new BusinessRuleException('Failure reason is required');
        }

        this.props.status = TransactionStatus.FAILED;
        this.props.failureReason = reason;
        this.touch();
    }

    private ensureStatus(status: TransactionStatus): void {
        if (this.props.status !== status) {
            throw new BusinessRuleException(
                `Transaction status must be ${status}`,
            );
        }
    }

    private touch(): void {
        this.props.updatedAt = new Date();
    }

    get id(): string {
        return this.props.id;
    }

    get userId(): string {
        return this.props.userId;
    }

    get status(): TransactionStatus {
        return this.props.status;
    }

    get type(): TransactionType {
        return this.props.type;
    }

    get txHash(): string | null | undefined {
        return this.props.txHash;
    }

    toPrimitives() {
        return {
            id: this.props.id,
            userId: this.props.userId,
            type: this.props.type,
            status: this.props.status,
            fromAddress: this.props.fromAddress.getValue(),
            toAddress: this.props.toAddress.getValue(),
            amount: this.props.amount.getValue(),
            network: this.props.network,
            txHash: this.props.txHash,
            failureReason: this.props.failureReason,
            createdAt: this.props.createdAt,
            updatedAt: this.props.updatedAt,
        };
    }
}

