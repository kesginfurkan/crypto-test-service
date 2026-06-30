import {Inject, Injectable} from '@nestjs/common';
import {randomUUID} from 'crypto';

import {UseCaseHandler} from '../../../../../shared/application/use-case.handler';
import {BusinessRuleException} from '../../../../../shared/domain/errors/business-rule.exception';

import {WhitelistAddressAggregate} from '../../../domain/aggregates/whitelist-address.aggregate';
import { WHITELIST_REPOSITORY } from '../../../domain/repositories/whitelist-address.repository';
import type { WhitelistRepository } from '../../../domain/repositories/whitelist-address.repository';
import {AddWhitelistAddressResponse} from './add-whitelist-address.response';
import {AddWhitelistAddressUseCase} from './add-whitelist-address.use-case';

@Injectable()
export class AddWhitelistAddressHandler extends UseCaseHandler<AddWhitelistAddressUseCase, AddWhitelistAddressResponse> {
    constructor(
        @Inject(WHITELIST_REPOSITORY)
        private readonly whitelistAddressRepository: WhitelistRepository,
    ) {
        super();
    }

    async execute(useCase:AddWhitelistAddressUseCase):Promise<AddWhitelistAddressResponse> {
        const existingAddress = await this.whitelistAddressRepository.findByAddress(useCase.address);

        if(existingAddress && existingAddress.userId === useCase.userId) {
            throw new BusinessRuleException('Address already exist in whitelist');
        }

        const whitelistAddress = WhitelistAddressAggregate.create({
            id:randomUUID(),
            userId:useCase.userId,
            label:useCase.label,
            address:useCase.address,
            network:useCase.network,
        });

        await this.whitelistAddressRepository.save(whitelistAddress);

        return whitelistAddress.toPrimitives();
    }
}