import {DomainException} from './domain.exception';

export class NotFoundException extends DomainException {
    constructor(entity:string) {
        super(`${entity} not found`);
    }
}