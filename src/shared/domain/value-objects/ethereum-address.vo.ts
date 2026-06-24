import {BusinessRuleException} from '../errors/business-rule.exception';

export class EthereumAddress {
    private constructor(private readonly value:string) {}

    static create(value:string): EthereumAddress {
        if(!value || !/^0x[a-fA-F0-9]{40}$/.test(value)) {
            throw new BusinessRuleException("Invalid ethereum address");
        }
        return new EthereumAddress(value.toLowerCase());
    }

    getValue(): string {
        return this.value;
    }

    equals(address:EthereumAddress): boolean {
        return this.value === address.getValue();
    }
}