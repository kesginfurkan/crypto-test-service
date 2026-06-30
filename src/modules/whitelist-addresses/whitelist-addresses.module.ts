import {Module} from '@nestjs/common';

import {WhitelistAddressesController} from '../whitelist-addresses/presentation/http/controllers/whitelist-addresses.controller';
import {AddWhitelistAddressHandler} from '../whitelist-addresses/application/use-cases/add-whitelist-address/add-whitelist-address.handler';
import {WHITELIST_REPOSITORY} from './domain/repositories/whitelist-address.repository';
import {PrismaWhitelistAddressRepository} from './infrastructure/persistence/prisma/prisma-whitelist-address.repository';

@Module({
    controllers:[WhitelistAddressesController],
    providers:[ AddWhitelistAddressHandler,
        {
        provide:WHITELIST_REPOSITORY,
        useClass:PrismaWhitelistAddressRepository,
    },
    ],
    exports:[WHITELIST_REPOSITORY],
})
export class WhitelistAddressesModule {}