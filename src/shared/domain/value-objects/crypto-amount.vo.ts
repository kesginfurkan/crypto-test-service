import {Decimal} from 'decimal.js';
import {BusinessRuleException} from '../errors/business-rule.exception';

export class CryptoAmount {
    private constructor(private readonly value:Decimal){}

    static create(value:string): CryptoAmount {
        const amount = new Decimal(value);

        if(amount.isNaN() || amount.lte(0)) {
            throw new BusinessRuleException('Crypto amount must be greater than zero');
        }

        return new CryptoAmount(amount);
    }

    getValue(): string {
        return this.value.toString();
    }

    isGreaterThan(amount: CryptoAmount): boolean {
        return this.value.gt(amount.value);
    }
}