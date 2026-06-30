import {Decimal} from 'decimal.js';
import {ValueObject} from '../core/value-object';
import {BusinessRuleException} from '../errors/business-rule.exception';

type CryptoAmountProps = {
    value:Decimal;
}

export class CryptoAmount extends ValueObject<CryptoAmountProps> {
    private constructor(props: CryptoAmountProps){
        super(props);
    }

    static create(value:string): CryptoAmount {
        const amount = new Decimal(value);

        if(amount.isNaN() || amount.lte(0)) {
            throw new BusinessRuleException('Crypto amount must be greater than zero');
        }

        return new CryptoAmount({
            value: amount
        });
    }

    getValue(): string {
        return this.props.value.toString();
    }

    isGreaterThan(amount: CryptoAmount): boolean {
        return this.props.value.gt(amount.props.value);
    }
}