import {WhitelistAddressAggregate} from '../aggregates/whitelist-address.aggregate';

export const WHITELIST_REPOSITORY = Symbol('WHITELIST_REPOSITORY');

export interface WhitelistRepository {
    save(address:WhitelistAddressAggregate): Promise<void>;

    findById(id:string): Promise<WhitelistAddressAggregate | null>;

    findByUserId(userId:string): Promise<WhitelistAddressAggregate[]>;

    findByAddress(address:string): Promise<WhitelistAddressAggregate | null>;
}