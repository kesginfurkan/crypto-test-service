import {BusinessRuleException} from '../errors/business-rule.exception';
import {ValueObject} from '../core/value-object';

type EthereumAddressProps = {
    value:string;
};

export class EthereumAddress extends ValueObject<EthereumAddressProps> {
    private constructor(props: EthereumAddressProps) {
        super(props);
    }

    static create(value:string): EthereumAddress {
        if(!value || !/^0x[a-fA-F0-9]{40}$/.test(value)) {
            throw new BusinessRuleException("Invalid ethereum address");
        }
        return new EthereumAddress({
            value: value.toLowerCase(),
        });
    }

    getValue(): string {
        return this.props.value;
    }
}